interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function Card({ title, value, icon, trend, className }: CardProps) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          
          {trend && (
            <div className="flex items-center mt-1">
              <span className={trend.isPositive ? 'text-green-500' : 'text-red-500'}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
            </div>
          )}
        </div>
        
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
    </div>
  );
}
