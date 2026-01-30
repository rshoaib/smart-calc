import { Link } from 'react-router-dom';
import { DollarSign, Activity, TrendingUp, HandCoins, Heart, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export function Home() {
  const financeTools = [
    {
      name: 'Mortgage Calculator',
      description: 'Calculate monthly payments, interest rates, and amortization.',
      icon: DollarSign,
      path: '/finance/mortgage',
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      name: 'Investment Return',
      description: 'Project your investment growth with compound interest.',
      icon: TrendingUp,
      path: '/finance/investment',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    {
      name: 'Auto Loan Calculator',
      description: 'Estimate monthly car payments and total loan costs.',
      icon: HandCoins,
      path: '/finance/loan',
      color: 'text-teal-500',
      bg: 'bg-teal-50 dark:bg-teal-900/20',
    },
    {
      name: 'Retirement Planner',
      description: 'Visualize your 401k growth and plan for financial freedom.',
      icon: TrendingUp, // Using existing icon import
      path: '/finance/retirement',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    },
    {
      name: 'Debt Payoff Planner',
      description: 'Snowball vs Avalanche. Create a structured plan to be debt-free.',
      icon: ShieldCheck, // Need to import this
      path: '/finance/debt-payoff',
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-900/20',
    },
  ];

  const healthTools = [
    {
      name: 'BMI Calculator',
      description: 'Check your Body Mass Index and understand weight health.',
      icon: Activity,
      path: '/health/bmi',
      color: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/20',
    },
    {
      name: 'Calorie Calculator',
      description: 'Calculate daily caloric needs (TDEE) for your goals.',
      icon: Heart,
      path: '/health/calories',
      color: 'text-rose-500',
      bg: 'bg-rose-50 dark:bg-rose-900/20',
    },
  ];

  return (
    <>
      <Helmet>
        <title>SmartCalc - Finance & Health Calculators</title>
        <meta name="description" content="Free online financial and health calculators. Mortgage, Loan, BMI, Calorie calculators and more. No login required." />
      </Helmet>

      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Smart<span className="text-primary-600">Calc</span> Suite
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Powerful financial projections and health insights. 
            Free, private, and instant.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-500" />
            Finance Tools
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
            Health Tools
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
