import { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { ChartData, FilterState } from '@/types';

ChartJS.register(...registerables);

interface ChartComponentProps {
  chartType: 'bar' | 'line' | 'pie' | 'doughnut';
  dataType: string;
  filters: FilterState;
  title: string;
}

export default function ChartComponent({ chartType, dataType, filters, title }: ChartComponentProps) {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Construct query string from filters
        const queryParams = new URLSearchParams();
        queryParams.append('chartType', dataType);
        
        if (filters.endYear) queryParams.append('endYear', filters.endYear);
        if (filters.topic) queryParams.append('topic', filters.topic);
        if (filters.sector) queryParams.append('sector', filters.sector);
        if (filters.region) queryParams.append('region', filters.region);
        if (filters.pestle) queryParams.append('pestle', filters.pestle);
        if (filters.source) queryParams.append('source', filters.source);
        if (filters.swot) queryParams.append('swot', filters.swot);
        if (filters.country) queryParams.append('country', filters.country);
        if (filters.city) queryParams.append('city', filters.city);
        
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
  }, [dataType, filters]);  const [isFullscreen, setIsFullscreen] = useState(false);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 16,
          font: {
            family: "'Poppins', sans-serif",
            size: 11
          }
        }
      },      
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
          family: "'Poppins', sans-serif"
        },
        color: '#374151',
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        titleColor: 'rgba(255, 255, 255, 1)',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        padding: 12,
        titleFont: {
          family: "'Poppins', sans-serif",
          weight: 'bold',
          size: 12
        },
        bodyFont: {
          family: "'Poppins', sans-serif",
          size: 11
        },
        cornerRadius: 6,
        displayColors: true,
        boxPadding: 4,
        usePointStyle: true,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    scales: chartType === 'bar' || chartType === 'line' ? {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          font: {
            family: "'Poppins', sans-serif",
            size: 10
          }
        }
      },
      y: {
        grid: {
          borderDash: [2, 4],
          color: 'rgba(156, 163, 175, 0.15)'
        },
        ticks: {
          font: {
            family: "'Poppins', sans-serif",
            size: 10
          }
        }
      }
    } : undefined
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 h-64 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="text-sm text-gray-400 mt-3 font-poppins">Loading chart data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 h-64 flex items-center justify-center">
        <div className="flex flex-col items-center text-center max-w-xs">
          <div className="rounded-full bg-red-50 p-3 mb-2">
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-red-500 font-medium">{error}</p>
          <p className="text-xs text-gray-400 mt-1">Please try adjusting your filters or refreshing the page.</p>
        </div>
      </div>
    );
  }

  if (!chartData || chartData.labels.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 h-64 flex items-center justify-center">
        <div className="flex flex-col items-center text-center max-w-xs">
          <div className="rounded-full bg-blue-50 p-3 mb-2">
            <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-gray-700 font-medium">No data available</p>
          <p className="text-xs text-gray-400 mt-1">Try changing your filters to see data for this chart.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-md border border-gray-100 transition-all duration-300 ${
      isFullscreen ? 'fixed inset-4 z-50' : 'h-96'
    }`}>
      <div className="p-2 flex justify-between items-center">
        <div className="pl-2 text-sm font-medium text-gray-700">{title}</div>
        <div className="flex space-x-1">
          <button 
            className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-md hover:bg-gray-50 transition-colors"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className={`px-3 pb-3 pt-1 ${isFullscreen ? 'h-[calc(100%-40px)]' : 'h-[calc(100%-36px)]'}`}>
        {chartType === 'bar' && <Bar ref={chartRef} options={chartOptions} data={chartData} />}
        {chartType === 'line' && <Line ref={chartRef} options={chartOptions} data={chartData} />}
        {chartType === 'pie' && <Pie ref={chartRef} options={chartOptions} data={chartData} />}
        {chartType === 'doughnut' && <Doughnut ref={chartRef} options={chartOptions} data={chartData} />}
      </div>
    </div>
  );
}
