import { useState, useEffect } from 'react';
import { FilterState } from '@/types';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  StarIcon,
  GlobeAltIcon,
  TagIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface StatsSummaryProps {
  filters: FilterState;
}

interface StatsData {
  totalRecords: number;
  avgIntensity: number;
  avgLikelihood: number;
  avgRelevance: number;
  topRegion: string;
  topTopic: string;
  filteredPercentage: number;
  totalDatasetSize: number;
}

export default function StatsSummary({ filters }: StatsSummaryProps) {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Construct query string from filters - only include non-null values
        const queryParams = new URLSearchParams();
        
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== '') {
            queryParams.append(key, value);
          }
        });
        
        // Fetch filtered data
        const response = await fetch(`/api/insights?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch insights data: ${response.status}`);
        }
        
        const result = await response.json();
        const data = result.data || result; // Handle different API response formats
        
        // Also fetch total dataset size for comparison
        const totalResponse = await fetch('/api/insights');
        const totalResult = await totalResponse.json();
        const totalData = totalResult.data || totalResult;
        const totalDatasetSize = Array.isArray(totalData) ? totalData.length : 0;
        
        if (!Array.isArray(data) || data.length === 0) {
          setStats({
            totalRecords: 0,
            avgIntensity: 0,
            avgLikelihood: 0,
            avgRelevance: 0,
            topRegion: 'N/A',
            topTopic: 'N/A',
            filteredPercentage: 0,
            totalDatasetSize
          });
          return;
        }
        
        // Calculate statistics
        const totalRecords = data.length;
        
        // Calculate averages (filter out null/undefined values)
        const validIntensity = data.filter((item: any) => item.intensity != null && !isNaN(item.intensity));
        const validLikelihood = data.filter((item: any) => item.likelihood != null && !isNaN(item.likelihood));
        const validRelevance = data.filter((item: any) => item.relevance != null && !isNaN(item.relevance));
        
        const avgIntensity = validIntensity.length > 0 
          ? Math.round((validIntensity.reduce((sum: number, item: any) => sum + Number(item.intensity), 0) / validIntensity.length) * 10) / 10
          : 0;
          
        const avgLikelihood = validLikelihood.length > 0
          ? Math.round((validLikelihood.reduce((sum: number, item: any) => sum + Number(item.likelihood), 0) / validLikelihood.length) * 10) / 10
          : 0;
          
        const avgRelevance = validRelevance.length > 0
          ? Math.round((validRelevance.reduce((sum: number, item: any) => sum + Number(item.relevance), 0) / validRelevance.length) * 10) / 10
          : 0;
        
        // Find top region and topic
        const regionCounts: Record<string, number> = {};
        const topicCounts: Record<string, number> = {};
        
        data.forEach((item: any) => {
          if (item.region && item.region.trim()) {
            const region = item.region.trim();
            regionCounts[region] = (regionCounts[region] || 0) + 1;
          }
          
          if (item.topic && item.topic.trim()) {
            const topic = item.topic.trim();
            topicCounts[topic] = (topicCounts[topic] || 0) + 1;
          }
        });
        
        const topRegion = Object.entries(regionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
        const topTopic = Object.entries(topicCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
        
        const filteredPercentage = totalDatasetSize > 0 
          ? Math.round((totalRecords / totalDatasetSize) * 100)
          : 0;
        
        setStats({
          totalRecords,
          avgIntensity,
          avgLikelihood,
          avgRelevance,
          topRegion,
          topTopic,
          filteredPercentage,
          totalDatasetSize
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError(error instanceof Error ? error.message : 'Failed to load statistics');
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [filters]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center space-x-3 mb-6">
          <ArrowPathIcon className="w-5 h-5 animate-spin text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Loading Statistics...</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3 mb-3"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mb-2"></div>
              <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-center space-x-3 text-red-600 dark:text-red-400">
          <ExclamationTriangleIcon className="w-5 h-5" />
          <p className="font-medium">Error loading statistics: {error}</p>
        </div>
      </div>
    );
  }

  if (!stats || stats.totalRecords === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-6">
        <div className="text-center">
          <ChartBarIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Data Available</h3>
          <p className="text-gray-500 dark:text-gray-400">
            No records match the selected filters. Try adjusting your filter criteria.
          </p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Records',
      value: stats.totalRecords.toLocaleString(),
      subtitle: `${stats.filteredPercentage}% of dataset`,
      icon: <ChartBarIcon className="w-5 h-5" />,
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-700',
      progress: stats.filteredPercentage
    },
    {
      title: 'Avg. Intensity',
      value: stats.avgIntensity.toString(),
      subtitle: 'Impact Level',
      icon: <ArrowTrendingUpIcon className="w-5 h-5" />,
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-200 dark:border-purple-700',
      progress: Math.min(100, (stats.avgIntensity / 10) * 100)
    },
    {
      title: 'Avg. Likelihood',
      value: stats.avgLikelihood.toString(),
      subtitle: 'Probability Score',
      icon: <EyeIcon className="w-5 h-5" />,
      gradient: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      borderColor: 'border-emerald-200 dark:border-emerald-700',
      progress: Math.min(100, (stats.avgLikelihood / 10) * 100)
    },
    {
      title: 'Avg. Relevance',
      value: stats.avgRelevance.toString(),
      subtitle: 'Relevance Score',
      icon: <StarIcon className="w-5 h-5" />,
      gradient: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      textColor: 'text-amber-600 dark:text-amber-400',
      borderColor: 'border-amber-200 dark:border-amber-700',
      progress: Math.min(100, (stats.avgRelevance / 10) * 100)
    },
    {
      title: 'Top Region',
      value: stats.topRegion,
      subtitle: 'Most Active',
      icon: <GlobeAltIcon className="w-5 h-5" />,
      gradient: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50 dark:bg-rose-900/20',
      textColor: 'text-rose-600 dark:text-rose-400',
      borderColor: 'border-rose-200 dark:border-rose-700',
      progress: 85
    },
    {
      title: 'Top Topic',
      value: stats.topTopic,
      subtitle: 'Most Discussed',
      icon: <TagIcon className="w-5 h-5" />,
      gradient: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      borderColor: 'border-indigo-200 dark:border-indigo-700',
      progress: 75
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
            <ChartBarIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
              Data Overview
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {stats.totalRecords.toLocaleString()} of {stats.totalDatasetSize.toLocaleString()} records shown
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats.filteredPercentage}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Data Coverage
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div 
            key={stat.title} 
            className={`${stat.bgColor} p-6 rounded-xl border-2 ${stat.borderColor} transition-all duration-300 hover:shadow-lg hover:scale-[1.02] group`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.gradient} text-white group-hover:scale-110 transition-transform duration-200`}>
                {stat.icon}
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${stat.textColor} font-poppins`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {stat.subtitle}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {stat.title}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.round(stat.progress)}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div 
                  className={`h-2 rounded-full bg-gradient-to-r ${stat.gradient} transition-all duration-1000 ease-out`} 
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600 dark:text-gray-400">
            <span className="font-medium">Last Updated:</span> {new Date().toLocaleTimeString()}
          </div>
          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            <span>Real-time Analytics</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}