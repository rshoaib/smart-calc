'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { TrendingUp, DollarSign, Target, ArrowRight, Shield, Flame } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';

export default function FinancialFreedomPage() {
  const { t } = useTranslation();

  const faqs = [
    {
        question: "What is the 4% Rule?",
        answer: "The 4% Rule is a retirement withdrawal guideline from the Trinity Study (1998). It states you can withdraw 4% of your portfolio in year one, adjusting for inflation thereafter, with a 95% chance your money lasts 30+ years. For a 60/40 stock/bond portfolio, this means you need 25x your annual expenses saved. Some modern planners suggest 3.5% for early retirees to account for longer retirement periods."
    },
    {
        question: "How do I calculate my FIRE number?",
        answer: "Multiply your annual expenses by 25 (for a 4% withdrawal rate). For example, if you spend $40,000 per year: $40,000 × 25 = $1,000,000 needed. For a more conservative 3.5% rate, multiply by ~28.5. Reducing annual spending by $5,000 lowers your FIRE number by $125,000 — making spending cuts doubly powerful for reaching financial independence."
    },
    {
        question: "Should I pay off debt or invest?",
        answer: "Follow this priority: (1) Get employer 401k match first — it's a guaranteed 50-100% return. (2) Pay off high-interest debt above 7-8% (credit cards, personal loans). (3) Build a $1,000 emergency fund. (4) Max out Roth IRA. (5) Pay off moderate debt (5-7%). (6) Invest aggressively. For debt below 4-5% (e.g., federal student loans), investing simultaneously often makes mathematical sense."
    },
    {
        question: "What is a good savings rate?",
        answer: "The standard recommendation is 10-15% of gross income. However, to reach early retirement (FIRE), you typically need 30-50%+ savings rate. At a 50% savings rate, you can retire in ~17 years. At 70%, in ~8.5 years. The savings rate is arguably the single most important variable in your financial independence timeline — more impactful than investment returns."
    },
    {
        question: "What are the best passive income streams?",
        answer: "Dividend stocks and index funds (3-4% yield), rental real estate (8-12% cash-on-cash return), REITs (4-6% dividends without property management hassle), bonds and Treasury bills (4-5% currently), and digital products (courses, ebooks, templates). The most reliable long-term strategy is a diversified investment portfolio in low-cost index funds — simple, hands-off, and historically one of the most effective wealth-building tools."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl overflow-hidden shadow-xl mb-12 text-white p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t('financial_hub.hero_title', 'Your Roadmap to Financial Freedom')}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                {t('financial_hub.hero_subtitle', 'Financial independence isn\'t just a dream—it\'s a mathematical certainty if you follow the right steps. Use our suite of tools to plan your journey.')}
            </p>
            <Link href="/finance/fire"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors"
            >
                {t('financial_hub.start_journey', 'Start Your Journey')}
                <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-12 hidden md:block"></div>
        <div className="absolute right-0 bottom-0 h-1/2 w-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        <Target className="absolute right-8 bottom-8 w-32 h-32 text-white/20 hidden md:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
            
            {/* Step 1: Foundation */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Shield className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-xl text-green-600 dark:text-green-400 font-bold text-xl">01</div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Build a Safety Net</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Before you can aggressively invest, you need a solid foundation. An emergency fund prevents you from dipping into investments when life happens.
                    </p>
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Why it matters</h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                             <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                Covers 3-6 months of expenses.
                             </li>
                             <li className="flex items-start gap-2">
                                <span className="text-green-500 mt-1">✓</span>
                                Provides peace of mind.
                             </li>
                        </ul>
                    </div>
                    <Link href="/finance/emergency" className="text-blue-600 dark:text-blue-400 font-bold hover:underline inline-flex items-center gap-1">
                        Calculate Emergency Fund <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

             {/* Ad */}
             <AdSlot className="w-full h-32" label="In-Article Ad" />

             {/* Step 2: Saving & Goals */}
             <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Target className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400 font-bold text-xl">02</div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Set Clear Targets</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Whether it's a down payment, a wedding, or freedom, you need to know your "Number". Use the glbaul calculators to reverse-engineer your monthly savings target.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <Link href="/finance/savings-goal" className="block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-900">
                            <Target className="w-6 h-6 text-blue-500 mb-2" />
                            <div className="font-semibold text-gray-900 dark:text-white">Savings Goal</div>
                            <div className="text-xs text-gray-500">Plan for big purchases</div>
                        </Link>
                        <Link href="/finance/investment" className="block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors bg-gray-50 dark:bg-gray-900">
                            <TrendingUp className="w-6 h-6 text-green-500 mb-2" />
                            <div className="font-semibold text-gray-900 dark:text-white">Compound Interest</div>
                            <div className="text-xs text-gray-500">See your money grow</div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Step 3: FIRE */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Flame className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl text-orange-600 dark:text-orange-400 font-bold text-xl">03</div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achieve F.I.R.E.</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Financial Independence, Retire Early (FIRE) is the ultimate goal. It's the point where your investments generate enough passive income to cover your expenses forever.
                    </p>
                    
                     <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-900 p-6 rounded-xl border border-orange-100 dark:border-gray-700 mb-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-white p-3 rounded-full shadow-sm text-2xl">🔥</div>
                            <div>
                                <h3 className="font-bold text-gray-900 dark:text-white">The FIRE Calculator</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Our most advanced tool. It considers inflation, safe withdrawal rates, and your current savings rate to predict exactly when you can quit your job.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Link href="/finance/fire" className="inline-block w-full text-center py-3 rounded-xl bg-orange-600 text-white font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-200 dark:shadow-none">
                        Calculate Your FIRE Number
                    </Link>
                </div>
            </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-24">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800 mb-8">
                    <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4">Quick Tools</h3>
                    <ul className="space-y-3">
                         <li>
                            <Link href="/finance/roi" className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                                <DollarSign className="w-5 h-5 text-emerald-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">ROI Calculator</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/finance/freelance-rate" className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                                <DollarSign className="w-5 h-5 text-blue-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Freelance Rate</span>
                            </Link>
                        </li>
                         <li>
                            <Link href="/finance/loan" className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                                <DollarSign className="w-5 h-5 text-indigo-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Loan Calculator</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <AdSlot className="h-[600px] w-full" label="Sidebar Skyscraper" />
            </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-16 bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                        {faq.answer}
                    </p>
                </div>
            ))}
        </div>
      </section>

      <Disclaimer type="finance" />
    </div>
  );
}
