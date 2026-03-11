'use client';

import { useState, useEffect } from 'react';
import { Disclaimer } from '@/components/Disclaimer';
import { TrendingUp, DollarSign, Calendar, Percent, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface GrowthData {
  month: number;
  year: number;
  balance: number;
  invested: number;
}

export default function TimeToMillionaireCalculator() {
  const { t } = useTranslation();
  const [currentBalance, setCurrentBalance] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(2000);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  
  const [yearsOptions, setYearsOptions] = useState<number>(0);
  const [monthsOptions, setMonthsOptions] = useState<number>(0);
  const [data, setData] = useState<GrowthData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calculateTimeToMillionaire = () => {
      setError(null);
      if (monthlyContribution <= 0 && currentBalance < 1000000 && annualReturn <= 0) {
          // If no contribution and no growth, and not already minimal, it's impossible or infinite
          setError("Increase contribution or return rate to reach $1M.");
          setYearsOptions(0);
          setMonthsOptions(0);
          setData([]);
          return;
      }

      let balance = currentBalance;
      let invested = currentBalance;
      let monthsPassed = 0;
      const monthlyRate = annualReturn / 100 / 12;
      const target = 1000000;
      const chartData: GrowthData[] = [];

      // Safety brake: 100 years max
      const maxMonths = 1200; 

      // Initial point
      chartData.push({
          month: 0,
          year: 0,
          balance: Math.round(balance),
          invested: Math.round(invested)
      });

      while (balance < target && monthsPassed < maxMonths) {
          balance = (balance + monthlyContribution) * (1 + monthlyRate);
          invested += monthlyContribution;
          monthsPassed++;

          if (monthsPassed % 12 === 0 || balance >= target) {
               chartData.push({
                  month: monthsPassed,
                  year: parseFloat((monthsPassed / 12).toFixed(1)),
                  balance: Math.round(balance),
                  invested: Math.round(invested)
              });
          }
      }

      if (monthsPassed >= maxMonths && balance < target) {
          setError("It will take over 100 years. Try increasing your contributions.");
      }

      setYearsOptions(Math.floor(monthsPassed / 12));
      setMonthsOptions(monthsPassed % 12);
      setData(chartData);
    };

    calculateTimeToMillionaire();
  }, [currentBalance, monthlyContribution, annualReturn]);

  const faqs = [
    { question: 'How long does it take to become a millionaire?', answer: 'It depends on your starting balance, monthly contributions, and investment return rate. With $500/month at 7% annual return starting from zero, it takes roughly 30 years. With $1,000/month it takes ~23 years. With $2,000/month it takes ~17 years. Starting with $50,000 already saved and contributing $1,000/month at 7% takes about 19 years. The two biggest factors are time and consistency.' },
    { question: 'What is a realistic rate of return?', answer: 'The S&P 500 has historically returned about 10% annually before inflation (roughly 7% after inflation, or 7% "real return"). A diversified portfolio of 80% stocks / 20% bonds averages about 8-9% nominal. Using 7% is a conservative but realistic assumption that accounts for inflation, fees, and market volatility. Be skeptical of any investment promising consistent 15%+ returns.' },
    { question: 'Does compound interest really make that big a difference?', answer: 'Yes, it is transformative. Contributing $500/month for 30 years means you invest $180,000 out of pocket. At 7% return, your portfolio would be worth $567,000 — meaning $387,000 (68%) came from compound growth, not your contributions. The "interest on interest" effect accelerates dramatically after year 15-20, which is why starting early is so powerful.' },
    { question: 'What if I start late — can I still become a millionaire?', answer: 'Absolutely. Starting at 35 with $0 and investing $1,500/month at 7% return reaches $1M by age 58. Starting at 40 requires ~$2,100/month. At 45, ~$3,200/month. The key is maximizing your savings rate and taking full advantage of tax-advantaged accounts (401k, IRA). Even late starters can build substantial wealth with disciplined, consistent investing over 15-20 years.' },
    { question: 'Do most millionaires inherit their wealth?', answer: 'No. According to the book "The Millionaire Next Door" and a 2019 Ramsey Solutions study, 79% of millionaires did not receive any inheritance. The majority built wealth through decades of consistent investing, living below their means, and avoiding high-interest debt. The median millionaire household income is $100K-$150K — high but not extraordinary. Discipline matters more than income.' },
  ];

  return (
    <>
      <Disclaimer type="finance" />

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Clock className="w-8 h-8 text-blue-500" />
            {t('home.tools.millionaire.name')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
             {t('home.tools.millionaire.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
             <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.current_balance')}</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.monthly_contrib')}</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.annual_interest')}</label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.1"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800 text-center">
                 <h3 className="text-blue-600 dark:text-blue-400 uppercase tracking-widest text-sm font-semibold mb-2">{t('results.time_to_1m')}</h3>
                 {error ? (
                     <p className="text-red-500 font-medium">{error}</p>
                 ) : (
                     <div className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-2">
                        {yearsOptions} <span className="text-xl font-medium text-gray-500">{t('results.years')}</span> {monthsOptions} <span className="text-xl font-medium text-gray-500">{t('results.months')}</span>
                     </div>
                 )}
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-500" />
                Growth Trajectory
              </h3>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <Tooltip 
                      formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, '']}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      name="Total Balance" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorBalance)" 
                    />
                     <Area 
                      type="monotone" 
                      dataKey="invested" 
                      name="Principal Invested" 
                      stroke="#9ca3af" 
                      fillOpacity={0.5} 
                      fill="transparent"
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
