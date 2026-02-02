import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { TrendingUp, DollarSign, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../store/userStore';
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

interface FireData {
  age: number;
  netWorth: number;
  fireNumber: number;
  passiveIncome: number;
}

export default function FireCalculator() {
  const { t } = useTranslation();

  const profile = useUserStore();

  // Inputs initialized from store or fallback
  const [currentAge, setCurrentAge] = useState<number>(profile.age);
  const [currentNetWorth, setCurrentNetWorth] = useState<number>(profile.currentSavings);
  const [annualIncome, setAnnualIncome] = useState<number>(profile.annualIncome); // Post-tax
  const [annualSpending, setAnnualSpending] = useState<number>(60000); // Default, store doesn't track spending yet
  const [returnRate, setReturnRate] = useState<number>(7.0);
  const [withdrawalRate, setWithdrawalRate] = useState<number>(profile.safeWithdrawalRate);

  // Outputs
  const [fireNumber, setFireNumber] = useState<number>(0);
  const [yearsToFire, setYearsToFire] = useState<number>(0);
  const [freedomDate, setFreedomDate] = useState<string>('');
  const [chartData, setChartData] = useState<FireData[]>([]);

  useEffect(() => {
    const calculateFire = () => {
      // 1. Calculate FIRE Number
      // FIRE Number = Annual Spending / Safe Withdrawal Rate
      const target = annualSpending / (withdrawalRate / 100);
      setFireNumber(target);

      // 2. Project Growth
      const annualSavings = annualIncome - annualSpending;
      let balance = currentNetWorth;
      let age = currentAge;
      const data: FireData[] = [];
      let found = false;
      let years = 0;

      // Limit projection to 50 years max or age 90
      const maxYears = 50;
      
      data.push({
        age: age,
        netWorth: Math.round(balance),
        fireNumber: Math.round(target),
        passiveIncome: Math.round(balance * (withdrawalRate / 100))
      });

      for (let i = 1; i <= maxYears; i++) {
        // Growth: Balance * (1 + rate) + Savings
        balance = balance * (1 + returnRate / 100) + annualSavings;
        age++;
        years++;

        // Passive Income = Balance * Withdrawal Rate
        const passive = balance * (withdrawalRate / 100);

        data.push({
          age: Number(age.toFixed(1)),
          netWorth: Math.round(balance),
          fireNumber: Math.round(target),
          passiveIncome: Math.round(passive)
        });

        if (!found && balance >= target) {
          found = true;
          setYearsToFire(Number((i - (1 - (target - (data[i-1].netWorth)) / (balance - data[i-1].netWorth))).toFixed(1))); // Interpolate roughly
        }
      }

      setChartData(data);
      
      // Calculate Date
      const today = new Date();
      const freedom = new Date(today.setFullYear(today.getFullYear() + (found ? Math.floor(yearsToFire) : 99)));
      // Add fractional months
      if (found) {
         const fractionalYears = yearsToFire % 1;
         freedom.setMonth(freedom.getMonth() + Math.round(fractionalYears * 12));
      }
      
      const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
      setFreedomDate(found ? freedom.toLocaleDateString(undefined, options) : t('results.forever'));
      
      if (!found) setYearsToFire(-1); // Indicator for "Never" within timeframe
    };

    calculateFire();
  }, [currentAge, currentNetWorth, annualIncome, annualSpending, returnRate, withdrawalRate, t, yearsToFire]);

  return (
    <>
      <Helmet>
        <title>{t('home.tools.fire.name')} - SmartCalc</title>
        <meta name="description" content={t('home.tools.fire.desc')} />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Target className="w-8 h-8 text-orange-500" />
            {t('home.tools.fire.name')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {t('home.tools.fire.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
             {/* Current Stats */}
             <div className="space-y-4">
               <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Your Details</h3>
               <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.current_age')}</label>
                  <input type="number" value={currentAge} onChange={e => setCurrentAge(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg focus:ring-2 focus:ring-orange-500" />
               </div>
               <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.current_net_worth')}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                    <input type="number" value={currentNetWorth} onChange={e => setCurrentNetWorth(Number(e.target.value))} className="w-full pl-7 p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                  </div>

             {/* Sync Controls */}
             <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-gray-700">
               <button 
                  onClick={() => profile.updateProfile({ age: currentAge, currentSavings: currentNetWorth, annualIncome, safeWithdrawalRate: withdrawalRate })}
                  className="w-full py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors text-sm"
               >
                 Save to Smart Profile
               </button>
             </div>
               </div>
             </div>

             {/* Income & Expenses */}
             <div className="space-y-4">
               <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Money In & Out</h3>
               <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.annual_income')}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                    <input type="number" value={annualIncome} onChange={e => setAnnualIncome(Number(e.target.value))} className="w-full pl-7 p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Post-tax (Take home pay)</p>
               </div>
               <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.annual_spending')}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">$</span>
                    <input type="number" value={annualSpending} onChange={e => setAnnualSpending(Number(e.target.value))} className="w-full pl-7 p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                  </div>
               </div>
             </div>

             {/* Assumptions */}
             <div className="space-y-4">
               <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Assumptions</h3>
               <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.return_rate')}</label>
                  <div className="relative">
                    <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                    <input type="number" step="0.1" value={returnRate} onChange={e => setReturnRate(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                  </div>
               </div>
               <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.withdrawal_rate')}</label>
                  <div className="relative">
                    <span className="absolute right-3 top-2.5 text-gray-400">%</span>
                    <input type="number" step="0.1" value={withdrawalRate} onChange={e => setWithdrawalRate(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg focus:ring-2 focus:ring-orange-500" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Standard FIRE rule is 4.0%</p>
               </div>
             </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-2 space-y-6">
             {/* Big Numbers */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-800 text-center">
                   <h3 className="text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">Financial Freedom Date</h3>
                   <p className="text-3xl font-black text-gray-900 dark:text-white mt-2">
                     {yearsToFire > 0 ? freedomDate : '---'}
                   </p>
                   {yearsToFire > 0 && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">in {Math.floor(yearsToFire)} years, {Math.round((yearsToFire % 1) * 12)} months</p>}
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
                   <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Your FIRE Number</h3>
                   <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                     ${fireNumber.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                   </p>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Needed to sustain current spending</p>
                </div>
             </div>

             {/* Chart */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                   <TrendingUp className="w-5 h-5 text-gray-500" />
                   The Crossover Point
                </h3>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="age" label={{ value: 'Age', position: 'insideBottomRight', offset: -5 }} />
                      <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <Tooltip 
                        formatter={(value: number | undefined) => [value !== undefined ? `$${Number(value).toLocaleString()}` : '', '']}
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="netWorth" 
                        name="Net Worth" 
                        stroke="#f97316" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorNetWorth)" 
                      />
                      <ReferenceLine y={fireNumber} label="FIRE Target" stroke="#22c55e" strokeDasharray="3 3" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
             </div>

             {/* Insight */}
             <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-800/30">
                <div className="flex gap-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/50 rounded-full h-fit">
                    <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">The 4% Rule</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      This calculator uses the "4% Rule" (Safe Withdrawal Rate), which suggests you can withdraw 4% of your portfolio annually adjusted for inflation without running out of money for at least 30 years. To be safer, some people target 3.5% or 3%.
                    </p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}
