'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Menu, Moon, Sun, X, TrendingUp, Heart, BookOpen, Zap } from 'lucide-react';
import { AdSlot } from './AdSlot';
import { CookieConsent } from './CookieConsent';
import { useTranslation } from 'react-i18next';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('smartcalc-theme');
    if (stored !== null) {
      setIsDark(stored === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    localStorage.setItem('smartcalc-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200">
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-600 dark:text-primary-400">
            <Calculator className="w-6 h-6" />
            <span>SmartCalc</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/finance" className="flex items-center gap-2 hover:text-green-500 transition-colors">
              <TrendingUp className="w-4 h-4" />
              <span>{t('nav.finance')}</span>
            </Link>
            <Link href="/health" className="flex items-center gap-2 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
              <span>{t('nav.health')}</span>
            </Link>
            <Link href="/productivity" className="flex items-center gap-2 hover:text-orange-500 transition-colors">
              <Zap className="w-4 h-4" />
              <span>{t('nav.productivity', 'Productivity')}</span>
            </Link>
            <Link href="/blog" className="flex items-center gap-2 hover:text-indigo-500 transition-colors">
              <BookOpen className="w-4 h-4" />
              <span>{t('nav.blog')}</span>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm font-medium border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              aria-label="Toggle Language"
            >
              {i18n.language === 'es' ? 'ES' : 'EN'}
            </button>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <nav className="flex flex-col p-4 gap-4">
            <Link href="/finance" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {t('nav.finance')}
            </Link>
            <Link href="/health" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              {t('nav.health')}
            </Link>
            <Link href="/productivity" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              {t('nav.productivity', 'Productivity')}
            </Link>
            <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {t('nav.blog')}
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar (Ads on Desktop) */}
        <aside className="hidden lg:flex w-64 flex-col gap-6 shrink-0">
          <div className="sticky top-24 space-y-6">
            <AdSlot className="h-[600px] w-full" label="Skyscraper Ad" />
          </div>
        </aside>

        {/* Center Content */}
        <main className="flex-1 min-w-0 flex flex-col gap-8">
           {/* Top Leaderboard Ad */}
           <AdSlot className="w-full h-24 md:h-32" label="Top Leaderboard" />
           
           <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 min-h-[400px] p-6">
              {children}
           </div>

           {/* Content Footer Ad */}
           <AdSlot className="w-full h-24" label="In-Content Ad" />
        </main>

        {/* Right Sidebar (Navigation/Ads) */}
        <aside className="hidden xl:flex w-80 flex-col gap-6 shrink-0">
           <div className="sticky top-24 space-y-6">
             <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  {t('home.finance_title')}
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><Link href="/finance/freedom-guide" className="hover:text-primary-500 font-medium text-emerald-600 dark:text-emerald-400">✨ Ultimate FIRE Guide</Link></li>
                  <li><Link href="/finance/inflation" className="hover:text-primary-500">Inflation Calculator</Link></li>
                  <li><Link href="/finance/mortgage" className="hover:text-primary-500">Mortgage Calculator</Link></li>
                  <li><Link href="/finance/investment" className="hover:text-primary-500">Investment Return</Link></li>
                  <li><Link href="/finance/loan" className="hover:text-primary-500">Auto Loan Calculator</Link></li>
                  <li><Link href="/finance/fire" className="hover:text-primary-500">FIRE Calculator</Link></li>
                  <li><Link href="/finance/freelance-rate" className="hover:text-primary-500">Freelance Rate</Link></li>
                  <li><Link href="/finance/roi" className="hover:text-primary-500">ROI / ROAS</Link></li>
                  <li><Link href="/finance/savings-goal" className="hover:text-primary-500">Savings Goal</Link></li>
                </ul>
             </div>

             <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  {t('home.health_title')}
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><Link href="/health/wellness-guide" className="hover:text-primary-500 font-medium text-teal-600 dark:text-teal-400">✨ Total Wellness Opt.</Link></li>
                  <li><Link href="/health/bmi" className="hover:text-primary-500">BMI Calculator</Link></li>
                  <li><Link href="/health/calories" className="hover:text-primary-500">Calorie Calculator</Link></li>
                  <li><Link href="/health/heart-rate" className="hover:text-primary-500">Heart Rate Zones</Link></li>
                  <li><Link href="/health/sleep" className="hover:text-primary-500">Sleep Cycle</Link></li>
                </ul>
             </div>

             <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-orange-500">⚡</span>
                  Productivity
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><Link href="/productivity/pomodoro" className="hover:text-primary-500">Pomodoro Timer</Link></li>
                  <li><Link href="/productivity/salary-hourly" className="hover:text-primary-500">Salary ↔ Hourly</Link></li>
                  <li><Link href="/productivity/meeting-cost" className="hover:text-primary-500">Meeting Cost</Link></li>
                  <li><Link href="/productivity/percentage" className="hover:text-primary-500">Percentage Calc</Link></li>
                  <li><Link href="/productivity/gpa" className="hover:text-primary-500">GPA Calculator</Link></li>
                  <li><Link href="/productivity/typing-speed" className="hover:text-primary-500">Typing Speed</Link></li>
                  <li><Link href="/productivity/tip-calculator" className="hover:text-primary-500">Tip Calculator</Link></li>
                  <li><Link href="/productivity/age" className="hover:text-primary-500">Age Calculator</Link></li>
                </ul>
             </div>

             <AdSlot className="h-[250px] w-full" label="Rectangle Ad" />
           </div>
        </aside>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-500">
          <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
            <div className="space-y-4 text-left">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Popular Calculators</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/finance/mortgage" className="hover:text-primary-500 transition-colors">Free Mortgage Calculator</Link></li>
                <li><Link href="/finance/roi" className="hover:text-primary-500 transition-colors">ROI Calculator</Link></li>
                <li><Link href="/health/bmi" className="hover:text-primary-500 transition-colors">BMI Calculator</Link></li>
                <li><Link href="/productivity/word-counter" className="hover:text-primary-500 transition-colors">Word Counter</Link></li>
                <li><Link href="/productivity/typing-speed" className="hover:text-primary-500 transition-colors">Typing Speed Test</Link></li>
              </ul>
            </div>
            <div className="space-y-4 text-left">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-primary-500 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary-500 transition-colors">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-primary-500 transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-primary-500 transition-colors">{t('nav.privacy')}</Link></li>
              </ul>
            </div>
          </div>
          <p className="mb-2">© {new Date().getFullYear()} SmartCalc. All rights reserved.</p>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center">
            <p className="text-xs text-gray-400 mb-3">Our Other Free Tools</p>
            <div className="flex flex-wrap justify-center gap-4 text-xs">
              <a href="https://mycalcfinance.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">Finance Calculators</a>
              <a href="https://onlineimageshrinker.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">Image Compressor</a>
              <a href="https://tinypdftools.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">PDF Tools</a>
              <a href="https://legalpolicygen.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">Legal Policy Generator</a>
              <a href="https://imrizwan.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">Developer Blog</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}
