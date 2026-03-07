'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, DollarSign, PieChart, Calendar } from 'lucide-react';
import { CalculatorInput } from '@/components/CalculatorInput';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

export default function ROICalculator() {
  const { t } = useTranslation();

  // State
  const [invested, setInvested] = useState<number>(1000);
  const [returned, setReturned] = useState<number>(1500);
  const [duration, setDuration] = useState<number>(12); // months
  const [showAnnualized, setShowAnnualized] = useState(false);

  // Results
  const [roi, setRoi] = useState<number>(0);
  const [profit, setProfit] = useState<number>(0);
  const [annualizedRoi, setAnnualizedRoi] = useState<number>(0);

  useEffect(() => {
    calculateROI();
  }, [invested, returned, duration]);

  const calculateROI = () => {
    // Basic ROI = ((Return - Investment) / Investment) * 100
    const netProfit = returned - invested;
    const roiPercent = invested > 0 ? (netProfit / invested) * 100 : 0;
    
    setProfit(netProfit);
    setRoi(roiPercent);

    // Annualized ROI = ((1 + ROI)^ (1/n) - 1) * 100
    // where n = number of years
    if (duration > 0 && invested > 0 && returned > 0) {
        const years = duration / 12;
        // Formula: (Final / Initial) ^ (1/years) - 1
        const annualized = (Math.pow(returned / invested, 1 / years) - 1) * 100;
        setAnnualizedRoi(annualized);
    } else {
        setAnnualizedRoi(0);
    }
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const chartData = [
    { name: t('roi.investment', 'Investment'), value: invested },
    { name: t('roi.profit', 'Profit'), value: Math.max(0, profit) }
  ];

  const COLORS = ['#94a3b8', '#10b981']; // Gray for cost, Emerald for profit
  if (profit < 0) COLORS[1] = '#ef4444'; // Red for loss

  const faqs = [
    { question: 'What is ROI?', answer: 'ROI (Return on Investment) measures the gain or loss generated on an investment relative to its cost. The formula is ((Return - Investment) / Investment) × 100. For example, investing $1,000 and getting back $1,500 gives a 50% ROI. It is the most universal metric for evaluating any investment or business decision, from stocks to marketing campaigns to equipment purchases.' },
    { question: 'What is ROAS?', answer: 'ROAS (Return on Ad Spend) is a marketing-specific metric showing revenue earned per dollar spent on advertising. A ROAS of 4x means $4 in revenue for every $1 spent on ads. Unlike ROI, ROAS measures gross revenue, not profit — so you still need to subtract cost of goods, overhead, and other expenses to determine true profitability. Most e-commerce businesses need a minimum ROAS of 3-4x to be profitable.' },
    { question: 'What is a good ROI?', answer: 'It varies significantly by context. The S&P 500 averages ~10% annually (7% after inflation). For marketing, a 5:1 ROAS (500% ROI) is considered strong. Real estate targets 8-12% annually. Venture capital expects 10x returns on winners. For business investments, any ROI above your company\'s cost of capital (typically 8-15%) creates value. The key is comparing ROI to your alternative uses of that money.' },
    { question: 'What are the limitations of ROI?', answer: 'ROI does not account for time — a 50% ROI over 5 years is very different from 50% over 1 month. It also ignores risk: a guaranteed 5% ROI is often better than a risky 20% ROI. For time-adjusted comparisons, use annualized ROI or IRR (Internal Rate of Return). ROI also does not capture intangible benefits like brand awareness, customer loyalty, or strategic positioning.' },
    { question: 'How can I improve my ROAS?', answer: 'Focus on: (1) targeting — reach the right audience with precise demographics and interests; (2) creative quality — test multiple ad variations and double down on winners; (3) landing page optimization — ensure your page converts visitors to customers; (4) retargeting — re-engage people who visited but did not buy; (5) exclude poor performers — regularly cut campaigns with ROAS below your threshold. Small improvements in each area compound significantly.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="finance" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <TrendingUp className="w-8 h-8 text-emerald-500" />
          {t('roi.title', 'ROI / ROAS Calculator')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('roi.subtitle', 'Measure the efficiency and profitability of your investments.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <DollarSign className="w-5 h-5 text-emerald-500" />
              {t('forms.sections.inputs', 'Your Details')}
            </h2>

            <div className="space-y-6">
              <CalculatorInput
                label={t('roi.invested', 'Amount Invested')}
                value={invested}
                onChange={setInvested}
                min={0}
                icon={DollarSign}
                helpText={t('roi.invested_help', 'Total cost of the investment or ad spend.')}
              />

              <CalculatorInput
                label={t('roi.returned', 'Amount Returned')}
                value={returned}
                onChange={setReturned}
                min={0}
                icon={DollarSign}
                helpText={t('roi.returned_help', 'Total revenue generated.')}
              />
              
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                 <button 
                    onClick={() => setShowAnnualized(!showAnnualized)}
                    className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 mb-4 font-medium flex items-center gap-1"
                 >
                    <Calendar className="w-3 h-3" />
                    {showAnnualized ? t('roi.hide_time', 'Hide Time Duration') : t('roi.show_time', 'Calculate Annualized ROI?')}
                 </button>
                 
                 {showAnnualized && (
                    <CalculatorInput
                        label={t('roi.duration', 'Duration (Months)')}
                        value={duration}
                        onChange={setDuration}
                        min={1}
                        max={360}
                        icon={Calendar}
                        helpText={t('roi.duration_help', 'How long did the investment take?')}
                    />
                 )}
              </div>
            </div>
          </div>
          
          <AdSlot className="h-[300px] w-full" label="ROI Sidebar" />
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-6 rounded-2xl border ${profit >= 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-red-50 border-red-100 text-red-900'} dark:bg-opacity-10 dark:border-opacity-20`}>
                    <div className="text-sm font-semibold uppercase tracking-wider opacity-70 mb-1">
                        {t('roi.roi_percent', 'Total ROI')}
                    </div>
                    <div className="text-3xl font-bold">
                        {roi.toFixed(2)}%
                    </div>
                </div>
                
                <div className="p-6 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {t('roi.net_profit', 'Net Profit')}
                    </div>
                    <div className={`text-3xl font-bold ${profit >= 0 ? 'text-gray-900 dark:text-white' : 'text-red-500'}`}>
                        {formatCurrency(profit)}
                    </div>
                </div>
                
                 <div className="p-6 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                     <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {showAnnualized ? t('roi.annualized', 'Annualized ROI') : t('roi.multiplier', 'Multiplier (ROAS)')}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {showAnnualized ? `${annualizedRoi.toFixed(2)}%` : `${(returned / (invested || 1)).toFixed(2)}x`}
                    </div>
                </div>
             </div>
             
             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 flex flex-col md:flex-row items-center">
                 <div className="flex-1 w-full">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-gray-500" />
                        {t('roi.breakdown', 'Investment Breakdown')}
                    </h3>
                     {profit > 0 ? (
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <RePieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((_entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                         formatter={(value: any) => [formatCurrency(Number(value)), t('roi.value', 'Value')]}
                                         itemStyle={{ color: '#f3f4f6' }}
                                         contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                                    />
                                    <Legend />
                                </RePieChart>
                            </ResponsiveContainer>
                        </div>
                     ) : (
                         <div className="h-[250px] flex items-center justify-center text-gray-400 text-sm italic">
                             {t('roi.no_profit_chart', 'No profit to display in chart.')}
                         </div>
                     )}
                 </div>
                 
                 <div className="md:w-64 md:border-l border-gray-100 dark:border-gray-700 md:pl-6 mt-6 md:mt-0 space-y-4 text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        <strong>ROI (Return on Investment)</strong> measures the gain or loss generated on an investment relative to the amount of money invested.
                    </p>
                    <p>
                        <strong>ROAS (Return on Ad Spend)</strong> is a marketing metric that measures the efficacy of a digital advertising campaign.
                    </p>
                 </div>
             </div>
            
            <AdSlot className="h-24 w-full" label="Bottom Banner" />
        </div>
      </div>
    </div>
  );
}
