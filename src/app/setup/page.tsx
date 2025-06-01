'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import DataStatusPanel from '@/components/DataStatusPanel';

export default function Setup() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch('/api/health');
        const result = await response.json();
        
        if (response.ok) {
          setStatus('success');
          setData(result);
        } else {
          setStatus('error');
          setError(result.message || 'Failed to load JSON data');
        }
      } catch (err) {
        setStatus('error');
        setError('Network error connecting to API');
      }
    };

    checkApiStatus();
  }, []);

  return (
    <>
      <Sidebar currentPage="setup" />
      <div className="flex-1 overflow-y-auto p-8">
        <Header 
          title="Setup Verification" 
          subtitle="Verify your JSON data loading" 
        />
        
        <div className="mt-8 grid grid-cols-1 gap-6">
          <DataStatusPanel
            status={status}
            data={data}
            error={error}
          />
        </div>
      </div>
    </>
  );
}
