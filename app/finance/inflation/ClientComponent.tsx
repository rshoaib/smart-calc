'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, DollarSign, Calendar, Info } from 'lucide-react';
import { CalculatorInput } from '@/components/CalculatorInput';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';
import { cpiData } from './cpiData';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function InflationCalculator() {
  const { t } = useTranslation();

  const MIN_YEAR = 1913;
  const MAX_YEAR = 2026;

  // State
  const [amount, setAmount] = useState<number>(100);
  const [startYear, setStartYear] = useState<number>(1980);
  const [endYear, setEndYear] = useState<number>(new Date().getFullYear());

  // Results
  const [adjustedValue, setAdjustedValue] = useState<number>(0);
  const [cumulativeInflation, setCumulativeInflation] = useState<number>(0);
  const [annualRate, setAnnualRate] = useState<number>(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [calcDirection, setCalcDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => {
    calculateInflation();
  }, [amount, startYear, endYear]);

  const calculateInflation = () => {
    // Validate bounds
    const safeStart = Math.min(Math.max(startYear, MIN_YEAR), MAX_YEAR);
    const safeEnd = Math.min(Math.max(endYear, MIN_YEAR), MAX_YEAR);

    const cpiStart = cpiData[safeStart];
    const cpiEnd = cpiData[safeEnd];

    if (!cpiStart || !cpiEnd) return;

    // Calculation
    const value = amount * (cpiEnd / cpiStart);
    setAdjustedValue(value);

    // Cumulative
    let cumulative = 0;
    if (safeEnd >= safeStart) {
      cumulative = ((cpiEnd - cpiStart) / cpiStart) * 100;
      setCalcDirection('forward');
    } else {
      cumulative = ((cpiStart - cpiEnd) / cpiEnd) * 100; // Buying power lost/gained looking backward
      setCalcDirection('backward');
    }
    setCumulativeInflation(cumulative);

    // Annualized
    const yearsDiff = Math.abs(safeEnd - safeStart);
    if (yearsDiff > 0) {
      const cpiRatio = safeEnd > safeStart ? (cpiEnd / cpiStart) : (cpiStart / cpiEnd);
      const annual = (Math.pow(cpiRatio, 1 / yearsDiff) - 1) * 100;
      setAnnualRate(annual);
    } else {
      setAnnualRate(0);
    }

    // Chart Data Generation
    const data = [];
    const minStepYear = Math.min(safeStart, safeEnd);
    const maxStepYear = Math.max(safeStart, safeEnd);
    
    // To prevent the chart from having 100 dots, step by appropriate increments if range is huge
    const range = maxStepYear - minStepYear;
    let step = 1;
    if (range > 50) step = 5;
    else if (range > 20) step = 2;

    for (let year = minStepYear; year <= maxStepYear; year += step) {
      if (cpiData[year]) {
        // We chart the 'equivalent value' of the amount starting from safeStart
        const yearValue = amount * (cpiData[year] / cpiStart);
        data.push({
          year: year.toString(),
          value: yearValue,
        });
      }
    }
    // ensure end year is included
    if (data.length > 0 && data[data.length - 1].year !== maxStepYear.toString()) {
         data.push({
          year: maxStepYear.toString(),
          value: amount * (cpiData[maxStepYear] / cpiStart),
        });
    }

    setChartData(data);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const faqs = [
    { question: 'What is Inflation?', answer: 'Inflation represents the rate at which the cost of a weighted average market basket of goods and services climbs over a period. In simpler terms, it measures how much purchasing power the US Dollar loses over time.' },
    { question: 'How is this calculated?', answer: 'We use the historical Consumer Price Index (CPI-U) data published by the U.S. Bureau of Labor Statistics. The formula multiplies your initial amount by the ratio of the ending year CPI over the starting year CPI.' },
    { question: 'Why does my money lose value?', answer: 'As the money supply increases and the cost of producing goods rises (due to labor or material costs), prices go up. This means the same $100 buys fewer goods today than it did 20 or 50 years ago.' },
    { question: 'What is a good inflation rate?', answer: 'Most central banks, including the US Federal Reserve, target a steady inflation rate of about 2% per year. This gentle rise encourages consumers to spend and invest (since money loses value sitting in cash) while keeping prices stable enough for economic growth.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="finance" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <TrendingUp className="w-8 h-8 text-emerald-500" />
          {t('inflation.title', 'Inflation Calculator')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('inflation.subtitle', 'Calculate the changing value of the US dollar over time using historical CPI data.')}
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
                label={t('inflation.amount', 'Amount')}
                value={amount}
                onChange={setAmount}
                min={0}
                icon={DollarSign}
                helpText={t('inflation.amount_help', 'The dollar value to convert.')}
              />

              <CalculatorInput
                label={t('inflation.start_year', 'Starting Year')}
                value={startYear}
                onChange={(val) => setStartYear(Math.max(MIN_YEAR, Math.min(MAX_YEAR, val)))}
                min={MIN_YEAR}
                max={MAX_YEAR}
                icon={Calendar}
                helpText={`Enter a year between ${MIN_YEAR} and ${MAX_YEAR}.`}
              />

              <CalculatorInput
                label={t('inflation.end_year', 'Ending Year')}
                value={endYear}
                onChange={(val) => setEndYear(Math.max(MIN_YEAR, Math.min(MAX_YEAR, val)))}
                min={MIN_YEAR}
                max={MAX_YEAR}
                icon={Calendar}
                helpText={`Enter a year between ${MIN_YEAR} and ${MAX_YEAR}.`}
              />
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg text-sm flex gap-3">
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>Calculations are based on the official U.S. Consumer Price Index (CPI-U) averages from 1913 to current period projections.</p>
            </div>
          </div>
          
          <AdSlot className="h-[300px] w-full" label="Inflation Sidebar" />
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-6">
             <div className="p-8 rounded-2xl border bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
                <div className="text-sm font-semibold uppercase tracking-wider opacity-90 mb-2">
                    {startYear === endYear ? 'Equivalent Value' : 
                     calcDirection === 'forward' ? `Value in ${endYear}` : `Value in ${endYear} (Historically)`}
                </div>
                <div className="text-5xl font-bold mb-4">
                    {formatCurrency(adjustedValue)}
                </div>
                <p className="opacity-90 leading-relaxed text-sm md:text-base">
                    {formatCurrency(amount)} in <strong>{startYear}</strong> has the same purchasing power as <strong>{formatCurrency(adjustedValue)}</strong> in <strong>{endYear}</strong>.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {t('inflation.cumulative', 'Cumulative Price Change')}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {cumulativeInflation.toFixed(1)}%
                    </div>
                </div>
                
                 <div className="p-6 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                     <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                        {t('inflation.annualRate', 'Avg Annual Inflation Rate')}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {annualRate.toFixed(2)}%
                    </div>
                </div>
             </div>
             
             {chartData.length > 1 && (
                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                     <h3 className="font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                         <TrendingUp className="w-5 h-5 text-gray-500" />
                         Purchasing Power Trajectory
                     </h3>
                     <div className="h-[300px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                             <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                 <defs>
                                     <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                         <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                         <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                     </linearGradient>
                                 </defs>
                                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.2} />
                                 <XAxis 
                                     dataKey="year" 
                                     stroke="#6b7280" 
                                     fontSize={12}
                                     tickMargin={10}
                                     minTickGap={20}
                                 />
                                 <YAxis 
                                     stroke="#6b7280" 
                                     fontSize={12}
                                     tickFormatter={(value) => `$${value}`}
                                     width={60}
                                 />
                                 <Tooltip 
                                     formatter={(value: any) => [formatCurrency(Number(value)), 'Value']}
                                     labelFormatter={(label) => `Year: ${label}`}
                                     contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '8px' }}
                                 />
                                 <Area 
                                     type="monotone" 
                                     dataKey="value" 
                                     stroke="#10b981" 
                                     strokeWidth={3}
                                     fillOpacity={1} 
                                     fill="url(#colorValue)" 
                                 />
                             </AreaChart>
                         </ResponsiveContainer>
                     </div>
                 </div>
             )}
            
            <AdSlot className="h-24 w-full" label="Bottom Banner" />
        </div>
      </div>

       {/* FAQ Section */}
       <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t('common.faq', 'Frequently Asked Questions')}</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
