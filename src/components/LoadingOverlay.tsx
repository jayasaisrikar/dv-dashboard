"use client";

import { useState, useEffect } from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

export default function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (isLoading) {
      setVisible(true);
    } else {
      // Slight delay before hiding to prevent flickering for quick operations
      const timer = setTimeout(() => {
        setVisible(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  if (!visible) return null;
  
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center transition-opacity duration-300 ${
      isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}>
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
        <p className="text-gray-600 font-medium font-poppins">Loading data...</p>
      </div>
    </div>
  );
}
