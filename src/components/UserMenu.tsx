"use client";

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthModal from './AuthModal';
import {
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  UserGroupIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

export default function UserMenu() {
  const { user, isGuest, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    setIsDropdownOpen(false);
  };

  if (!user && !isGuest) {
    return (
      <>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all shadow-lg hover:shadow-xl"
        >
          <UserIcon className="w-4 h-4" />
          <span className="font-medium">Sign In</span>
        </button>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="relative overflow-visible z-40">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-3 p-2 rounded-xl hover:bg-indigo-600/20 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
          {isGuest ? (
            <GlobeAltIcon className="h-4 w-4 text-white" />
          ) : (
            <UserIcon className="h-4 w-4 text-white" />
          )}
        </div>
        <div className="text-left hidden lg:block">
          <p className="text-sm font-medium text-white">
            {isGuest ? 'Guest User' : user?.email?.split('@')[0] || 'User'}
          </p>
          <p className="text-xs text-indigo-300">
            {isGuest ? 'Browse Mode' : 'Authenticated'}
          </p>
        </div>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsDropdownOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 bottom-full mb-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 py-2">
            {/* User info */}
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
                  {isGuest ? (
                    <GlobeAltIcon className="h-5 w-5 text-white" />
                  ) : (
                    <UserIcon className="h-5 w-5 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {isGuest ? 'Guest User' : user?.email?.split('@')[0] || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isGuest ? 'Browsing as guest' : user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="py-1">
              {isGuest ? (
                <>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push('/auth');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3"
                  >
                    <UserGroupIcon className="w-4 h-4" />
                    <span>Create Account</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push('/auth');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      router.push('/settings');
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3"
                  >
                    <Cog6ToothIcon className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-3"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </>
              )}
            </div>

            {/* Guest mode info */}
            {isGuest && (
              <div className="mx-4 my-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  You're browsing as a guest. Create an account to save preferences and access additional features.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
