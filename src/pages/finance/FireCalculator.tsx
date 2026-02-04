import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { TrendingUp, DollarSign, Target, Percent } from 'lucide-react';
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
  Legend
} from 'recharts';
import { CalculatorInput } from '../../components/CalculatorInput';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

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
  const [annualSpending, setAnnualSpending] = useState<number>(60000); 
  const [returnRate, setReturnRate] = useState<number>(7.0);
  const [withdrawalRate, setWithdrawalRate] = useState<number>(profile.safeWithdrawalRate);
  
  // New: Inflation Logic
  const [inflationRate, setInflationRate] = useState<number>(2.5);
  const [isInflationAdjusted, setIsInflationAdjusted] = useState<boolean>(true);

  // Outputs
  const [fireNumber, setFireNumber] = useState<number>(0);
  const [yearsToFire, setYearsToFire] = useState<number>(0);
  const [freedomDate, setFreedomDate] = useState<string>('');
  const [chartData, setChartData] = useState<FireData[]>([]);

  useEffect(() => {
    const calculateFire = () => {
      // 1. Calculate Base FIRE Number (in today's dollars)
      const baseTarget = annualSpending / (withdrawalRate / 100);
      
      // 2. Determine Effective Growth Rate
      // Real Return = (1 + Nominal) / (1 + Inflation) - 1
      const realReturn = ((1 + returnRate / 100) / (1 + inflationRate / 100)) - 1;
      const effectiveGrowthRate = isInflationAdjusted ? realReturn : (returnRate / 100);

      // In Nominal mode, the target grows by inflation. In Real mode, it stays key.
      const initialTarget = baseTarget;
      
      // 3. Project Growth
      const annualSavings = annualIncome - annualSpending;
      let balance = currentNetWorth;
      let age = currentAge;
      const data: FireData[] = [];
      let found = false;
      let calculatedYears = -1;

      // Limit projection
      const maxYears = 50;
      
      data.push({
        age: age,
        netWorth: Math.round(balance),
        fireNumber: Math.round(initialTarget),
        passiveIncome: Math.round(balance * (withdrawalRate / 100))
      });

      for (let i = 1; i <= maxYears; i++) {
        // Growth logic
        let yearlySavings = annualSavings;
        if (!isInflationAdjusted) {
             yearlySavings = annualSavings * Math.pow(1 + inflationRate/100, i);
        }

        balance = balance * (1 + effectiveGrowthRate) + yearlySavings;
        
        // Target Logic
        let currentTarget = initialTarget;
        if (!isInflationAdjusted) {
             currentTarget = initialTarget * Math.pow(1 + inflationRate/100, i);
        }

        age++;

        // Passive Income
        const passive = balance * (withdrawalRate / 100);

        data.push({
          age: Number(age.toFixed(1)),
          netWorth: Math.round(balance),
          fireNumber: Math.round(currentTarget),
          passiveIncome: Math.round(passive)
        });

        if (!found && balance >= currentTarget) {
          found = true;
          calculatedYears = i;
        }
      }

      setChartData(data);
      setFireNumber(data[0].fireNumber); // Display Today's Target
      setYearsToFire(found ? calculatedYears : -1);

      // Calculate Date
      const today = new Date();
      const freedom = new Date(today.setFullYear(today.getFullYear() + (found ? Math.floor(calculatedYears) : 99)));
      if (found) {
         freedom.setMonth(freedom.getMonth() + Math.round((calculatedYears % 1) * 12));
      }
      
      const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
      setFreedomDate(found ? freedom.toLocaleDateString(undefined, options) : t('results.forever'));
    };

    calculateFire();
  }, [currentAge, currentNetWorth, annualIncome, annualSpending, returnRate, withdrawalRate, inflationRate, isInflationAdjusted, t]);

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

        {/* Inflation Toggle Banner */}
        <div className="flex justify-center">
           <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg flex items-center">
              <button
                onClick={() => setIsInflationAdjusted(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isInflationAdjusted 
                  ? 'bg-white dark:bg-gray-700 text-orange-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                }`}
              >
                Real Value (Today's $)
              </button>
              <button
                 onClick={() => setIsInflationAdjusted(false)}
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  !isInflationAdjusted 
                  ? 'bg-white dark:bg-gray-700 text-orange-600 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                }`}
              >
                Nominal Value (Future $)
              </button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
             {/* Current Stats */}
             <div className="space-y-4">
               <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Your Details</h3>
               <CalculatorInput 
                  label={t('forms.labels.current_age')}
                  value={currentAge}
                  onChange={setCurrentAge}
               />
               <CalculatorInput 
                  label={t('forms.labels.current_net_worth')}
                  value={currentNetWorth}
                  onChange={setCurrentNetWorth}
                  icon={DollarSign}
               />

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

             {/* Income & Expenses */}
             <div className="space-y-4">
               <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Money In & Out</h3>
               <div>
                  <CalculatorInput 
                    label={t('forms.labels.annual_income')}
                    value={annualIncome}
                    onChange={setAnnualIncome}
                    icon={DollarSign}
                  />
                  <p className="text-xs text-gray-400 mt-1">Post-tax (Take home pay)</p>
               </div>
               <CalculatorInput 
                    label={t('forms.labels.annual_spending')}
                    value={annualSpending}
                    onChange={setAnnualSpending}
                    icon={DollarSign}
                  />
             </div>

             {/* Assumptions */}
             <div className="space-y-4">
               <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">Assumptions</h3>
                <CalculatorInput 
                  label={t('forms.labels.return_rate')}
                  value={returnRate}
                  onChange={setReturnRate}
                  step="0.1"
                  icon={Percent}
               />
               
               <CalculatorInput 
                  label="Inflation Rate (%)"
                  value={inflationRate}
                  onChange={setInflationRate}
                  step="0.1"
                  icon={Percent}
               />

               <div>
                 <CalculatorInput 
                    label={t('forms.labels.withdrawal_rate')}
                    value={withdrawalRate}
                    onChange={setWithdrawalRate}
                    step="0.1"
                    icon={Percent}
                 />
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
                   {yearsToFire > 0 && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">in ~{Math.floor(yearsToFire)} years</p>}
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
                   <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                     {isInflationAdjusted ? "FIRE (Real Value)" : "FIRE (Nominal Value)"}
                   </h3>
                   <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                     ${fireNumber.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                   </p>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                     {isInflationAdjusted ? "Buying power in today's dollars" : "Actual dollar amount in future"}
                   </p>
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
                        formatter={(value: ValueType | undefined, name: NameType | undefined) => {
                           if (value === undefined) return ['', name];
                           const num = Number(value);
                           return [`$${num.toLocaleString()}`, name];
                        }}
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
                      <Area 
                        type="monotone" 
                        dataKey="fireNumber" 
                        name="FIRE Target" 
                        stroke="#22c55e" 
                        strokeDasharray="5 5"
                        fill="none" 
                        strokeWidth={2}
                      />
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
                    <h4 className="font-bold text-gray-900 dark:text-white">Why "Real Value" Matters?</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Inflation eats away purchasing power. A million dollars in 30 years won't buy what it does today. 
                      Use <strong>Real Value</strong> to plan purchasing power, and <strong>Nominal Value</strong> to see the actual bank account number you'll see on screen.
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
