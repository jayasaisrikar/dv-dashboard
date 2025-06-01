"use client";

import { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ChartData, FilterState } from '@/types';
import { 
  ArrowsPointingOutIcon, 
  ArrowsPointingInIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

ChartJS.register(...registerables);

interface ChartPieInteractiveProps {
  dataType: string;
  filters: FilterState;
  title: string;
  subtitle?: string;
  height?: number;
  className?: string;
}

export default function ChartPieInteractive({ 
  dataType, 
  filters, 
  title, 
  subtitle,
  height = 300,
  className 
}: ChartPieInteractiveProps) {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSlice, setSelectedSlice] = useState<number | null>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const queryParams = new URLSearchParams();
        queryParams.append('chartType', dataType);
        
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });
        
        const response = await fetch(`/api/charts?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch chart data');
        }
        
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setError('Failed to load chart data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [dataType, filters]);

  const colorPalette = [
    'rgba(99, 102, 241, 0.8)',   // indigo
    'rgba(168, 85, 247, 0.8)',   // purple
    'rgba(236, 72, 153, 0.8)',   // pink
    'rgba(245, 101, 101, 0.8)',  // red
    'rgba(251, 146, 60, 0.8)',   // orange
    'rgba(252, 211, 77, 0.8)',   // yellow
    'rgba(16, 185, 129, 0.8)',   // emerald
    'rgba(34, 197, 94, 0.8)',    // green
    'rgba(6, 182, 212, 0.8)',    // cyan
    'rgba(59, 130, 246, 0.8)',   // blue
  ];

  const hoverColorPalette = [
    'rgba(99, 102, 241, 1)',
    'rgba(168, 85, 247, 1)',
    'rgba(236, 72, 153, 1)',
    'rgba(245, 101, 101, 1)',
    'rgba(251, 146, 60, 1)',
    'rgba(252, 211, 77, 1)',
    'rgba(16, 185, 129, 1)',
    'rgba(34, 197, 94, 1)',
    'rgba(6, 182, 212, 1)',
    'rgba(59, 130, 246, 1)',
  ];

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeOutQuart' as const,
      animateRotate: true,
      animateScale: true
    },
    interaction: {
      intersect: false,
      mode: 'nearest' as const,
    },
    onHover: (event: any, elements: any[]) => {
      const canvas = chartRef.current?.canvas;
      if (canvas) {
        canvas.style.cursor = elements.length > 0 ? 'pointer' : 'default';
      }
    },
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const elementIndex = elements[0].index;
        setSelectedSlice(selectedSlice === elementIndex ? null : elementIndex);
      }
    },
    plugins: {
      legend: {
        position: 'right' as const,
        align: 'center' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,          font: {
            family: "'Inter', 'Poppins', sans-serif",
            size: 12,
            weight: 'normal' as const
          },
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                const total = data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].backgroundColor[i],
                  pointStyle: 'circle',
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: 'rgba(255, 255, 255, 1)',
        bodyColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(99, 102, 241, 0.2)',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 16,        titleFont: {
          family: "'Inter', 'Poppins', sans-serif",
          weight: 'bold' as const,
          size: 14
        },
        bodyFont: {
          family: "'Inter', 'Poppins', sans-serif",
          weight: 'normal' as const,
          size: 13
        },
        callbacks: {
          title: (context: any) => {
            return context[0].label;
          },
          label: (context: any) => {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return [
              `Value: ${value}`,
              `Percentage: ${percentage}%`,
              `Total: ${total}`
            ];
          }
        }
      }
    },
    elements: {
      arc: {
        borderWidth: 3,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        hoverBorderWidth: 4,
        hoverBorderColor: 'rgba(255, 255, 255, 1)'
      }
    }
  };

  if (chartData) {
    chartData.datasets = chartData.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: colorPalette.slice(0, chartData.labels.length),
      hoverBackgroundColor: hoverColorPalette.slice(0, chartData.labels.length),
      borderColor: 'rgba(255, 255, 255, 0.8)',
      borderWidth: 2,
      hoverBorderWidth: 3
    }));
  }

  const downloadChart = () => {
    if (chartRef.current) {
      const canvas = chartRef.current.canvas;
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${title.replace(/\s+/g, '_').toLowerCase()}_chart.png`;
      link.href = url;
      link.click();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (loading) {
    return (
      <div className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden",
        className
      )}>
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-48 mb-2"></div>
              {subtitle && <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded animate-pulse w-32"></div>}
            </div>
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="p-6" style={{ height: height }}>
          <div className="flex items-center justify-center h-full">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-200 dark:border-gray-600 rounded-full animate-spin">
                <div className="w-16 h-16 border-4 border-transparent border-t-indigo-600 rounded-full animate-spin"></div>
              </div>
              <ChartPieIcon className="w-6 h-6 text-indigo-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-red-200 dark:border-red-800 overflow-hidden",
        className
      )}>
        <div className="p-6 border-b border-red-100 dark:border-red-800">
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">{title}</h3>
          {subtitle && <p className="text-sm text-red-500 dark:text-red-400 mt-1">{subtitle}</p>}
        </div>
        <div className="p-6" style={{ height: height }}>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartPieIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <p className="text-red-600 dark:text-red-400 font-medium mb-2">Failed to load chart</p>
              <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ChartContent = () => (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300",
      isFullscreen && "fixed inset-4 z-50 shadow-2xl",
      className
    )}>
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <ChartPieIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
              {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={downloadChart}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Download Chart"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedSlice(null)}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Reset Selection"
            >
              <EyeIcon className="w-5 h-5" />
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? (
                <ArrowsPointingInIcon className="w-5 h-5" />
              ) : (
                <ArrowsPointingOutIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6" style={{ height: isFullscreen ? 'calc(100vh - 160px)' : height }}>
        {chartData && (
          <Pie 
            ref={chartRef}
            data={chartData} 
            options={chartOptions}
          />
        )}
      </div>

      {/* Data Summary */}
      {chartData && (
        <div className="px-6 pb-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Stats</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {chartData.labels.length}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Categories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {chartData.datasets[0].data.reduce((a: number, b: number) => a + b, 0)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Total Value</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {Math.max(...chartData.datasets[0].data)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Highest</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {Math.round(chartData.datasets[0].data.reduce((a: number, b: number) => a + b, 0) / chartData.datasets[0].data.length)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Average</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <ChartContent />
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={toggleFullscreen}
        />
      )}
    </>
  );
}