"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import {
  ChartBarIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  GlobeAltIcon,
  SparklesIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const { signIn, signUp, continueAsGuest, user, isGuest, isLoading: authLoading } = useAuth();
  const router = useRouter();

  // Animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && user) { // Changed condition to only redirect if user is not null (i.e. logged in, not guest)
      router.push('/');
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      let result;
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password);
      }

      if (result.error) {
        setError(result.error);
      } else {
        if (isLogin) {
          router.push('/');
        } else {
          setSuccess('Account created successfully! Please check your email to verify your account.');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestAccess = () => {
    continueAsGuest();
    router.push('/');
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);
  const strengthColors = ['bg-gray-200', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];

  if (authLoading) {
    return (
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 dark:border-blue-800"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -top-40 left-20 w-80 h-80 bg-indigo-300 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content container - Full viewport with proper centering and scrolling */}
      <div className="relative z-10 w-full h-full overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4 py-8">
          <div className={`w-full max-w-md space-y-6 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            {/* Header */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 shadow-lg transform hover:scale-105 transition-transform duration-200">
                  <ChartBarIcon className="h-10 w-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Data Visualization Dashboard
              </h1>
              <p className="mt-3 text-base md:text-lg text-gray-600 dark:text-gray-400">
                {isLogin ? 'Welcome back! Sign in to continue' : 'Join us and start visualizing'}
              </p>
            </div>

            {/* Auth Form */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg py-8 px-6 shadow-2xl rounded-2xl border border-white/20 dark:border-gray-700/50">
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Email address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/70 dark:hover:bg-gray-700/70"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={isLogin ? 'current-password' : 'new-password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-11 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/70 dark:hover:bg-gray-700/70"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {!isLogin && password && (
                    <div className="mt-2">
                      <div className="flex space-x-1 mb-1">
                        {[1, 2, 3, 4].map((level) => (
                          <div
                            key={level}
                            className={`h-2 flex-1 rounded-full transition-colors duration-300 ${
                              level <= passwordStrength ? strengthColors[passwordStrength] : 'bg-gray-200 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Password strength: <span className="font-medium">{strengthLabels[passwordStrength]}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password Field (Sign Up only) */}
                {!isLogin && (
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Confirm Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockClosedIcon className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full pl-11 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-white/70 dark:hover:bg-gray-700/70"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                        )}
                      </button>
                    </div>
                    {confirmPassword && (
                      <div className="flex items-center mt-1">
                        {password === confirmPassword ? (
                          <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <p className={`text-xs ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                          {password === confirmPassword ? 'Passwords match' : 'Passwords do not match'}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-shake">
                    <div className="flex items-center">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" />
                      <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-xl p-4 animate-pulse">
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                      <p className="text-sm text-green-600 dark:text-green-400 font-medium">{success}</p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <UserIcon className="h-5 w-5 text-blue-300 group-hover:text-white transition-colors" />
                        </span>
                                                {isLogin ? 'Sign in to Dashboard' : 'Create Account'}
                      </>
                    )}
                  </button>
                </div>

                {/* Toggle Mode */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-semibold hover:underline transition-colors"
                  >
                    {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400 font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              {/* Guest Access */}
              <div className="mt-6">
                <button
                  onClick={handleGuestAccess}
                  className="group relative w-full flex justify-center py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 text-sm font-medium rounded-xl text-gray-700 dark:text-gray-300 bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-[1.01]"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <GlobeAltIcon className="h-5 w-5 text-gray-500 group-hover:text-gray-600 transition-colors" />
                  </span>
                  Continue as Guest
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded-full">
                    Limited access
                  </span>
                </button>
              </div>
            </div>

            {/* Features Preview */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 dark:border-gray-700/50 shadow-lg">
              <div className="text-center mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  What you'll get access to
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Unlock powerful data visualization tools
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors group">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ChartBarIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Interactive Visualizations</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Dynamic charts and real-time data</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors group">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <SparklesIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Advanced Analytics</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">AI-powered insights and predictions</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors group">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UserGroupIcon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Team Collaboration</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Share and collaborate in real-time</p>
                  </div>
                </div>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <ShieldCheckIcon className="h-4 w-4 mr-1" />
                    <span>Secure & Private</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-4 w-4 mr-1" />
                    <span>99.9% Uptime</span>
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1" />
                    <span>10k+ Users</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 dark:text-gray-400 pb-4">
              <p>
                By signing up, you agree to our{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-2px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(2px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}