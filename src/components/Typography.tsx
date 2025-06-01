import React from 'react';

interface TypographyProps {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption';
  children: React.ReactNode;
  className?: string;
}

// Typography component with consistent Poppins styling
export default function Typography({ variant, children, className = '' }: TypographyProps) {
  let styles = '';

  switch (variant) {
    case 'h1':
      styles = 'text-3xl font-bold text-gray-800 font-poppins';
      break;
    case 'h2':
      styles = 'text-2xl font-semibold text-gray-800 font-poppins';
      break;
    case 'h3':
      styles = 'text-xl font-semibold text-gray-800 font-poppins';
      break;
    case 'h4':
      styles = 'text-lg font-semibold text-gray-800 font-poppins';
      break;
    case 'subtitle1':
      styles = 'text-base font-medium text-gray-700 font-poppins';
      break;
    case 'subtitle2':
      styles = 'text-sm font-medium text-gray-700 font-poppins';
      break;
    case 'body1':
      styles = 'text-base text-gray-600 font-poppins';
      break;
    case 'body2':
      styles = 'text-sm text-gray-600 font-poppins';
      break;
    case 'caption':
      styles = 'text-xs text-gray-500 font-poppins';
      break;
  }

  return (
    <div className={`${styles} ${className}`}>
      {children}
    </div>
  );
}
