'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Target, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { CalculatorInput } from '@/components/CalculatorInput';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function SavingsGoalCalculator() {
  const { t } = useTranslation();

  // State
  const [goalAmount, setGoalAmount] = useState<number>(20000);
  const [currentSavings, setCurrentSavings] = useState<number>(5000);
  const [years, setYears] = useState<number>(3);
  const [interestRate, setInterestRate] = useState<number>(5);

  // Results
  const [monthlyContribution, setMonthlyContribution] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    calculateSavings();
  }, [goalAmount, currentSavings, years, interestRate]);

  const calculateSavings = () => {
    const r = interestRate / 100 / 12; // Monthly interest rate
    const n = years * 12; // Total number of months
    
    // Future Value of Current Savings: FV_current = PV * (1 + r)^n
    const fvCurrent = currentSavings * Math.pow(1 + r, n);
    
    // Remaining Goal to be met by contributions
    const remainingGoal = goalAmount - fvCurrent;
    
    let pmt = 0; // Monthly contribution
    
    if (remainingGoal > 0) {
        if (r === 0) {
            pmt = remainingGoal / n;
        } else {
            // Formula for PMT: PMT = FV * r / ((1 + r)^n - 1)
            pmt = remainingGoal * r / (Math.pow(1 + r, n) - 1);
        }
    }
    
    const totalInvested = currentSavings + (pmt * n);
    const interestEarned = goalAmount - totalInvested;

    setMonthlyContribution(Math.max(0, pmt));
    setTotalInterest(Math.max(0, interestEarned));
    
    // Generate Chart Data
    const data = [];
    let balance = currentSavings;
    const yearlyContribution = pmt * 12;
    
    for (let i = 0; i <= years; i++) {
        data.push({
            year: `Year ${i}`,
            balance: Math.round(balance),
            invested: Math.round(currentSavings + (yearlyContribution * i))
        });
        // Compound for next year
        balance = (balance + yearlyContribution) * (1 + interestRate / 100); 
        // Simple approximation for chart, strictly accurate would be monthly iteration
    }
    setChartData(data);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const faqs = [
    { question: 'How much should I save per month?', answer: 'It depends on your goal, timeline, and existing savings. A common guideline is the 50/30/20 rule: 50% needs, 30% wants, 20% savings. This calculator solves for the exact monthly amount needed to hit your target, factoring in compound interest on your contributions. Even small amounts add up — $200/month at 5% becomes $27,600 in 10 years.' },
    { question: 'What interest rate should I use?', answer: 'For a high-yield savings account (HYSA), use 4-5% (current 2024 rates). For a CD, use 4-5.5%. For S&P 500 index fund investing, use 7-10% (10% nominal, 7% inflation-adjusted). Use lower rates for shorter time horizons (under 3 years) since you should not invest short-term money in stocks. For goals under 1 year, a HYSA or money market is safest.' },
    { question: 'How does compound interest help my savings?', answer: 'Compound interest earns interest on your principal AND on previously earned interest. Over time, this snowball effect accelerates dramatically — your money grows exponentially rather than linearly. On a $20K goal over 5 years, compound interest at 5% saves you ~$180/month vs needing ~$333/month with zero interest. The longer the timeline, the more powerful the compounding effect.' },
    { question: 'Should I automate my savings?', answer: 'Yes — automation is the single most effective savings strategy. Set up automatic transfers from checking to savings on each payday. Studies show people who automate save 2-3x more than those who manually transfer. Treat savings like a bill that must be paid. Most banks let you schedule recurring transfers for free. "Pay yourself first" before discretionary spending.' },
    { question: 'What are good savings benchmarks?', answer: 'Emergency fund: 3-6 months of expenses ($10K-$30K for most people). Down payment: 20% of home price ($60K-$100K). New car: aim for 10-20% down ($3K-$8K). Wedding: average US cost is ~$35K. College: $80K-$200K+ depending on institution. Retirement: 1x salary saved by 30, 3x by 40, 6x by 50, 10x by 65. Start with the most urgent goal and work your way through.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="finance" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Target className="w-8 h-8 text-blue-500" />
          {t('savings.title', 'Savings Goal Calculator')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('savings.subtitle', 'Map out your path to a specific financial target.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <DollarSign className="w-5 h-5 text-blue-500" />
              {t('forms.sections.inputs', 'Your Details')}
            </h2>

            <div className="space-y-6">
              <CalculatorInput
                label={t('savings.goal_amount', 'Savings Goal')}
                value={goalAmount}
                onChange={setGoalAmount}
                min={0}
                icon={Target}
                helpText={t('savings.goal_help', 'The total amount you want to save.')}
              />

              <CalculatorInput
                label={t('savings.current_savings', 'Current Savings')}
                value={currentSavings}
                onChange={setCurrentSavings}
                min={0}
                icon={DollarSign}
                helpText={t('savings.current_help', 'Amount you have saved so far.')}
              />
              
              <CalculatorInput
                label={t('savings.years', 'Time to Grow (Years)')}
                value={years}
                onChange={setYears}
                min={1}
                max={50}
                icon={Calendar}
                helpText={t('savings.years_help', 'When do you need the money?')}
              />

              <CalculatorInput
                label={t('savings.interest_rate', 'Interest Rate (%)')}
                value={interestRate}
                onChange={setInterestRate}
                min={0}
                max={20}
                step={0.1}
                icon={TrendingUp}
                helpText={t('savings.rate_help', 'Expected annual return on savings.')}
              />
            </div>
          </div>
          
          <AdSlot className="h-[300px] w-full" label="Savings Sidebar" />
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl shadow-lg p-6 text-white text-center relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-lg font-medium opacity-90 mb-2">{t('savings.monthly_needed', 'Required Monthly Savings')}</h3>
                    <div className="text-5xl font-bold mb-2">
                        {formatCurrency(monthlyContribution)}
                    </div>
                     <p className="text-blue-100 text-sm">
                        To reach {formatCurrency(goalAmount)} in {years} years.
                     </p>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4">
                    <Target className="w-32 h-32" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-6 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {t('savings.total_interest', 'Total Interest Earned')}
                    </div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(totalInterest)}
                    </div>
                </div>
                 <div className="p-6 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {t('savings.total_principal', 'Total Principal')}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(goalAmount - totalInterest)}
                    </div>
                </div>
            </div>

             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                 <h3 className="font-semibold text-gray-900 dark:text-white mb-6">
                    {t('savings.growth_chart', 'Savings Growth Over Time')}
                 </h3>
                 <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                            <XAxis 
                                dataKey="year" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#9ca3af', fontSize: 12}}
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{fill: '#9ca3af', fontSize: 12}}
                                tickFormatter={(value) => `$${value/1000}k`}
                            />
                            <Tooltip 
                                formatter={(value: any) => [formatCurrency(Number(value)), 'Balance']}
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                                itemStyle={{ color: '#f3f4f6' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="balance" 
                                stroke="#3b82f6" 
                                fillOpacity={1} 
                                fill="url(#colorBalance)" 
                                strokeWidth={3}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                 </div>
             </div>
            
            <AdSlot className="h-24 w-full" label="Bottom Banner" />
        </div>
      </div>
    </div>
  );
}
