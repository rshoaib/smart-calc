import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Calculator, Menu, Moon, Sun, X, TrendingUp, Heart, BookOpen } from 'lucide-react';
import { AdSlot } from './AdSlot';

import { useTranslation } from 'react-i18next';

export function Layout() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
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
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary-600 dark:text-primary-400">
            <Calculator className="w-6 h-6" />
            <span>SmartCalc</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/finance" className="flex items-center gap-2 hover:text-green-500 transition-colors">
              <TrendingUp className="w-4 h-4" />
              <span>{t('nav.finance')}</span>
            </Link>
            <Link to="/health" className="flex items-center gap-2 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
              <span>{t('nav.health')}</span>
            </Link>
            <Link to="/blog" className="flex items-center gap-2 hover:text-indigo-500 transition-colors">
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
            <Link to="/finance" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              {t('nav.finance')}
            </Link>
            <Link to="/health" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              {t('nav.health')}
            </Link>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
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
              <Outlet />
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
                  <li><Link to="/finance/mortgage" className="hover:text-primary-500">Mortgage Calculator</Link></li>
                  <li><Link to="/finance/investment" className="hover:text-primary-500">Investment Return</Link></li>
                  <li><Link to="/finance/loan" className="hover:text-primary-500">Auto Loan Calculator</Link></li>
                </ul>
             </div>

             <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  {t('home.health_title')}
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><Link to="/health/bmi" className="hover:text-primary-500">BMI Calculator</Link></li>
                  <li><Link to="/health/calories" className="hover:text-primary-500">Calorie Calculator</Link></li>
                </ul>
             </div>

             <AdSlot className="h-[250px] w-full" label="Rectangle Ad" />
           </div>
        </aside>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 mt-auto">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-gray-500">
          <p className="mb-2">© {new Date().getFullYear()} SmartCalc. All rights reserved.</p>
          <Link to="/privacy" className="hover:text-primary-500 transition-colors">{t('nav.privacy')}</Link>
        </div>
      </footer>
    </div>
  );
}
