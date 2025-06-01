import { Suspense } from 'react';
import AuthCallbackClient from './AuthCallbackClient';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <AuthCallbackClient />
    </Suspense>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <LoadingSpinner />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Loading Authentication Callback
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait...
        </p>
      </div>
    </div>
  );
}
