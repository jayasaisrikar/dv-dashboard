"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import LoadingSpinner from '@/components/LoadingSpinner';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          setStatus('error');
          setMessage(error.message);
          return;
        }

        if (data.session) {
          setStatus('success');
          setMessage('Successfully authenticated! Redirecting to dashboard...');
          
          // Redirect to dashboard after a short delay
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          setStatus('error');
          setMessage('No session found. Please try signing in again.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('An unexpected error occurred during authentication.');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <LoadingSpinner />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
              Verifying Authentication
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we confirm your authentication...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="h-16 w-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Authentication Successful!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {message}
            </p>
            <div className="animate-pulse">
              <div className="h-2 bg-green-200 dark:bg-green-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="h-16 w-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircleIcon className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {message}
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
            >
              Return to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}
