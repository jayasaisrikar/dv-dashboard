"use client";

import { useState } from 'react';
import { Insight } from '@/types';

interface InsightDetailsProps {
  insight: Insight | null;
  onClose: () => void;
}

export default function InsightDetails({ insight, onClose }: InsightDetailsProps) {
  if (!insight) return null;
  const renderField = (label: string, value: string | number | null, className: string = "") => (
    <div className={`mb-4 ${className}`}>
      <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
      <span className="mt-1 block text-gray-900 dark:text-gray-100">{value || 'N/A'}</span>
    </div>
  );
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div 
        className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-auto border border-gray-100 dark:border-gray-700 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 rounded-t-xl">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold font-poppins">{insight.title || 'Untitled Insight'}</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-white/70 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex space-x-2 mt-2">
            {insight.topic && (
              <span className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full">
                {insight.topic}
              </span>
            )}
            {insight.pestle && (
              <span className="bg-purple-500/30 text-white text-xs px-2.5 py-1 rounded-full">
                {insight.pestle}
              </span>
            )}
          </div>
        </div>
            <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">Overview</h3>
              <div className="space-y-3">
                {renderField("Sector", insight.sector)}
                {renderField("Region", insight.region)}
                {renderField("Country", insight.country)}
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-100 dark:border-gray-600">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">Metrics</h3>
              <div className="space-y-3">
                <div className="mb-2">
                  <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">Intensity</span>
                  <div className="mt-1 flex items-center">
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, insight.intensity || 0)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-200">{insight.intensity || 0}</span>
                  </div>
                </div>
                
                <div className="mb-2">
                  <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">Likelihood</span>
                  <div className="mt-1 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (insight.likelihood || 0) * 10)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{insight.likelihood || 0}</span>
                  </div>
                </div>
                
                <div>
                  <span className="block text-xs font-medium text-gray-500">Relevance</span>
                  <div className="mt-1 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(100, (insight.relevance || 0) * 10)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{insight.relevance || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Timeline</h3>
              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-xs font-medium text-gray-500">Start Year</span>
                  <span className="block text-sm font-medium text-gray-900 mt-1">{insight.start_year || 'N/A'}</span>
                </div>
                <div className="h-0.5 flex-1 bg-gray-200 mx-4 rounded-full">
                  <div className="h-0.5 bg-indigo-600 rounded-full" style={{ width: '50%' }}></div>
                </div>
                <div>
                  <span className="block text-xs font-medium text-gray-500">End Year</span>
                  <span className="block text-sm font-medium text-gray-900 mt-1">{insight.end_year || 'N/A'}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Information</h3>
              <div className="space-y-2">
                {renderField("Source", insight.source)}
                {renderField("Added", new Date(insight.added).toLocaleDateString())}
                {renderField("Published", new Date(insight.published).toLocaleDateString())}
              </div>
            </div>
          </div>
            
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Insight Details</h3>
            <p className="text-gray-700 whitespace-pre-line text-sm">{insight.insight || 'No additional details available.'}</p>
          </div>
            
          {insight.url && (
            <div className="flex justify-end mt-6">
              <a 
                href={insight.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                View Source
                <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
