import { Link } from 'react-router-dom';
import { DollarSign, Activity, TrendingUp, HandCoins, Heart, ShieldCheck, Utensils, Home as HomeIcon, ShieldAlert } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t } = useTranslation();

  const financeTools = [
    {
      name: t('home.tools.mortgage.name'),
      description: t('home.tools.mortgage.desc'),
      icon: DollarSign,
      path: '/finance/mortgage',
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      name: t('home.tools.investment.name'),
      description: t('home.tools.investment.desc'),
      icon: TrendingUp,
      path: '/finance/investment',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      name: t('home.tools.auto_loan.name'),
      description: t('home.tools.auto_loan.desc'),
      icon: HandCoins,
      path: '/finance/loan',
      color: 'text-teal-500',
      bg: 'bg-teal-50 dark:bg-teal-900/20',
    },
    {
      name: t('home.tools.retirement.name'),
      description: t('home.tools.retirement.desc'),
      icon: TrendingUp, 
      path: '/finance/retirement',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
      name: t('home.tools.debt_payoff.name'),
      description: t('home.tools.debt_payoff.desc'),
      icon: ShieldCheck,
      path: '/finance/debt-payoff',
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-900/20',
    },
    {
      name: t('home.tools.millionaire.name'),
      description: t('home.tools.millionaire.desc'),
      icon: TrendingUp,
      path: '/finance/time-to-millionaire',
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      name: t('home.tools.rent_vs_buy.name'),
      description: t('home.tools.rent_vs_buy.desc'),
      icon: HomeIcon,
      path: '/finance/rent-vs-buy',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
      name: t('home.tools.emergency.name'),
      description: t('home.tools.emergency.desc'),
      icon: ShieldAlert,
      path: '/finance/emergency',
      color: 'text-amber-500',
      bg: 'bg-amber-50 dark:bg-amber-900/20',
    },
  ];

  const healthTools = [
    {
      name: t('home.tools.bmi.name'),
      description: t('home.tools.bmi.desc'),
      icon: Activity,
      path: '/health/bmi',
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      name: t('home.tools.calorie.name'),
      description: t('home.tools.calorie.desc'),
      icon: Heart,
      path: '/health/calories',
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-900/20',
    },
    {
      name: t('home.tools.macro_split.name'),
      description: t('home.tools.macro_split.desc'),
      icon: Utensils,
      path: '/health/macro-split',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('home.meta.title')}</title>
        <meta name="description" content={t('home.meta.desc')} />
      </Helmet>

      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Smart<span className="text-primary-600">Calc</span> Suite
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('home.hero_subtitle')}
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            {t('home.finance_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {financeTools.map((tool) => (
              <Link 
                key={tool.name} 
                to={tool.path}
                className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`absolute top-6 right-6 p-3 rounded-xl ${tool.bg} ${tool.color}`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 pr-12">
                  {tool.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-500" />
            {t('home.health_title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthTools.map((tool) => (
              <Link 
                key={tool.name} 
                to={tool.path}
                className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`absolute top-6 right-6 p-3 rounded-xl ${tool.bg} ${tool.color}`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 pr-12">
                  {tool.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
