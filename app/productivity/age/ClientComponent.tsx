'use client';

import { useState, useMemo } from 'react';
import { Calendar } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';

/* ─── helpers ─────────────────────────────────────────── */

function getZodiac(month: number, day: number) {
  const signs = [
    { name: 'Capricorn', symbol: '♑', start: [1, 1], end: [1, 19] },
    { name: 'Aquarius', symbol: '♒', start: [1, 20], end: [2, 18] },
    { name: 'Pisces', symbol: '♓', start: [2, 19], end: [3, 20] },
    { name: 'Aries', symbol: '♈', start: [3, 21], end: [4, 19] },
    { name: 'Taurus', symbol: '♉', start: [4, 20], end: [5, 20] },
    { name: 'Gemini', symbol: '♊', start: [5, 21], end: [6, 20] },
    { name: 'Cancer', symbol: '♋', start: [6, 21], end: [7, 22] },
    { name: 'Leo', symbol: '♌', start: [7, 23], end: [8, 22] },
    { name: 'Virgo', symbol: '♍', start: [8, 23], end: [9, 22] },
    { name: 'Libra', symbol: '♎', start: [9, 23], end: [10, 22] },
    { name: 'Scorpio', symbol: '♏', start: [10, 23], end: [11, 21] },
    { name: 'Sagittarius', symbol: '♐', start: [11, 22], end: [12, 21] },
    { name: 'Capricorn', symbol: '♑', start: [12, 22], end: [12, 31] },
  ];
  return signs.find(
    (s) =>
      (month > s.start[0] || (month === s.start[0] && day >= s.start[1])) &&
      (month < s.end[0] || (month === s.end[0] && day <= s.end[1])),
  ) ?? signs[0];
}

function getGeneration(year: number) {
  if (year >= 2013) return 'Gen Alpha';
  if (year >= 1997) return 'Gen Z';
  if (year >= 1981) return 'Millennial';
  if (year >= 1965) return 'Gen X';
  if (year >= 1946) return 'Baby Boomer';
  return 'Silent Generation';
}

function isLeapYear(y: number) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/* ─── component ───────────────────────────────────────── */

