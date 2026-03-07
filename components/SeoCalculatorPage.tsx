'use client';

import Link from 'next/link';
import { AdSlot } from '@/components/AdSlot';
import { Calculator, Percent, DollarSign, Clock, Briefcase, Home as HomeIcon, Activity, ArrowLeftRight } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────
type PageType = 'percentage' | 'tip' | 'discount' | 'age' | 'salary' | 'mortgage' | 'bmi' | 'convert';

interface SeoCalculatorPageProps {
  type: PageType;
  title: string;
  description: string;
  answer: string;
  formula: string;
  steps: string[];
  relatedLinks: { label: string; to: string }[];
  parentCalc: { label: string; to: string };
  faqs: { question: string; answer: string }[];
}

// ─── Component ───────────────────────────────────────────────────────
export default function SeoCalculatorPage({
  type,
  title,
  description,
  answer,
  formula,
  steps,
  relatedLinks,
  parentCalc,
  faqs,
}: SeoCalculatorPageProps) {
  const iconMap: Record<PageType, typeof Calculator> = {
    percentage: Percent,
    tip: DollarSign,
    discount: DollarSign,
    age: Clock,
    salary: Briefcase,
    mortgage: HomeIcon,
    bmi: Activity,
    convert: ArrowLeftRight,
  };
  const Icon = iconMap[type];

  const colorMap: Record<PageType, string> = {
    percentage: 'bg-cyan-600 dark:bg-cyan-700',
    tip: 'bg-emerald-600 dark:bg-emerald-700',
    discount: 'bg-violet-600 dark:bg-violet-700',
    age: 'bg-amber-600 dark:bg-amber-700',
    salary: 'bg-blue-600 dark:bg-blue-700',
    mortgage: 'bg-indigo-600 dark:bg-indigo-700',
    bmi: 'bg-rose-600 dark:bg-rose-700',
    convert: 'bg-teal-600 dark:bg-teal-700',
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <Link href={parentCalc.to}
          className="inline-block text-sm text-cyan-600 dark:text-cyan-400 hover:underline mb-4"
        >
          ← {parentCalc.label}
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Icon className="w-8 h-8 text-cyan-500" />
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Answer Card */}
          <div className={`${colorMap[type]} rounded-2xl shadow-lg p-8 text-center text-white`}>
            <div className="text-sm uppercase tracking-widest font-semibold opacity-80 mb-2">
              Answer
            </div>
            <div className="text-5xl md:text-6xl font-bold font-mono tabular-nums">
              {answer}
            </div>
          </div>

          {/* Formula & Steps */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              📐 Formula
            </h2>
            <code className="block bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-cyan-700 dark:text-cyan-300 text-sm font-mono">
              {formula}
            </code>

            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mt-6">
              🧮 Step-by-Step
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
              {steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>

          <AdSlot className="h-24 w-full" label="Native Ad" />

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                ❓ Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <details key={i} className="group">
                    <summary className="cursor-pointer font-medium text-gray-800 dark:text-gray-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                      {faq.question}
                    </summary>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-cyan-200 dark:border-cyan-800">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            {/* Related Calculations */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                🔗 Related Calculations
              </h3>
              <ul className="space-y-2 text-sm">
                {relatedLinks.map((link, i) => (
                  <li key={i}>
                    <Link href={link.to}
                      className="text-blue-700 dark:text-blue-300 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA: Full Calculator */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center">
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                🧮 Need a Custom Calculation?
              </h3>
              <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-3">
                Use our full interactive calculator for any values.
              </p>
              <Link href={parentCalc.to}
                className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors"
              >
                Open {parentCalc.label} →
              </Link>
            </div>

            <AdSlot className="h-[600px] w-full" label="Sidebar Skyscraper" />
          </div>
        </div>
      </div>
    </div>
  );
}
