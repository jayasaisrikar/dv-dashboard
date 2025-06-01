"use client";

import { FilterState, Insight } from '@/types';

interface ExportDataProps {
  filters: FilterState;
}

export default function ExportData({ filters }: ExportDataProps) {
  const downloadCSV = async () => {
    try {
      // Construct query string from filters
      const queryParams = new URLSearchParams();
      queryParams.append('limit', '1000'); // Get a larger dataset for export
      
      if (filters.endYear) queryParams.append('endYear', filters.endYear);
      if (filters.topic) queryParams.append('topic', filters.topic);
      if (filters.sector) queryParams.append('sector', filters.sector);
      if (filters.region) queryParams.append('region', filters.region);
      if (filters.pestle) queryParams.append('pestle', filters.pestle);
      if (filters.source) queryParams.append('source', filters.source);
      if (filters.country) queryParams.append('country', filters.country);
      
      const response = await fetch(`/api/insights?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data for export');
      }
      
      const result = await response.json();
      const insights: Insight[] = result.data;
      
      // Convert to CSV
      const headers = [
        'ID', 'Title', 'Topic', 'Sector', 'Region', 'Country', 
        'Intensity', 'Likelihood', 'Relevance', 'PESTLE', 
        'Start Year', 'End Year', 'Added', 'Published', 'Source'
      ];
      
      const csvRows = [
        headers.join(','),
        ...insights.map(item => [
          `"${item.id || ''}"`,
          `"${(item.title || '').replace(/"/g, '""')}"`,
          `"${(item.topic || '').replace(/"/g, '""')}"`,
          `"${(item.sector || '').replace(/"/g, '""')}"`,
          `"${(item.region || '').replace(/"/g, '""')}"`,
          `"${(item.country || '').replace(/"/g, '""')}"`,
          item.intensity || 0,
          item.likelihood || 0,
          item.relevance || 0,
          `"${(item.pestle || '').replace(/"/g, '""')}"`,
          `"${(item.start_year || '').replace(/"/g, '""')}"`,
          `"${(item.end_year || '').replace(/"/g, '""')}"`,
          `"${(item.added || '').replace(/"/g, '""')}"`,
          `"${(item.published || '').replace(/"/g, '""')}"`,
          `"${(item.source || '').replace(/"/g, '""')}"`
        ].join(','))
      ];
      
      const csvString = csvRows.join('\n');
      
      // Create download link
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Prepare file name with current date
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      
      link.setAttribute('href', url);
      link.setAttribute('download', `insights-data-${dateStr}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      
      link.click();
      
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  return (
    <button
      onClick={downloadCSV}
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    >
      <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
      Export to CSV
    </button>
  );
}
