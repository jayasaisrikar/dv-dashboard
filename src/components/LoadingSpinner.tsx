interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'medium', 
  color = 'indigo-500',
  className = '',
}: LoadingSpinnerProps) {
  
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
  };
  
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-${color} ${sizeClasses[size]}`}></div>
    </div>
  );
}
