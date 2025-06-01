"use client";

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { FilterState, Insight } from '@/types';

export default function Filters() {
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

  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchInsights();
  }, [filters, currentPage]);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      
      // Construct query string from filters
      const queryParams = new URLSearchParams();
      
      if (filters.endYear) queryParams.append('endYear', filters.endYear);
      if (filters.topic) queryParams.append('topic', filters.topic);
      if (filters.sector) queryParams.append('sector', filters.sector);
      if (filters.region) queryParams.append('region', filters.region);
      if (filters.pestle) queryParams.append('pestle', filters.pestle);
      if (filters.source) queryParams.append('source', filters.source);
      if (filters.swot) queryParams.append('swot', filters.swot);
      if (filters.country) queryParams.append('country', filters.country);
      if (filters.city) queryParams.append('city', filters.city);
      
      // Add pagination
      queryParams.append('page', currentPage.toString());
      queryParams.append('limit', itemsPerPage.toString());
      
      const response = await fetch(`/api/insights?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch insights');
      }
      
      const { data, total } = await response.json();
      
      setInsights(data || []);
      setTotalPages(Math.ceil((total || 0) / itemsPerPage));
    } catch (error) {
      console.error('Error fetching insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType: keyof FilterState, value: string | null) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <>
      <Sidebar currentPage="filters" />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Header 
            title="Data Filters & Results" 
            subtitle="Search and filter through all the insights data"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2 bg-white shadow rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* End Year Filter */}
                <div>
                  <label htmlFor="endYear" className="block text-sm font-medium text-gray-700">End Year</label>
                  <select
                    id="endYear"
                    value={filters.endYear || ''}
                    onChange={(e) => handleFilterChange('endYear', e.target.value || null)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Years</option>
                    {/* This would be populated from API */}
                  </select>
                </div>
                
                {/* Topic Filter */}
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
                  <select
                    id="topic"
                    value={filters.topic || ''}
                    onChange={(e) => handleFilterChange('topic', e.target.value || null)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Topics</option>
                    {/* This would be populated from API */}
                  </select>
                </div>
                
                {/* Sector Filter */}
                <div>
                  <label htmlFor="sector" className="block text-sm font-medium text-gray-700">Sector</label>
                  <select
                    id="sector"
                    value={filters.sector || ''}
                    onChange={(e) => handleFilterChange('sector', e.target.value || null)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Sectors</option>
                    {/* This would be populated from API */}
                  </select>
                </div>
                
                {/* Region Filter */}
                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region</label>
                  <select
                    id="region"
                    value={filters.region || ''}
                    onChange={(e) => handleFilterChange('region', e.target.value || null)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Regions</option>
                    {/* This would be populated from API */}
                  </select>
                </div>
                
                {/* PESTLE Filter */}
                <div>
                  <label htmlFor="pestle" className="block text-sm font-medium text-gray-700">PESTLE</label>
                  <select
                    id="pestle"
                    value={filters.pestle || ''}
                    onChange={(e) => handleFilterChange('pestle', e.target.value || null)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">All PESTLE</option>
                    {/* This would be populated from API */}
                  </select>
                </div>
                
                {/* Source Filter */}
                <div>
                  <label htmlFor="source" className="block text-sm font-medium text-gray-700">Source</label>
                  <select
                    id="source"
                    value={filters.source || ''}
                    onChange={(e) => handleFilterChange('source', e.target.value || null)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">All Sources</option>
                    {/* This would be populated from API */}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => {
                    setFilters({
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
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Reset Filters
                </button>
              </div>
            </div>
            
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Active Filters</h2>
              <div className="space-y-2">
                {Object.entries(filters).map(([key, value]) => {
                  if (value) {
                    return (
                      <div key={key} className="flex items-center justify-between bg-indigo-50 p-2 rounded">
                        <span className="text-sm text-gray-700 capitalize">{key}: {value}</span>
                        <button
                          onClick={() => handleFilterChange(key as keyof FilterState, null)}
                          className="text-indigo-600 hover:text-indigo-800"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                    );
                  }
                  return null;
                })}
                {!Object.values(filters).some(value => value !== null) && (
                  <p className="text-gray-500 text-sm">No active filters. All data is being displayed.</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-700">Results</h2>
            </div>
            
            {loading ? (
              <div className="p-4 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : insights.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Intensity</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likelihood</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relevance</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {insights.map((insight) => (
                      <tr key={insight.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{insight.topic || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{insight.sector || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{insight.region || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{insight.country || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{insight.intensity || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{insight.likelihood || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{insight.relevance || 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No results found for the selected filters.
              </div>
            )}
            
            {insights.length > 0 && (
              <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === 1 ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                      currentPage === totalPages ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(currentPage * itemsPerPage, (totalPages * itemsPerPage))}
                      </span>{' '}
                      of <span className="font-medium">{totalPages * itemsPerPage}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {/* Page numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`relative inline-flex items-center px-4 py-2 border ${
                            page === currentPage
                              ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          } text-sm font-medium`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === totalPages ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
