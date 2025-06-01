'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import UserMenu from './UserMenu';
import {
  HomeIcon,
  ChartBarIcon,
  AdjustmentsHorizontalIcon,
  WrenchScrewdriverIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightCircleIcon,
  CalendarIcon,
  SparklesIcon,
  BoltIcon,
  ArrowTrendingUpIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  currentPage: string;
}

export default function Sidebar({ currentPage }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <HomeIcon className="w-5 h-5" />,
      path: '/',
      active: currentPage === 'dashboard',
      description: 'Overview & insights',
      badge: null
    },
    {
      title: 'Analytics',
      icon: <ChartBarIcon className="w-5 h-5" />,
      path: '/analytics',
      active: currentPage === 'analytics',
      description: 'Detailed analysis',
      badge: 'NEW'
    },
    {
      title: 'Filters',
      icon: <AdjustmentsHorizontalIcon className="w-5 h-5" />,
      path: '/filters',
      active: currentPage === 'filters',
      description: 'Data filtering',
      badge: null
    },
    {
      title: 'Setup',
      icon: <WrenchScrewdriverIcon className="w-5 h-5" />,
      path: '/setup',
      active: currentPage === 'setup',
      description: 'Configuration',
      badge: null
    }
  ];

  const quickActions = [
    {
      title: 'Export Data',
      icon: <ArrowRightCircleIcon className="w-4 h-4" />,
      action: () => console.log('Export data'),
      shortcut: '⌘E'
    },
    {
      title: 'Refresh',
      icon: <BoltIcon className="w-4 h-4" />,
      action: () => window.location.reload(),
      shortcut: '⌘R'
    }
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xl backdrop-blur-sm"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'h-screen w-80 flex-shrink-0 fixed lg:sticky top-0 left-0 z-40',
          'bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-900 text-white',
          'border-r border-indigo-800/30 shadow-2xl flex flex-col',
          'transition-transform duration-300',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-indigo-700/30 bg-gradient-to-r from-indigo-800/50 to-purple-800/50">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-white to-indigo-100 flex items-center justify-center shadow-lg">
              <SparklesIcon className="h-6 w-6 text-indigo-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                InsightDash
              </h1>
              <p className="text-xs text-indigo-300">Data Analytics</p>
            </div>
          </div>
          <button
            className="lg:hidden rounded-full p-1 hover:bg-indigo-700/50 transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <ArrowRightCircleIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Date and Time */}
        <div className="px-6 py-4 border-b border-indigo-700/30">
          {mounted && (
            <div className="bg-indigo-800/30 rounded-xl p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 text-indigo-200">
                  <CalendarIcon className="h-4 w-4" />
                  <span>
                    {new Date().toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="text-white font-mono">{currentTime}</div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 scrollbar-hide">
          <div className="px-4">
            <p className="text-xs font-medium text-indigo-300 uppercase tracking-wider px-4 mb-4 flex items-center">
              <ArrowTrendingUpIcon className="w-3 h-3 mr-2" />
              Navigation
            </p>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'group flex items-center px-4 py-3.5 rounded-xl transition-all relative overflow-hidden',
                      'hover:bg-gradient-to-r hover:from-indigo-600/40 hover:to-purple-600/40 hover:translate-x-1',
                      item.active
                        ? 'bg-gradient-to-r from-indigo-600/60 to-purple-600/60 text-white shadow-lg backdrop-blur-sm border border-indigo-500/30'
                        : 'text-indigo-100 hover:text-white'
                    )}
                  >
                    <span
                      className={cn(
                        'mr-3 p-2 rounded-lg transition-all duration-200',
                        item.active
                          ? 'bg-white/20 text-white shadow-md'
                          : 'bg-indigo-800/30 text-indigo-200 group-hover:bg-white/10 group-hover:text-white'
                      )}
                    >
                      {item.icon}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.title}</span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-emerald-500 text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-indigo-300 group-hover:text-indigo-200 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    {item.active && (
                      <div className="absolute right-2 h-8 w-1 rounded-full bg-gradient-to-b from-white to-indigo-200" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Quick Actions */}
            <div className="mt-8">
              <p className="text-xs font-medium text-indigo-300 uppercase tracking-wider px-4 mb-4 flex items-center">
                <BoltIcon className="w-3 h-3 mr-2" />
                Quick Actions
              </p>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <button
                    key={action.title}
                    onClick={action.action}
                    className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-indigo-200 hover:text-white hover:bg-indigo-700/40 transition-all duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="p-1 rounded-md bg-indigo-800/40 group-hover:bg-indigo-600/40 transition-colors">
                        {action.icon}
                      </span>
                      <span className="text-sm font-medium">{action.title}</span>
                    </div>
                    <span className="text-xs font-mono bg-indigo-800/30 px-2 py-1 rounded-md">
                      {action.shortcut}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-indigo-700/30">
          <div className="bg-gradient-to-r from-indigo-800/40 to-purple-800/40 rounded-xl p-4 backdrop-blur-sm border border-indigo-600/20">
            <UserMenu />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-indigo-600/20">
              <div className="flex items-center text-xs text-indigo-200">
                <div className="h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                <span>Data Live</span>
              </div>
              <button className="p-1.5 rounded-lg text-indigo-300 hover:text-white hover:bg-indigo-600/40 transition-colors">
                <CogIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
