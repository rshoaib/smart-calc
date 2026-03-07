'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="mb-8">
        <div className="text-8xl font-extrabold text-gray-200 dark:text-gray-700 mb-4 select-none">
          404
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It may have been moved or doesn't exist.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-colors"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
      </div>

      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
          <Search className="w-5 h-5 text-primary-500" />
          Popular Calculators
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
          <Link href="/finance/mortgage" className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-primary-600 dark:text-primary-400 font-medium">
            Mortgage
          </Link>
          <Link href="/finance/investment" className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-primary-600 dark:text-primary-400 font-medium">
            Investment
          </Link>
          <Link href="/finance/fire" className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-primary-600 dark:text-primary-400 font-medium">
            FIRE Calculator
          </Link>
          <Link href="/health/bmi" className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-primary-600 dark:text-primary-400 font-medium">
            BMI Calculator
          </Link>
          <Link href="/health/calories" className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-primary-600 dark:text-primary-400 font-medium">
            Calorie Calculator
          </Link>
          <Link href="/blog" className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors text-primary-600 dark:text-primary-400 font-medium">
            Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
