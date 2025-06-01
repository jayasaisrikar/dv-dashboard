"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';
import FilterBar from '@/components/FilterBar';
import StatsSummary from '@/components/StatsSummary';
import ChartComponent from '@/components/ChartComponent';
import DataTable from '@/components/DataTable';
import ExportData from '@/components/ExportData';
import Header from '@/components/Header';
import LoadingOverlay from '@/components/LoadingOverlay';
import { FilterState } from '@/types';
import {
  ChartBarIcon,
  TableCellsIcon,
  PresentationChartLineIcon,
  DocumentChartBarIcon,
  GlobeAltIcon,
  TagIcon,
  BuildingOfficeIcon,
  ClockIcon,
  BeakerIcon,
  MapPinIcon,
  SparklesIcon,
  EyeIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const { user, isGuest, isLoading: authLoading } = useAuth();
  const router = useRouter();
  
  const [filters, setFilters] = useState<FilterState>({
    endYear: null,
    topic: null,
    sector: null,
    region: null,
    pestle: null,
    source: null,
    swot: null,
    country: null,
    city: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState<number | string>('N/A');
  const [lastUpdated, setLastUpdated] = useState<string>('N/A');

  // Redirect to auth page if not authenticated
  useEffect(() => {
    if (!authLoading && !user && !isGuest) {
      router.push('/auth');
    }
  }, [user, isGuest, authLoading, router]);

  useEffect(() => {
    // Fetch total records
    const fetchTotalRecords = async () => {
      try {
        const response = await fetch('/api/insights');
        if (response.ok) {
          const result = await response.json();
          // Refined logic for setting totalRecords
          if (typeof result.total === 'number') {
            setTotalRecords(result.total);
          } else if (Array.isArray(result.data)) {
            setTotalRecords(result.data.length);
          } else {
            setTotalRecords('N/A'); // Explicitly N/A if no valid data
          }
        } else {
          setTotalRecords('Error'); // API response not OK
        }
      } catch (error) {
        setTotalRecords('Error'); // Error during fetch or JSON parsing
        console.error('Failed to fetch total records:', error);
      }
    };

    fetchTotalRecords();
    // Set last updated to current date as a placeholder
    setLastUpdated(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  }, []);

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!user && !isGuest) {
    return null;
  }

  const handleFilterChange = (newFilters: FilterState) => {
    setIsLoading(true);
    // Short timeout to show loading state
    setTimeout(() => {
      setFilters(newFilters);
      setIsLoading(false);
    }, 500);
  };

  const chartConfigs = [
    {
      chartType: "bar" as const,
      dataType: "intensityByRegion",
      title: "Intensity by Region",
      icon: <GlobeAltIcon className="w-5 h-5" />,
      gradient: "from-blue-500 to-cyan-600",
      description: "Regional intensity analysis",
      bgColor: "bg-blue-50 dark:bg-blue-900/10",
      borderColor: "border-blue-200 dark:border-blue-800"
    },
    {
      chartType: "pie" as const,
      dataType: "topicDistribution",
      title: "Topic Distribution",
      icon: <TagIcon className="w-5 h-5" />,
      gradient: "from-purple-500 to-pink-600",
      description: "Topic breakdown overview",
      bgColor: "bg-purple-50 dark:bg-purple-900/10",
      borderColor: "border-purple-200 dark:border-purple-800"
    },
    {
      chartType: "bar" as const,
      dataType: "intensityBySector",
      title: "Intensity by Sector",
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
      gradient: "from-emerald-500 to-teal-600",
      description: "Sector-wise intensity metrics",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/10",
      borderColor: "border-emerald-200 dark:border-emerald-800"
    },
    {
      chartType: "line" as const,
      dataType: "yearlyTrends",
      title: "Yearly Trends",
      icon: <ClockIcon className="w-5 h-5" />,
      gradient: "from-orange-500 to-red-600",
      description: "Time-based trend analysis",
      bgColor: "bg-orange-50 dark:bg-orange-900/10",
      borderColor: "border-orange-200 dark:border-orange-800"
    },
    {
      chartType: "doughnut" as const,
      dataType: "pestleAnalysis",
      title: "PESTLE Analysis",
      icon: <BeakerIcon className="w-5 h-5" />,
      gradient: "from-indigo-500 to-purple-600",
      description: "PESTLE framework insights",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/10",
      borderColor: "border-indigo-200 dark:border-indigo-800"
    },
    {
      chartType: "bar" as const,
      dataType: "countryComparison",
      title: "Country Comparison",
      icon: <MapPinIcon className="w-5 h-5" />,
      gradient: "from-rose-500 to-pink-600",
      description: "Cross-country analysis",
      bgColor: "bg-rose-50 dark:bg-rose-900/10",
      borderColor: "border-rose-200 dark:border-rose-800"
    }
  ];

  const activeFiltersCount = Object.values(filters).filter(value => value !== null && value !== '').length;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <LoadingOverlay isLoading={isLoading} />
      <Sidebar currentPage="dashboard" />
      
      <main className="flex-1 p-6 overflow-auto pt-16 lg:pt-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <Header 
            title="Data Visualization Dashboard" 
            subtitle="Interactive insights from global data"
            totalRecords={totalRecords}
            activeFiltersCount={activeFiltersCount}
            lastUpdated={lastUpdated}
          />
          
          {/* Filter Bar */}
          <FilterBar 
            onFilterChange={handleFilterChange}
            activeFilters={filters}
          />
          
          {/* Stats Summary */}
          <StatsSummary filters={filters} />
          
          {/* Dashboard Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <PresentationChartLineIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
                  Dashboard Overview
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Comprehensive data visualizations and insights
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-700">
                <div className="flex items-center space-x-3">
                  <ChartBarIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Charts</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">6</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-700">
                <div className="flex items-center space-x-3">
                  <EyeIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Visualizations</p>
                    <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">Live</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-700">
                <div className="flex items-center space-x-3">
                  <SparklesIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Insights</p>
                    <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">Real-time</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-700">
                <div className="flex items-center space-x-3">
                  <CubeTransparentIcon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                  <div>
                    <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Interactive</p>
                    <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">100%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts Grid - First Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {chartConfigs.slice(0, 2).map((config, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`h-12 w-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                      {config.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-poppins">
                        {config.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {config.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600">
                    {config.chartType.toUpperCase()}
                  </div>
                </div>
                
                {/* Chart Container with enhanced styling */}
                <div className={`${config.bgColor} rounded-xl p-4 border-2 ${config.borderColor} transition-all duration-200`}>
                  <ChartComponent 
                    chartType={config.chartType} 
                    dataType={config.dataType} 
                    filters={filters} 
                    title={config.title}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Charts Grid - Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {chartConfigs.slice(2, 4).map((config, index) => (
              <div 
                key={index + 2} 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`h-12 w-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                      {config.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-poppins">
                        {config.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {config.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600">
                    {config.chartType.toUpperCase()}
                  </div>
                </div>
                
                {/* Chart Container with enhanced styling */}
                <div className={`${config.bgColor} rounded-xl p-4 border-2 ${config.borderColor} transition-all duration-200`}>
                  <ChartComponent 
                    chartType={config.chartType} 
                    dataType={config.dataType} 
                    filters={filters} 
                    title={config.title}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Charts Grid - Third Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {chartConfigs.slice(4, 6).map((config, index) => (
              <div 
                key={index + 4} 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-gray-100 dark:border-gray-700 p-6 hover:shadow-xl hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`h-12 w-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200 shadow-lg`}>
                      {config.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white font-poppins">
                        {config.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {config.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-600">
                    {config.chartType.toUpperCase()}
                  </div>
                </div>
                
                {/* Chart Container with enhanced styling */}
                <div className={`${config.bgColor} rounded-xl p-4 border-2 ${config.borderColor} transition-all duration-200`}>
                  <ChartComponent 
                    chartType={config.chartType} 
                    dataType={config.dataType} 
                    filters={filters} 
                    title={config.title}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Data Table Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-500 dark:to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                  <TableCellsIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
                    Insights Data
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Detailed data table with export functionality
                  </p>
                </div>
              </div>
              <ExportData filters={filters} />
            </div>
            
            {/* Table Container */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
              <DataTable filters={filters} />
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-700 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <DocumentChartBarIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-100">
                Dashboard Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-indigo-200 dark:border-indigo-700">
                <p className="font-medium mb-2 text-indigo-900 dark:text-indigo-100">Real-time Updates</p>
                <p className="text-indigo-700 dark:text-indigo-300">
                  All visualizations update automatically based on your filter selections
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-indigo-200 dark:border-indigo-700">
                <p className="font-medium mb-2 text-indigo-900 dark:text-indigo-100">Interactive Charts</p>
                <p className="text-indigo-700 dark:text-indigo-300">
                  Click and hover on chart elements for detailed information
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-indigo-200 dark:border-indigo-700">
                <p className="font-medium mb-2 text-indigo-900 dark:text-indigo-100">Export Options</p>
                <p className="text-indigo-700 dark:text-indigo-300">
                  Export filtered data and charts for further analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}