"use client";

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  UserIcon,
  PaintBrushIcon,
  BellIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

type ActiveSection = 'profile' | 'appearance' | 'notifications' | 'security' | 'account';

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState<ActiveSection>('profile');

  const [displayName, setDisplayName] = useState(user?.email?.split('@')[0] || 'User');
  const [email, setEmail] = useState(user?.email || '');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
              <input
                type="text"
                name="displayName"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                readOnly
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
              Save Profile
            </button>
          </div>
        );
      case 'appearance':
        return (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">Customize the look and feel of the application.</p>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Theme</span>
              <button
                onClick={toggleTheme}
                className="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800
                           bg-indigo-600 hover:bg-indigo-700 text-white
                           dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">Manage your notification preferences.</p>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Enable Email Notifications</span>
              <label htmlFor="notificationsToggle" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    id="notificationsToggle" 
                    className="sr-only" 
                    checked={notificationsEnabled}
                    onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                  />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${notificationsEnabled ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${notificationsEnabled ? 'translate-x-full' : ''}`}></div>
                </div>
              </label>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300">Enhance your account security.</p>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Two-Factor Authentication (2FA)</span>
              <label htmlFor="twoFactorToggle" className="flex items-center cursor-pointer">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    id="twoFactorToggle" 
                    className="sr-only" 
                    checked={twoFactorEnabled}
                    onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${twoFactorEnabled ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${twoFactorEnabled ? 'translate-x-full' : ''}`}></div>
                </div>
              </label>
            </div>
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
              Change Password
            </button>
          </div>
        );
      case 'account':
        return (
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300">Manage your account actions.</p>
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <UserIcon className="w-5 h-5" /> },
    { id: 'appearance', label: 'Appearance', icon: <PaintBrushIcon className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon className="w-5 h-5" /> },
    { id: 'security', label: 'Security & Password', icon: <ShieldCheckIcon className="w-5 h-5" /> },
    { id: 'account', label: 'Account Actions', icon: <ArrowRightOnRectangleIcon className="w-5 h-5" /> },
  ];

  return (
    <>
      <Sidebar currentPage="settings" />
      <main className="flex-1 p-6 overflow-auto bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <Header title="Settings" subtitle="Manage your application settings and preferences." />
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
            <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as ActiveSection)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                      ${activeSection === item.id 
                        ? 'bg-indigo-100 dark:bg-indigo-800/50 text-indigo-700 dark:text-indigo-300' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100'
                      }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </aside>
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white capitalize">
                    {activeSection.replace('-', ' ')} Settings
                  </h3>
                  <div className="mt-6">
                    {renderSection()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