export default function AgeCalculator() {
  const thirtyYearsAgo = useMemo(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 30);
    return d.toISOString().split('T')[0];
  }, []);

  const [birthDate, setBirthDate] = useState(thirtyYearsAgo);
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const result = useMemo(() => {
    const bd = new Date(birthDate + 'T00:00:00');
    if (isNaN(bd.getTime()) || bd > today) return null;

    // Years, months, days breakdown
    let years = today.getFullYear() - bd.getFullYear();
    let months = today.getMonth() - bd.getMonth();
    let days = today.getDate() - bd.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total days
    const diffMs = today.getTime() - bd.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    // Next birthday
    let nextBirthday = new Date(today.getFullYear(), bd.getMonth(), bd.getDate());
    if (nextBirthday <= today) {
      nextBirthday = new Date(today.getFullYear() + 1, bd.getMonth(), bd.getDate());
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const isBirthdayToday = daysUntilBirthday === 0 || (today.getMonth() === bd.getMonth() && today.getDate() === bd.getDate());

    // Extras
    const zodiac = getZodiac(bd.getMonth() + 1, bd.getDate());
    const dayOfWeek = DAYS_OF_WEEK[bd.getDay()];
    const leapYearBirth = isLeapYear(bd.getFullYear());
    const generation = getGeneration(bd.getFullYear());
    const nextAge = years + 1;

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      daysUntilBirthday,
      isBirthdayToday,
      nextAge,
      zodiac,
      dayOfWeek,
      leapYearBirth,
      generation,
    };
  }, [birthDate]);

  const faqs = [
    {
      question: 'How do I calculate my exact age?',
      answer:
        'Enter your date of birth into the calculator above. It will compute your exact age in years, months, and days by comparing your birthdate to today\'s date, accounting for varying month lengths and leap years.',
    },
    {
      question: 'How many days old am I?',
      answer:
        'The calculator displays your total age in days alongside years, months, weeks, and hours. Simply enter your birthdate and the "Total Days" card shows the exact count.',
    },
    {
      question: 'What is my zodiac sign based on my birthday?',
      answer:
        'Your Western zodiac sign is determined by your birth month and day. The calculator automatically identifies your sign from the 12 zodiac constellations based on the date ranges used in Western astrology.',
    },
    {
      question: 'How many days until my next birthday?',
      answer:
        'After entering your birthdate, the calculator shows the exact number of days remaining until your next birthday. It calculates this by finding the next occurrence of your birth month and day.',
    },
    {
      question: 'Does this age calculator account for leap years?',
      answer:
        'Yes. The calculator uses full calendar arithmetic that correctly handles leap years (years divisible by 4, except centuries not divisible by 400). It also notes whether you were born in a leap year.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="general" />

      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Calendar className="w-8 h-8 text-teal-500" />
          Age Calculator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find your exact age in years, months, days — plus your zodiac sign and more.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Input Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              max={todayStr}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full max-w-xs px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none text-lg"
            />
          </div>

          {/* Main Result */}
          {result && (
            <>
              <div className="bg-teal-600 dark:bg-teal-700 rounded-2xl shadow-lg p-8 text-center text-white relative overflow-hidden">
                {result.isBirthdayToday && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-[120px] opacity-10 select-none">
                    🎂
                  </div>
                )}
                <div className="text-sm uppercase tracking-widest font-semibold opacity-80 mb-2">
                  Your Age
                </div>
                <div className="text-5xl md:text-6xl font-bold font-mono tabular-nums">
                  {result.years} <span className="text-2xl font-normal opacity-80">years</span>
                </div>
                <div className="mt-3 text-lg opacity-90">
                  {result.months} month{result.months !== 1 ? 's' : ''} and{' '}
                  {result.days} day{result.days !== 1 ? 's' : ''}
                </div>
                {result.isBirthdayToday && (
                  <div className="mt-4 inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold">
                    🎉 Happy Birthday!
                  </div>
                )}
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: 'Total Months', value: result.totalMonths.toLocaleString() },
                  { label: 'Total Weeks', value: result.totalWeeks.toLocaleString() },
                  { label: 'Total Days', value: result.totalDays.toLocaleString() },
                  { label: 'Total Hours', value: result.totalHours.toLocaleString() },
                  {
                    label: 'Next Birthday',
                    value: result.isBirthdayToday ? '🎂 Today!' : `${result.daysUntilBirthday} days`,
                    sub: result.isBirthdayToday ? undefined : `Turning ${result.nextAge}`,
                  },
                  { label: 'Born On', value: result.dayOfWeek },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center"
                  >
                    <div className="text-2xl font-bold text-gray-900 dark:text-white font-mono tabular-nums">
                      {item.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.label}</div>
                    {'sub' in item && item.sub && (
                      <div className="text-xs text-teal-500 mt-0.5">{item.sub}</div>
                    )}
                  </div>
                ))}
              </div>

              {/* Zodiac & Generation Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-100 dark:border-indigo-800 text-center">
                  <div className="text-3xl mb-1">{result.zodiac.symbol}</div>
                  <div className="font-semibold text-indigo-900 dark:text-indigo-100">
                    {result.zodiac.name}
                  </div>
                  <div className="text-xs text-indigo-600 dark:text-indigo-300">Zodiac Sign</div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-100 dark:border-amber-800 text-center">
                  <div className="text-3xl mb-1">👥</div>
                  <div className="font-semibold text-amber-900 dark:text-amber-100">
                    {result.generation}
                  </div>
                  <div className="text-xs text-amber-600 dark:text-amber-300">Generation</div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 border border-emerald-100 dark:border-emerald-800 text-center">
                  <div className="text-3xl mb-1">{result.leapYearBirth ? '🌟' : '📅'}</div>
                  <div className="font-semibold text-emerald-900 dark:text-emerald-100">
                    {result.leapYearBirth ? 'Yes' : 'No'}
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-300">
                    Born in Leap Year
                  </div>
                </div>
              </div>
            </>
          )}

          <AdSlot className="h-24 w-full" label="Native Ad" />

          {/* SEO Content */}
          <div className="prose dark:prose-invert max-w-none">
            <h2>How the Age Calculator Works</h2>
            <p>
              This calculator determines your <strong>exact age</strong> by comparing your date of
              birth against today's date. It accounts for varying month lengths (28–31 days) and leap
              years to give precise results down to the day.
            </p>

            <h3>Common Uses</h3>
            <ul>
              <li>
                <strong>Official documents:</strong> Many forms require your exact age in years,
                months, and days
              </li>
              <li>
                <strong>Milestone tracking:</strong> Find out when you turn 10,000 days old or 1
                billion seconds
              </li>
              <li>
                <strong>Birthday countdown:</strong> See exactly how many days until your next
                birthday
              </li>
              <li>
                <strong>Age verification:</strong> Confirm you meet age requirements for
                applications, licenses, or retirement
              </li>
              <li>
                <strong>Fun facts:</strong> Discover your zodiac sign, birth day-of-week, and
                generational cohort
              </li>
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
            <div className="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-2xl border border-teal-100 dark:border-teal-800">
              <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">
                🎂 Fun Age Facts
              </h3>
              <ul className="space-y-2 text-sm text-teal-800 dark:text-teal-200">
                <li>Your 10,000th day is around age 27</li>
                <li>1 billion seconds ≈ 31.7 years</li>
                <li>Average human heartbeats: ~2.5 billion</li>
                <li>You blink ~15,000 times per day</li>
                <li>The average person sleeps ~26 years</li>
              </ul>
            </div>

            <div className="bg-violet-50 dark:bg-violet-900/20 p-5 rounded-2xl border border-violet-100 dark:border-violet-800">
              <h3 className="font-semibold text-violet-900 dark:text-violet-100 mb-2">
                📊 Related Tools
              </h3>
              <ul className="space-y-2 text-sm text-violet-800 dark:text-violet-200">
                <li>
                  <a href="/productivity/date-difference" className="underline hover:no-underline">
                    Date Difference Calculator
                  </a>
                </li>
                <li>
                  <a href="/health/bmi" className="underline hover:no-underline">
                    BMI Calculator
                  </a>
                </li>
                <li>
                  <a href="/health/calories" className="underline hover:no-underline">
                    Calorie Calculator
                  </a>
                </li>
                <li>
                  <a href="/finance/retirement" className="underline hover:no-underline">
                    Retirement Calculator
                  </a>
                </li>
              </ul>
            </div>

            <AdSlot className="h-[600px] w-full" label="Sidebar Skyscraper" />
          </div>
        </div>
      </div>
    </div>
  );
}
