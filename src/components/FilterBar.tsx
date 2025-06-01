import { useState, useEffect } from 'react';
import { FilterState, FilterOptions } from '@/types';
import { 
  FunnelIcon, 
  XMarkIcon, 
  ChevronDownIcon,
  MagnifyingGlassIcon,
  TagIcon,
  ClockIcon,
  GlobeAmericasIcon,
  BuildingOfficeIcon,
  BeakerIcon,
  DocumentTextIcon,
  ChartBarIcon,
  MapPinIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  ArrowPathIcon,
  CheckIcon
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  activeFilters: FilterState;
}

export default function FilterBar({ onFilterChange, activeFilters }: FilterBarProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    endYear: [],
    topics: [],
    sectors: [],
    regions: [],
    pestle: [],
    sources: [],
    swot: [],
    countries: [],
    cities: []
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch filter options from API
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        
        const response = await fetch('/api/filters');
        
        if (!response.ok) {
          throw new Error('Failed to fetch filter options');
        }
        
        const data = await response.json();
        
        setFilterOptions({
          endYear: data.endYears || [],
          topics: data.topics || [],
          sectors: data.sectors || [],
          regions: data.regions || [],
          pestle: data.pestles || [],
          sources: data.sources || [],
          swot: data.swot || [],
          countries: data.countries || [],
          cities: data.cities || []
        });
      } catch (error) {
        console.error('Error fetching filter options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleFilterChange = (filterType: keyof FilterState, value: string | null) => {
    const updatedFilters = {
      ...activeFilters,
      [filterType]: value === activeFilters[filterType] ? null : value
    };
    
    onFilterChange(updatedFilters);
  };

  // Count active filters
  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value !== null && value !== '').length;
  };

  const resetFilters = () => {
    onFilterChange({
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
    setExpandedFilter(null);
    setSearchTerms({});
  };

  const hasActiveFilters = Object.values(activeFilters).some(value => value !== null);

  const filterConfig = [
    { 
      key: 'endYear', 
      label: 'End Year', 
      icon: <ClockIcon className="w-4 h-4" />, 
      options: filterOptions.endYear,
      color: 'blue'
    },
    { 
      key: 'topic', 
      label: 'Topic', 
      icon: <TagIcon className="w-4 h-4" />, 
      options: filterOptions.topics,
      color: 'emerald'
    },
    { 
      key: 'sector', 
      label: 'Sector', 
      icon: <BuildingOfficeIcon className="w-4 h-4" />, 
      options: filterOptions.sectors,
      color: 'purple'
    },
    { 
      key: 'region', 
      label: 'Region', 
      icon: <GlobeAmericasIcon className="w-4 h-4" />, 
      options: filterOptions.regions,
      color: 'orange'
    },
    { 
      key: 'pestle', 
      label: 'PESTLE', 
      icon: <BeakerIcon className="w-4 h-4" />, 
      options: filterOptions.pestle,
      color: 'pink'
    },
    { 
      key: 'source', 
      label: 'Source', 
      icon: <DocumentTextIcon className="w-4 h-4" />, 
      options: filterOptions.sources,
      color: 'indigo'
    },
    { 
      key: 'country', 
      label: 'Country', 
      icon: <MapPinIcon className="w-4 h-4" />, 
      options: filterOptions.countries,
      color: 'teal'
    },
    { 
      key: 'city', 
      label: 'City', 
      icon: <MapPinIcon className="w-4 h-4" />, 
      options: filterOptions.cities,
      color: 'cyan'
    }
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      blue: isActive 
        ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-700/70 text-blue-800 dark:text-blue-200' 
        : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-600/70 hover:border-blue-300 dark:hover:border-blue-500/70 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50',
      emerald: isActive 
        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-700/70 text-emerald-800 dark:text-emerald-200' 
        : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-600/70 hover:border-emerald-300 dark:hover:border-emerald-500/70 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50',
      purple: isActive 
        ? 'bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-700/70 text-purple-800 dark:text-purple-200' 
        : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-600/70 hover:border-purple-300 dark:hover:border-purple-500/70 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50',
      orange: isActive 
        ? 'bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-700/70 text-orange-800 dark:text-orange-200' 
        : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-600/70 hover:border-orange-300 dark:hover:border-orange-500/70 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50',
      pink: isActive 
        ? 'bg-pink-50 dark:bg-pink-950/60 border-pink-200 dark:border-pink-700/70 text-pink-800 dark:text-pink-200' 
        : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-600/70 hover:border-pink-300 dark:hover:border-pink-500/70 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50',
      indigo: isActive 
        ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-700/70 text-indigo-800 dark:text-indigo-200' 
        : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-600/70 hover:border-indigo-300 dark:hover:border-indigo-500/70 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50',
      teal: isActive 
        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-700/70 text-teal-800 dark:text-teal-200' 
        : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-600/70 hover:border-teal-300 dark:hover:border-teal-500/70 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50',
      cyan: isActive 
        ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-700/70 text-cyan-800 dark:text-cyan-200' 
        : 'bg-white dark:bg-gray-800/80 border-gray-200 dark:border-gray-600/70 hover:border-cyan-300 dark:hover:border-cyan-500/70 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const filteredOptions = (options: string[], searchTerm: string) => {
    if (!searchTerm) return options;
    return options.filter(option => 
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (expandedFilter && !(event.target as Element).closest('.filter-dropdown')) {
        setExpandedFilter(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expandedFilter]);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/70 p-6">
        <div className="flex items-center justify-center space-x-3">
          <ArrowPathIcon className="w-5 h-5 animate-spin text-indigo-600 dark:text-indigo-400" />
          <span className="text-gray-600 dark:text-gray-300">Loading filters...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700/70 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <FunnelIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
              Data Filters
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {getActiveFilterCount()} of {filterConfig.length} filters active
            </p>
          </div>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white rounded-xl hover:from-red-600 hover:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <XMarkIcon className="w-4 h-4" />
            <span className="font-medium">Reset All</span>
          </button>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-xl border border-indigo-200 dark:border-indigo-700/50 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mb-3">
            <SparklesIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Active Filters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterConfig.map((config) => {
              const activeValue = activeFilters[config.key as keyof FilterState];
              if (!activeValue) return null;
              
              return (
                <span
                  key={config.key}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-600/70 text-sm backdrop-blur-sm"
                >
                  <div className="text-gray-600 dark:text-gray-300">
                    {config.icon}
                  </div>
                  <span className="font-medium">{config.label}:</span>
                  <span className="text-gray-800 dark:text-gray-100">{activeValue}</span>
                  <button
                    onClick={() => handleFilterChange(config.key as keyof FilterState, null)}
                    className="ml-1 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  >
                    <XMarkIcon className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filterConfig.map((config) => {
          const isActive = activeFilters[config.key as keyof FilterState] !== null;
          const isExpanded = expandedFilter === config.key;
          const searchTerm = searchTerms[config.key] || '';
          const options = filteredOptions(config.options, searchTerm);
          
          return (
            <div key={config.key} className="relative filter-dropdown">
              <button
                onClick={() => setExpandedFilter(isExpanded ? null : config.key)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md dark:hover:shadow-lg backdrop-blur-sm",
                  getColorClasses(config.color, isActive)
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-lg backdrop-blur-sm",
                    isActive 
                      ? "bg-white/70 dark:bg-gray-600/70 shadow-sm" 
                      : "bg-gray-50 dark:bg-gray-600/60 shadow-sm"
                  )}>
                    <div className={cn(
                      "transition-colors",
                      isActive 
                        ? "text-gray-700 dark:text-gray-200" 
                        : "text-gray-600 dark:text-gray-300"
                    )}>
                      {config.icon}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-gray-900 dark:text-gray-100">{config.label}</div>
                    <div className="text-xs opacity-75 text-gray-600 dark:text-gray-400">
                      {isActive ? activeFilters[config.key as keyof FilterState] : `${config.options.length} options`}
                    </div>
                  </div>
                </div>
                <ChevronDownIcon className={cn(
                  "w-4 h-4 transition-transform duration-200 text-gray-500 dark:text-gray-400",
                  isExpanded ? "rotate-180" : ""
                )} />
              </button>

              {/* Dropdown */}
              {isExpanded && (
                <div className="absolute z-50 mt-2 w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 dark:border-gray-700/70 max-h-80 overflow-hidden">
                  {/* Search */}
                  <div className="p-3 border-b border-gray-200 dark:border-gray-700/70 bg-gray-50/50 dark:bg-gray-700/50">
                    <div className="relative">
                      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <input
                        type="text"
                        placeholder={`Search ${config.label.toLowerCase()}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerms(prev => ({ ...prev, [config.key]: e.target.value }))}
                                                className="w-full pl-10 pr-4 py-2 bg-white/80 dark:bg-gray-700/80 border border-gray-200 dark:border-gray-600/70 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Options */}
                  <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    <button
                      onClick={() => {
                        handleFilterChange(config.key as keyof FilterState, null);
                        setExpandedFilter(null);
                      }}
                      className={cn(
                        "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50/80 dark:hover:bg-gray-700/60 transition-colors text-gray-900 dark:text-gray-100 backdrop-blur-sm",
                        !isActive ? "bg-indigo-50/80 dark:bg-indigo-900/30" : ""
                      )}
                    >
                      <div className={cn(
                        "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
                        !isActive 
                          ? "border-indigo-500 dark:border-indigo-400 bg-indigo-500 dark:bg-indigo-400 shadow-sm" 
                          : "border-gray-300 dark:border-gray-600 bg-transparent"
                      )}>
                        {!isActive && <CheckIcon className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm font-medium">All {config.label}s</span>
                    </button>
                    
                    {options.map((option) => {
                      const isSelected = activeFilters[config.key as keyof FilterState] === option;
                      return (
                        <button
                          key={option}
                          onClick={() => {
                            handleFilterChange(config.key as keyof FilterState, option);
                            setExpandedFilter(null);
                          }}
                          className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50/80 dark:hover:bg-gray-700/60 transition-colors text-gray-900 dark:text-gray-100 backdrop-blur-sm",
                            isSelected ? "bg-indigo-50/80 dark:bg-indigo-900/30" : ""
                          )}
                        >
                          <div className={cn(
                            "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
                            isSelected 
                              ? "border-indigo-500 dark:border-indigo-400 bg-indigo-500 dark:bg-indigo-400 shadow-sm" 
                              : "border-gray-300 dark:border-gray-600 bg-transparent"
                          )}>
                            {isSelected && <CheckIcon className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-sm text-gray-800 dark:text-gray-200">{option}</span>
                        </button>
                      );
                    })}
                    
                    {options.length === 0 && searchTerm && (
                      <div className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400 text-center">
                        <div className="flex flex-col items-center space-y-2">
                          <MagnifyingGlassIcon className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                          <div>
                            <p className="font-medium">No options found</p>
                            <p className="text-xs">for "{searchTerm}"</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700/70">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 dark:text-gray-300">
              Total Data Points: <span className="font-medium text-gray-700 dark:text-gray-200">
                {filterOptions.endYear.length + filterOptions.topics.length + filterOptions.sectors.length}
              </span>
            </span>
            <span className="text-gray-400 dark:text-gray-600">•</span>
            <span className="text-gray-600 dark:text-gray-300">
              Categories: <span className="font-medium text-gray-700 dark:text-gray-200">{filterConfig.length}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <AdjustmentsHorizontalIcon className="w-4 h-4" />
            <span className="text-sm">Advanced Filtering</span>
          </div>
        </div>
      </div>

      {/* Custom styles for scrollbar */}
      <style jsx global>{`
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
          background-color: rgb(209 213 219);
          border-radius: 0.375rem;
        }
        .dark .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
          background-color: rgb(75 85 99);
        }
        .scrollbar-track-transparent::-webkit-scrollbar-track {
          background-color: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .filter-dropdown::-webkit-scrollbar {
          width: 6px;
        }
        .filter-dropdown::-webkit-scrollbar-track {
          background: transparent;
        }
        .filter-dropdown::-webkit-scrollbar-thumb {
          background: rgb(209 213 219);
          border-radius: 3px;
        }
        .dark .filter-dropdown::-webkit-scrollbar-thumb {
          background: rgb(75 85 99);
        }
      `}</style>
    </div>
  );
}