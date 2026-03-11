'use client';

import Link from 'next/link';
import {
  DollarSign, TrendingUp, HandCoins, ShieldCheck, HomeIcon,
  ShieldAlert, Flame, Briefcase, PieChart, PiggyBank, Target
} from 'lucide-react';

const financeTools = [
  { name: 'Mortgage Calculator', desc: 'Calculate monthly payments with PMI, taxes & insurance for 2026 rates.', icon: DollarSign, path: '/finance/mortgage', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
  { name: 'Investment Calculator', desc: 'Project compound growth with inflation & tax impact analysis.', icon: TrendingUp, path: '/finance/investment', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { name: 'Inflation Calculator', desc: 'Calculate the changing value of the US dollar.', icon: TrendingUp, path: '/finance/inflation', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { name: 'Auto Loan Calculator', desc: 'Amortization schedule with extra payment analysis.', icon: HandCoins, path: '/finance/loan', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20' },
  { name: 'Retirement Calculator', desc: 'Plan your retirement with Monte Carlo simulations.', icon: TrendingUp, path: '/finance/retirement', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { name: 'Debt Payoff Planner', desc: 'Avalanche vs Snowball payoff comparison.', icon: ShieldCheck, path: '/finance/debt-payoff', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
  { name: 'Tax Calculator', desc: 'Estimate your 2025/2026 Federal Income Taxes.', icon: DollarSign, path: '/finance/tax', color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { name: 'Time to Millionaire', desc: 'Calculate exactly when you\'ll hit 7 figures.', icon: TrendingUp, path: '/finance/time-to-millionaire', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { name: 'Rent vs Buy', desc: 'Comprehensive comparison with opportunity cost analysis.', icon: HomeIcon, path: '/finance/rent-vs-buy', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
  { name: 'FIRE Calculator', desc: 'Find your Financial Independence Retire Early number.', icon: Flame, path: '/finance/fire', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  { name: 'Freelance Rate', desc: 'Calculate your true hourly rate accounting for all costs.', icon: Briefcase, path: '/finance/freelance-rate', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { name: 'ROI / ROAS Calculator', desc: 'Measure Return on Investment and Ad Spend.', icon: PieChart, path: '/finance/roi', color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
  { name: 'Savings Goal', desc: 'Plan and track your savings milestones.', icon: PiggyBank, path: '/finance/savings-goal', color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20' },
  { name: 'Emergency Fund', desc: 'Calculate your ideal emergency fund size.', icon: ShieldAlert, path: '/finance/emergency', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20' },
];

export default function FinanceLanding() {

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
          <TrendingUp className="inline w-10 h-10 text-green-500 mr-2 -mt-1" />
          Finance Calculators
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Make smarter money decisions with our free, professional-grade financial tools. No sign-ups. No data collection. Just accurate math.
        </p>
      </div>

      {/* Featured Guide */}
      <Link href="/finance/freedom-guide"
        className="block mb-10 p-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-6 h-6 text-yellow-300" />
          <h2 className="text-xl font-bold">✨ The Ultimate Guide to Financial Independence</h2>
        </div>
        <p className="text-emerald-100 text-sm">
          A comprehensive, step-by-step roadmap to achieving financial freedom. Includes FIRE strategies, savings optimization, and investment frameworks.
        </p>
      </Link>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {financeTools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.path}
            className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
          >
            <div className={`absolute top-6 right-6 p-3 rounded-xl ${tool.bg} ${tool.color}`}>
              <tool.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 pr-14">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {tool.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* Blog CTA */}
      <div className="mt-10 text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="font-bold text-gray-900 dark:text-white mb-2">📚 Learn More</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Read our in-depth guides on FIRE, emergency funds, compound interest, and home buying.
        </p>
        <Link href="/blog" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
          Visit the Blog →
        </Link>
      </div>
    </div>
  );
}
