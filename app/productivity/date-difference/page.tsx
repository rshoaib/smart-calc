'use client';

import { useState, useEffect } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';

export default function DateDifferenceCalculator() {
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [result, setResult] = useState<{
    totalDays: number;
    years: number;
    months: number;
    days: number;
    weeks: number;
    hours: number;
    minutes: number;
    weekdays: number;
    weekends: number;
  } | null>(null);

  useEffect(() => {
    calculate();
  }, [startDate, endDate]);

  const calculate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

    const diffMs = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    // Years, months, days breakdown
    let d1 = start < end ? new Date(start) : new Date(end);
    let d2 = start < end ? new Date(end) : new Date(start);
    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Count weekdays and weekends
    let weekdays = 0;
    let weekends = 0;
    const cursor = new Date(d1);
    while (cursor <= d2) {
      const dow = cursor.getDay();
      if (dow === 0 || dow === 6) weekends++;
      else weekdays++;
      cursor.setDate(cursor.getDate() + 1);
    }

    setResult({
      totalDays,
      years,
      months,
      days,
      weeks: Math.floor(totalDays / 7),
      hours: totalDays * 24,
      minutes: totalDays * 24 * 60,
      weekdays,
      weekends,
    });
  };

  const setPreset = (daysFromNow: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromNow);
    setEndDate(d.toISOString().split('T')[0]);
    setStartDate(today);
  };

  const faqs = [
    { question: 'How do you calculate the number of days between two dates?', answer: 'Subtract the earlier date from the later date and convert the result from milliseconds to days (divide by 86,400,000). This calculator accounts for leap years and varying month lengths automatically.' },
    { question: 'Does this count the start and end dates?', answer: 'This calculator counts the difference between the two dates. For example, January 1 to January 2 is 1 day. If you need to include both dates (e.g., for a rental period), add 1 to the result.' },
    { question: 'How many weekdays are between two dates?', answer: 'This calculator counts both weekdays (Mon-Fri business days) and weekend days (Sat-Sun) separately. This is useful for calculating business days, work schedules, and project timelines.' },
    { question: 'How do I calculate my age in days?', answer: 'Enter your birthdate as the start date and today\'s date as the end date. The result shows your exact age in days, weeks, months, and years — perfect for milestone celebrations!' },
    { question: 'How many days are in a year?', answer: 'A regular year has 365 days. A leap year (every 4 years, except centuries not divisible by 400) has 366 days. On average, a year is 365.2425 days long, which is why we have leap years to keep the calendar aligned with Earth\'s orbit.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="general" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Calendar className="w-8 h-8 text-violet-500" />
          Date Difference Calculator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find the exact time between any two dates — in days, weeks, months, or years.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Input Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-[160px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-lg"
                />
              </div>
              <ArrowRight className="w-6 h-6 text-gray-400 mt-6" />
              <div className="flex-1 min-w-[160px]">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-lg"
                />
              </div>
            </div>

            {/* Quick Presets */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-1 self-center">Quick:</span>
              {[
                { label: '30 days', days: 30 },
                { label: '90 days', days: 90 },
                { label: '6 months', days: 182 },
                { label: '1 year', days: 365 },
                { label: '100 days', days: 100 },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => setPreset(p.days)}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-800/40 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Result */}
          {result && (
            <>
              <div className="bg-violet-600 dark:bg-violet-700 rounded-2xl shadow-lg p-8 text-center text-white">
                <div className="text-sm uppercase tracking-widest font-semibold opacity-80 mb-2">
                  Total Difference
                </div>
                <div className="text-5xl md:text-6xl font-bold font-mono tabular-nums">
                  {result.totalDays.toLocaleString()} days
                </div>
                {result.years > 0 && (
                  <div className="mt-3 text-lg opacity-90">
                    {result.years} year{result.years !== 1 ? 's' : ''}, {result.months} month{result.months !== 1 ? 's' : ''}, {result.days} day{result.days !== 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: 'Weeks', value: result.weeks.toLocaleString() },
                  { label: 'Hours', value: result.hours.toLocaleString() },
                  { label: 'Minutes', value: result.minutes.toLocaleString() },
                  { label: 'Weekdays', value: result.weekdays.toLocaleString(), sub: 'business days' },
                  { label: 'Weekend Days', value: result.weekends.toLocaleString() },
                  { label: 'Months', value: `${result.years * 12 + result.months}` },
                ].map((item) => (
                  <div key={item.label} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white font-mono tabular-nums">{item.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</div>
                    {item.sub && <div className="text-xs text-violet-500 mt-0.5">{item.sub}</div>}
                  </div>
                ))}
              </div>
            </>
          )}

          <AdSlot className="h-24 w-full" label="Native Ad" />

          {/* SEO Content */}
          <div className="prose dark:prose-invert max-w-none">
            <h2>How to Calculate Days Between Dates</h2>
            <p>
              Computing the exact time between two dates requires accounting for varying month lengths (28-31 days),
              leap years, and the difference between calendar time and business time. This calculator handles all
              of these complexities for you.
            </p>
            <h3>Common Uses</h3>
            <ul>
              <li><strong>Project planning:</strong> Calculate business days for deadlines and milestones</li>
              <li><strong>Age calculation:</strong> Find your exact age in days for milestone birthdays</li>
              <li><strong>Travel planning:</strong> Count days for visa duration, hotel stays, or trip length</li>
              <li><strong>Legal deadlines:</strong> Calculate statute of limitations or filing deadlines</li>
              <li><strong>Pregnancy tracking:</strong> Count weeks and days from conception or last period</li>
            </ul>

            <h3>Frequently Asked Questions</h3>
            {faqs.map((faq, i) => (
              <div key={i}>
                <h4>{faq.question}</h4>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-violet-50 dark:bg-violet-900/20 p-5 rounded-2xl border border-violet-100 dark:border-violet-800">
              <h3 className="font-semibold text-violet-900 dark:text-violet-100 mb-2">
                📅 Key Date Facts
              </h3>
              <ul className="space-y-2 text-sm text-violet-800 dark:text-violet-200">
                <li>365 days in a regular year</li>
                <li>366 days in a leap year</li>
                <li>~260 weekdays per year</li>
                <li>~104 weekend days per year</li>
                <li>52 weeks + 1 day in a year</li>
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                ⏰ Days Until Events
              </h3>
              <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                <li>Enter today → Dec 31 for days left in year</li>
                <li>Enter birthday → today for your age in days</li>
                <li>Enter project start → deadline for business days</li>
              </ul>
            </div>

            <AdSlot className="h-[600px] w-full" label="Sidebar Skyscraper" />
          </div>
        </div>
      </div>
    </div>
  );
}
