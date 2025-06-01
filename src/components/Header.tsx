"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Added import
import { 
  MagnifyingGlassIcon, 
  BellIcon, 
  Cog6ToothIcon, 
  ArrowPathIcon,
  CommandLineIcon,
  ChartBarIcon,
  UsersIcon,
  GlobeAltIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  title: string;
  subtitle?: string;
  totalRecords?: number | string;
  activeFiltersCount?: number | string;
  lastUpdated?: string;
  onRefresh?: () => void;
  showBreadcrumb?: boolean;
  breadcrumbItems?: Array<{ label: string; href?: string }>;
}

export default function Header({ 
  title, 
  subtitle, 
  totalRecords,
  activeFiltersCount,
  lastUpdated,
  onRefresh, 
  showBreadcrumb = false, 
  breadcrumbItems = [] 
}: HeaderProps) {
  const router = useRouter(); // Initialized router
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false); // Added this line
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format date as: June 1, 2025
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentDate);
  
  // Format time as: 12:30 PM
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(currentDate);

  const handleRefresh = async () => {
    if (onRefresh) {
      setIsRefreshing(true);
      await onRefresh();
      setTimeout(() => setIsRefreshing(false), 1000); // Ensure setIsRefreshing is defined
    }
  };

  const quickStats = [
    { 
      label: 'Total Records', 
      value: totalRecords !== undefined ? String(totalRecords) : 'N/A', 
      // trend: '+12%', // Trend might need to be dynamic or passed as a prop too
      color: 'text-emerald-600' 
    },
    { 
      label: 'Active Filters', 
      value: activeFiltersCount !== undefined ? String(activeFiltersCount) : 'N/A', 
      color: 'text-blue-600' 
    },
    { 
      label: 'Last Updated', 
      value: lastUpdated || 'N/A', 
      // trend: 'Live', // Trend might need to be dynamic or passed as a prop too
      color: 'text-orange-600' 
    }
  ];

  return (
    <div className="mb-8">
      {/* Breadcrumb */}
      {showBreadcrumb && breadcrumbItems.length > 0 && (
        <nav className="mb-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {item.href ? (
                  <a href={item.href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <span className="font-medium text-gray-900 dark:text-white">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* Main Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          {/* Title Section */}
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <ChartBarIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent font-poppins">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-gray-600 dark:text-gray-400 mt-1 font-poppins text-lg">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 mt-4">
              {quickStats.map((stat) => (
                <div key={stat.label} className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 rounded-lg px-3 py-1.5">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{stat.label}:</span>
                  <span className={cn("text-sm font-semibold", stat.color)}>{stat.value}</span>
                  {/* Trend display logic removed to fix type error - add 'trend' to HeaderProps and quickStats if needed */}
                </div>
              ))}
            </div>
          </div>
        
          {/* Action Section */}
          <div className="mt-4 sm:mt-0 flex items-center space-x-2">
            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="text-sm py-2 pl-3 pr-10 w-48 focus:outline-none bg-transparent dark:text-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 absolute right-3" />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-2">
              <ThemeToggle className="p-2" />
              
              {/* Notifications */}
              <div className="relative">
                <button 
                  className={cn(
                    "p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-colors",
                    showNotifications && "text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-gray-700"
                  )}
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <BellIcon className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10 py-1">
                    <div className="p-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-xs font-medium dark:text-gray-200">Notifications</p>
                    </div>
                    <div className="p-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <p>New data available for analysis</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">5 minutes ago</p>
                    </div>
                    <div className="p-2 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                      <p>System update completed</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Settings */} 
              <button 
                className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-colors"
                aria-label="Settings"
                onClick={() => router.push('/settings')} // Added onClick handler
              >
                <Cog6ToothIcon className="h-5 w-5" />
              </button>
              
              {/* Refresh */}
              <button 
                className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:text-gray-400 dark:hover:text-indigo-400 dark:hover:bg-gray-700 transition-colors"
                onClick={handleRefresh}
                aria-label="Refresh data"
              >
                <ArrowPathIcon className={cn("h-5 w-5", isRefreshing && "animate-spin")} />
              </button>
            </div>
            
            {/* Date/Time Display */}
            <div className="hidden md:flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm px-3 py-2 border border-gray-100 dark:border-gray-700">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{formattedDate}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{formattedTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
