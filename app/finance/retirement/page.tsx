'use client';

import { useState, useEffect } from 'react';
import { Disclaimer } from '@/components/Disclaimer';
import { TrendingUp, User, DollarSign, Calendar, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/store/userStore';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend
} from 'recharts';

interface GrowthData {
  age: number;
  savings: number;
  interest: number;
  contributions: number;
}

export default function RetirementCalculator() {
  const { t } = useTranslation();
  const profile = useUserStore();

  const [currentAge, setCurrentAge] = useState<number>(profile.age);
  const [retireAge, setRetireAge] = useState<number>(profile.retirementAge);
  const [currentSavings, setCurrentSavings] = useState<number>(profile.currentSavings);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(profile.monthlyContribution);
  const [returnRate, setReturnRate] = useState<number>(7);
  const [inflationRate, setInflationRate] = useState<number>(3);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalSavings, setTotalSavings] = useState<number>(0);
  const [chartData, setChartData] = useState<GrowthData[]>([]);

  useEffect(() => {
    const calculateRetirement = () => {
    if (retireAge <= currentAge) return;

    // 1. Calculate future value with inflation adjustment
    // Real Rate = (1 + Nominal) / (1 + Inflation) - 1
    const realRate = (1 + returnRate / 100) / (1 + inflationRate / 100) - 1;
    const years = retireAge - currentAge;
    const months = years * 12;
    const monthlyRealRate = realRate / 12;

    let balance = currentSavings;
    let totalContrib = currentSavings;
    let totalInt = 0; // Initialize totalInt
    const data: GrowthData[] = [];

    // Add initial point
    data.push({
      age: currentAge,
      savings: balance,
      interest: 0,
      contributions: currentSavings
    });

    for (let i = 1; i <= months; i++) {
      const interest = balance * monthlyRealRate;
      balance += interest + monthlyContribution;
      totalContrib += monthlyContribution;
      totalInt += interest; // Accumulate interest

      // Add data point every year
      if (i % 12 === 0) {
        data.push({
          age: currentAge + (i / 12),
          savings: Math.round(balance),
          interest: Math.round(balance - totalContrib), // This is the interest earned on the current balance
          contributions: Math.round(totalContrib)
        });
      }
    }

    setTotalSavings(balance);
    setTotalInterest(totalInt);
    setChartData(data);
  };
    calculateRetirement();
  }, [currentAge, retireAge, currentSavings, monthlyContribution, returnRate, inflationRate]);

  const faqs = [
    { question: 'How much do I need to retire?', answer: 'A common rule of thumb is to save 25 times your annual expenses (based on the 4% withdrawal rate). If you spend $40,000/year, you need $1,000,000. For a more conservative estimate (3.5% withdrawal), multiply by 28.5. Factor in Social Security, pensions, and any other income sources to reduce the amount you need from investments alone.' },
    { question: 'What is the 4% rule?', answer: 'The 4% rule (from the 1998 Trinity Study) states you can withdraw 4% of your portfolio in the first year of retirement, then adjust that amount for inflation each year, and your money has a 95% chance of lasting 30 years with a 60/40 stock/bond allocation. For early retirees (40+ year retirement), many planners recommend a 3.5% withdrawal rate for extra safety.' },
    { question: 'Should I factor in inflation?', answer: 'Absolutely. This calculator adjusts for inflation automatically using the real rate of return (nominal return minus inflation). A 7% return with 3% inflation gives roughly 4% real growth. Without inflation adjustment, you would overestimate your purchasing power by 40-60% over a 30-year period. All the numbers shown are in today\'s dollars for clarity.' },
    { question: 'What if I started saving late?', answer: 'It is never too late to start. At age 40, you still have 25+ years of compounding. Use catch-up contributions: after age 50, you can contribute an extra $7,500/year to your 401(k) and an extra $1,000/year to your IRA. Maximize employer match, reduce expenses, and consider working 2-3 extra years — each additional year of contributions (and one fewer year of withdrawals) significantly impacts your outcome.' },
    { question: 'How does Social Security factor in?', answer: 'Social Security replaces roughly 40% of pre-retirement income for average earners. The average benefit is ~$1,900/month ($22,800/year) in 2024. You can claim at 62 (reduced benefit), full retirement age (66-67), or delay until 70 (8% increase per year of delay). Many financial planners recommend treating Social Security as a bonus and planning to be self-sufficient without it.' },
  ];

  return (
    <>
      <Disclaimer type="finance" />

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Target className="w-8 h-8 text-indigo-500" />
            {t('home.tools.retirement.name')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {t('home.tools.retirement.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.current_age')}</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.retire_age')}</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={retireAge}
                    onChange={(e) => setRetireAge(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('forms.labels.current_savings')}</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('forms.labels.monthly_contrib')}</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

             <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('forms.labels.return_rate')}</label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.1"
                  value={returnRate}
                  onChange={(e) => setReturnRate(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">S&P 500 average is ~10%, conservative is 6-7%</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('forms.labels.inflation_rate')}</label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Average inflation rate is ~3%</p>
            </div>

          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800 text-center">
                <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">{t('results.total_savings')} ({retireAge})</h3>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
                  ${totalSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
               <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800 text-center">
                <h3 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">{t('results.total_interest')}</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-500" />
                Wealth Growth Projection
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                       <linearGradient id="colorContrib" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="age" label={{ value: 'Age', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <Tooltip 
                      formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, '']}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="savings" 
                      name="Total Balance" 
                      stroke="#6366f1" 
                      fillOpacity={1} 
                      fill="url(#colorSavings)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="contributions" 
                      name="Your Contributions" 
                      stroke="#22c55e" 
                      fillOpacity={0.6} 
                      fill="url(#colorContrib)" 
                    />
                    <ReferenceLine x={retireAge} stroke="red" strokeDasharray="3 3" label="Retirement" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* Sync Controls */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => profile.updateProfile({ age: currentAge, retirementAge: retireAge, currentSavings, monthlyContribution })}
                className="w-full py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-semibold rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-sm"
              >
                Save to Smart Profile
              </button>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">The Power of Time</h4>
              <p>
                Notice how the "Total Balance" curve (purple) starts to separate exponentially from "Your Contributions" (green) over time? 
                That is compound interest working for you. Starting just 5 years earlier can double your retirement nest egg!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
