"use client";

import { useState, useEffect } from 'react';
import { FilterState, Insight } from '@/types';
import InsightDetails from './InsightDetails';

interface DataTableProps {
  filters: FilterState;
}

export default function DataTable({ filters }: DataTableProps) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const queryParams = new URLSearchParams();
        queryParams.append('page', page.toString());
        queryParams.append('limit', '10');
        
        if (filters.endYear) queryParams.append('endYear', filters.endYear);
        if (filters.topic) queryParams.append('topic', filters.topic);
        if (filters.sector) queryParams.append('sector', filters.sector);
        if (filters.region) queryParams.append('region', filters.region);
        if (filters.pestle) queryParams.append('pestle', filters.pestle);
        if (filters.source) queryParams.append('source', filters.source);
        if (filters.country) queryParams.append('country', filters.country);
        
        const response = await fetch(`/api/insights?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch insights');
        }
        
        const result = await response.json();
        setInsights(result.data);
        setTotalPages(Math.ceil(result.total / result.limit));
      } catch (error) {
        console.error('Error fetching insights:', error);
        setError('Failed to load insights');
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [filters, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-4 mb-6">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
          </div>
          <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg"></div>
          ))}
          <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col items-center text-center py-6">
          <div className="rounded-full bg-red-50 dark:bg-red-900/20 p-3 mb-2">
            <svg className="h-6 w-6 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-500 dark:text-red-400 font-medium mt-2">{error}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please try refreshing the page or check your connection.</p>
        </div>
      </div>
    );
  }
  if (insights.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col items-center text-center py-8">
          <div className="rounded-full bg-blue-50 dark:bg-blue-900/20 p-4 mb-3">
            <svg className="h-8 w-8 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-700 dark:text-gray-200 font-medium text-lg">No insights found</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-sm">Try adjusting your filters or clearing them to see more results.</p>
        </div>
      </div>
    );
  }  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 mb-6 overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-white dark:from-gray-800 to-gray-50/50 dark:to-gray-700/50">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-poppins flex items-center">
          <svg className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Insights Data
        </h3>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-medium">
            {insights.length} results
          </span>
          <div className="border-l border-gray-200 dark:border-gray-700 h-5 mx-2"></div>
          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md text-gray-600 dark:text-gray-400 font-medium">
            Page {page} of {totalPages}
          </span>
        </div>
      </div>        <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-indigo-50/50 to-gray-50 dark:from-gray-800 dark:to-gray-800">
            <tr>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Topic</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Sector</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Region</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Intensity</th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Likelihood</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
            {insights.map((insight) => (
              <tr 
                key={insight.id} 
                className="hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 cursor-pointer transition-colors"
                onClick={() => setSelectedInsight(insight)}
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">
                  {insight.title || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs">
                    {insight.topic || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  {insight.sector || 'N/A'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="inline-flex items-center px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
                    {insight.region || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2 max-w-[50px]">
                      <div className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, insight.intensity)}%` }}></div>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      {insight.intensity || 0}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mr-2 max-w-[50px]">
                      <div className="bg-green-600 dark:bg-green-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, insight.likelihood * 10)}%` }}></div>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                      {insight.likelihood || 0}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-xl">
        <div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
          Showing <span className="font-medium dark:text-gray-300">{insights.length}</span> of <span className="font-medium dark:text-gray-300">{totalPages * 10}</span> entries
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
              page === 1 
                ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-800 cursor-not-allowed' 
                : 'border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
            }`}
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`ml-3 relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
              page === totalPages 
                ? 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 bg-gray-50 dark:bg-gray-800 cursor-not-allowed' 
                : 'border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
            }`}
          >
            Next
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {selectedInsight && (
        <InsightDetails 
          insight={selectedInsight} 
          onClose={() => setSelectedInsight(null)} 
        />
      )}
    </div>
  );
}
