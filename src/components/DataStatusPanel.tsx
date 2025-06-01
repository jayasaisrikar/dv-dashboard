import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import Link from 'next/link';

interface DataStatusPanelProps {
  status: 'loading' | 'success' | 'error';
  data: any;
  error: string | null;
}

export default function DataStatusPanel({ status, data, error }: DataStatusPanelProps) {
  return (    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 font-poppins">JSON Data Status</h2>
      
      {status === 'loading' && (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
          <p className="ml-2 text-gray-600">Checking JSON data access...</p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="py-4">
          <ErrorMessage message={error || 'Unknown error'} />
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-md">
            <h3 className="text-amber-800 font-medium">Troubleshooting Steps</h3>
            <ol className="mt-2 list-decimal list-inside text-amber-700 space-y-1">
              <li>Make sure <code>jsondata.json</code> exists in the project directory or parent directory</li>
              <li>Check that the JSON file is properly formatted</li>
              <li>Restart the Next.js development server</li>
              <li>Check server logs for more detailed error messages</li>
            </ol>
          </div>
        </div>
      )}
      
      {status === 'success' && (
        <div className="py-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md mb-4">
            <p className="text-green-800">
              <span className="font-medium">✓ Data Loaded Successfully!</span> Local JSON data is being used.
            </p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-900">Data Status</h3>
            <dl className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-md border border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Total Records</dt>
                <dd className="mt-1 text-xl font-semibold text-indigo-600">{data?.recordCount || 0}</dd>
              </div>
              <div className="p-3 bg-white rounded-md border border-gray-200">
                <dt className="text-sm font-medium text-gray-500">Data Source</dt>
                <dd className="mt-1 text-xl font-semibold text-green-600">Local JSON</dd>
              </div>
            </dl>
          </div>
          
          {data?.sampleRecord && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Sample Record</h3>
              <div className="mt-2 overflow-x-auto">
                <pre className="p-4 bg-gray-800 text-gray-100 rounded-md text-sm">
                  {JSON.stringify(data.sampleRecord, null, 2)}
                </pre>
              </div>
            </div>
          )}
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Next Steps</h3>
            <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
              <li>Go to the <Link href="/" className="text-blue-600 hover:text-blue-800">Dashboard</Link> to start exploring your data</li>
              <li>Check the <Link href="/analytics" className="text-blue-600 hover:text-blue-800">Analytics</Link> page for detailed insights</li>
              <li>Use the <Link href="/filters" className="text-blue-600 hover:text-blue-800">Filters</Link> page to search through your data</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
