'use client';

import { Target, Users, Shield, TrendingUp } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Democratizing Financial Clarity
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          We believe complex financial decisions shouldn't require a PhD in mathematics.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            To provide professional-grade calculation tools completely free, empowering you to make smarter money moves.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Who We Are</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            A small team of finance geeks and developers who got tired of ad-cluttered, slow, and inaccurate online calculators.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Privacy First</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            We don't store your financial data. All calculations happen right here in your browser. Your numbers are yours alone.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-500" />
            Why We Started
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400">
            <p>
              In 2026, the internet is filled with tools that put profits before people. Calculator sites are often designed to sell your data as "leads" to banks and insurance companies.
            </p>
            <p>
              We took a different approach. <strong>SmartCalc is 100% free to use.</strong> We are supported by non-intrusive display ads, which allows us to keep the site free without ever selling your personal information.
            </p>
            <p>
              Whether you're planning for retirement, buying your first home, or just trying to optimize your gym routine, we want to be your trusted companion.
            </p>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-lg mb-4">What Sets Us Apart</h3>
          <ul className="space-y-3">
            {[
              "No Lead Generation Forms (We don't want your email)",
              "Instant Updates (No page reloads)",
              "Dark Mode Native",
              "Mobile-First Design",
              "Educational Context (We explain the math)"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
        <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2">Disclaimer</h3>
        <p className="text-sm text-amber-900/80 dark:text-amber-200/80">
          The calculators and tools on this website are provided for educational and informational purposes only. They are not intended as financial, legal, or medical advice. 
          While we strive for accuracy, individual results may vary. Please consult with a qualified professional before making significant financial or health decisions.
        </p>
      </div>
    </div>
  );
}
