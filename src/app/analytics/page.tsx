"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import FilterBar from '@/components/FilterBar';
import ChartComponent from '@/components/ChartComponent';
import Header from '@/components/Header';
import { FilterState } from '@/types';
import {
  ChartBarIcon,
  ChartPieIcon,
  AdjustmentsHorizontalIcon,
  InformationCircleIcon,
  LightBulbIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

export default function Analytics() {
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

  const [selectedChartType, setSelectedChartType] = useState<'bar' | 'line' | 'pie' | 'doughnut'>('bar');
  const [selectedDataType, setSelectedDataType] = useState('intensityByRegion');

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const chartOptions = [
    { id: 'intensityByRegion', name: 'Intensity by Region', icon: <ChartBarIcon className="w-4 h-4" /> },
    { id: 'likelihoodByRegion', name: 'Likelihood by Region', icon: <EyeIcon className="w-4 h-4" /> },
    { id: 'relevanceByRegion', name: 'Relevance by Region', icon: <SparklesIcon className="w-4 h-4" /> },
    { id: 'topicDistribution', name: 'Topic Distribution', icon: <ChartPieIcon className="w-4 h-4" /> },
    { id: 'intensityBySector', name: 'Intensity by Sector', icon: <ChartBarIcon className="w-4 h-4" /> },
    { id: 'yearlyTrends', name: 'Yearly Trends', icon: <ChartBarIcon className="w-4 h-4" /> },
    { id: 'countryComparison', name: 'Country Comparison', icon: <ChartBarIcon className="w-4 h-4" /> },
    { id: 'pestleAnalysis', name: 'PESTLE Analysis', icon: <ChartPieIcon className="w-4 h-4" /> }
  ];

  const chartTypeOptions = [
    { id: 'bar', name: 'Bar Chart', icon: <ChartBarIcon className="w-4 h-4" /> },
    { id: 'line', name: 'Line Chart', icon: <ChartBarIcon className="w-4 h-4" /> },
    { id: 'pie', name: 'Pie Chart', icon: <ChartPieIcon className="w-4 h-4" /> },
    { id: 'doughnut', name: 'Doughnut Chart', icon: <ChartPieIcon className="w-4 h-4" /> }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar currentPage="analytics" />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          <Header 
            title="Advanced Analytics" 
            subtitle="Deep dive into the data with custom visualizations"
          />
          
          {/* Filter Bar */}
          <FilterBar 
            onFilterChange={handleFilterChange}
            activeFilters={filters}
          />
          
          {/* Chart Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
                  Chart Controls
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Customize your visualization preferences
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Chart Type Selector */}
              <div className="space-y-3">
                <label htmlFor="chartType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Chart Type
                </label>
                <div className="relative">
                  <select
                    id="chartType"
                    value={selectedChartType}
                    onChange={(e) => setSelectedChartType(e.target.value as any)}
                    className="w-full pl-4 pr-10 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-200"
                  >
                    {chartTypeOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                  <CogIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                </div>
              </div>
              
              {/* Data Type Selector */}
              <div className="space-y-3">
                <label htmlFor="dataType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Chart Data
                </label>
                <div className="relative">
                  <select
                    id="dataType"
                    value={selectedDataType}
                    onChange={(e) => setSelectedDataType(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-200"
                  >
                    {chartOptions.map(option => (
                      <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                  </select>
                  <ChartBarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <SparklesIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quick Actions
                  </span>
                </div>
                <button className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm">
                  <ArrowDownTrayIcon className="w-4 h-4" />
                  <span>Export Chart</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Chart Component */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  {chartOptions.find(option => option.id === selectedDataType)?.icon || <ChartBarIcon className="h-5 w-5 text-white" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
                    {chartOptions.find(option => option.id === selectedDataType)?.name || 'Data Visualization'}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Interactive {selectedChartType} chart visualization
                  </p>
                </div>
              </div>
            </div>
            
            <ChartComponent 
              chartType={selectedChartType} 
              dataType={selectedDataType} 
              filters={filters} 
              title={chartOptions.find(option => option.id === selectedDataType)?.name || ''}
            />
          </div>
          
          {/* Data Insights */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <LightBulbIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
                  Data Insights
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Understanding your visualization
                </p>
              </div>
            </div>
            
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                This visualization shows patterns and trends in the data. The chart above can be configured to display different metrics and dimensions based on your selection and filters.
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Use the filter panel to narrow down the data to specific regions, topics, or time periods.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Change the chart type to explore different visual representations of the same data.
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Switch between different data dimensions to discover patterns across various aspects of the dataset.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Data Quality Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <InformationCircleIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
                    Data Quality Information
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Source and methodology details
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900 dark:text-white">Data Source:</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      The insights data was collected from various sources as indicated in the source filter.
                    </span>
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900 dark:text-white">Time Range:</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      The data spans multiple years and provides insights into various topics across different regions.
                    </span>
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900 dark:text-white">Analysis Method:</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      The visualizations present aggregations and distributions of key metrics like intensity, likelihood, and relevance.
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* How to Use */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <DocumentTextIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
                    How to Use
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Step-by-step guidance
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl border border-indigo-200 dark:border-indigo-700">
                  <p className="text-sm">
                    <span className="font-semibold text-indigo-700 dark:text-indigo-300">Filters:</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      Apply filters to focus on specific subsets of data.
                    </span>
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                  <p className="text-sm">
                    <span className="font-semibold text-blue-700 dark:text-blue-300">Chart Selection:</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      Choose from various chart types to visualize the data in different ways.
                    </span>
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-700">
                  <p className="text-sm">
                    <span className="font-semibold text-emerald-700 dark:text-emerald-300">Data Metrics:</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      Select from different metrics to explore various aspects of the insights dataset.
                    </span>
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
                  <p className="text-sm">
                    <span className="font-semibold text-purple-700 dark:text-purple-300">Export:</span>
                    <span className="text-gray-600 dark:text-gray-300 ml-2">
                      Use browser tools to save or export charts for reporting purposes.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}