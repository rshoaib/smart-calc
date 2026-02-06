import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { TrendingUp, DollarSign, Calendar, Percent, Split } from 'lucide-react';
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
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { CalculatorInput } from '../../components/CalculatorInput';

interface InvestmentData {
  year: number;
  // Scenario A
  totalA: number;
  investedA: number;
  interestA: number;
  // Scenario B
  totalB?: number;
  investedB?: number;
  interestB?: number;
}

interface ScenarioState {
  initial: number;
  monthly: number;
  rate: number;
  years: number;
}

export default function InvestmentCalculator() {
  const { t } = useTranslation();
  
  // State
  const [isComparing, setIsComparing] = useState(false);
  const [scenarioA, setScenarioA] = useState<ScenarioState>({
    initial: 10000,
    monthly: 500,
    rate: 7,
    years: 20
  });

  // Initialize Scenario B with same values as A for easier comparison
  const [scenarioB, setScenarioB] = useState<ScenarioState>({
    initial: 10000,
    monthly: 500,
    rate: 7,
    years: 20
  });

  const [data, setData] = useState<InvestmentData[]>([]);
  const [finalValues, setFinalValues] = useState<{
    totalA: number;
    interestA: number;
    totalB: number;
    interestB: number;
  }>({ totalA: 0, interestA: 0, totalB: 0, interestB: 0 });

  // Update handler
  const updateScenario = (scenario: 'A' | 'B', field: keyof ScenarioState, value: number) => {
    if (scenario === 'A') {
      setScenarioA(prev => ({ ...prev, [field]: value }));
    } else {
      setScenarioB(prev => ({ ...prev, [field]: value }));
    }
  };

  useEffect(() => {
    const calculateScenario = (s: ScenarioState) => {
      let balance = s.initial;
      let totalInvested = s.initial;
      const monthlyRate = s.rate / 100 / 12;
      const months = s.years * 12;
      const points: { total: number; invested: number; interest: number }[] = [];

      // Initial point
      points.push({ total: s.initial, invested: s.initial, interest: 0 });

      for (let i = 1; i <= months; i++) {
        balance = (balance + s.monthly) * (1 + monthlyRate);
        totalInvested += s.monthly;

        if (i % 12 === 0) {
          points.push({
            total: Math.round(balance),
            invested: Math.round(totalInvested),
            interest: Math.round(balance - totalInvested)
          });
        }
      }
      return points;
    };

    const pointsA = calculateScenario(scenarioA);
    
    // For comparison, we need to handle different timeframes
    // But for simplicity in charting, we'll extend the shorter one horizontally or just cut off?
    // Let's use the max years from either scenario to determine chart length.
    const pointsB = isComparing ? calculateScenario(scenarioB) : [];
    
    const maxYears = isComparing ? Math.max(scenarioA.years, scenarioB.years) : scenarioA.years;
    const chartData: InvestmentData[] = [];

    // Combine data
    for (let year = 0; year <= maxYears; year++) {
      const pointA = pointsA[year];
      const pointB = pointsB[year];
      
      chartData.push({
        year,
        totalA: pointA ? pointA.total : pointsA[pointsA.length - 1]?.total || 0,
        investedA: pointA ? pointA.invested : pointsA[pointsA.length - 1]?.invested || 0,
        interestA: pointA ? pointA.interest : pointsA[pointsA.length - 1]?.interest || 0,
        ...(isComparing && {
          totalB: pointB ? pointB.total : pointsB[pointsB.length - 1]?.total || 0,
          investedB: pointB ? pointB.invested : pointsB[pointsB.length - 1]?.invested || 0,
          interestB: pointB ? pointB.interest : pointsB[pointsB.length - 1]?.interest || 0,
        })
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    setData(chartData);
    
    // Set final values
    const lastA = pointsA[pointsA.length - 1];
    const lastB = pointsB[pointsB.length - 1];
    
    setFinalValues({
      totalA: lastA.total,
      interestA: lastA.interest,
      totalB: lastB ? lastB.total : 0,
      interestB: lastB ? lastB.interest : 0
    });

  }, [scenarioA, scenarioB, isComparing]);

  const diffTotal = finalValues.totalB - finalValues.totalA;
  const isBBetter = diffTotal > 0;

  return (
    <>
      <Helmet>
        <title>{t('home.tools.investment.name')} - SmartCalc</title>
        <meta name="description" content={t('home.tools.investment.desc')} />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <TrendingUp className="w-8 h-8 text-emerald-500" />
            {t('home.tools.investment.name')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {t('home.tools.investment.desc')}
          </p>
        </div>

        {/* Comparison Toggle */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsComparing(!isComparing)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${
              isComparing
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 ring-2 ring-indigo-500'
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <Split className="w-4 h-4" />
            {isComparing ? 'Comparison Mode Active' : 'Enable Comparison Mode'}
          </button>
        </div>

        <div className={`grid grid-cols-1 ${isComparing ? 'xl:grid-cols-2' : 'lg:grid-cols-3'} gap-8 transition-all`}>
          {/* Input Section */}
          <div className={`${isComparing ? 'xl:col-span-2 grid md:grid-cols-2 gap-6' : 'lg:col-span-1'} space-y-6 transition-all`}>
            
            {/* Scenario A Inputs */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                {isComparing && <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Scenario A</span>}
                {t('forms.sections.investment')}
              </h2>
              
              <div className="space-y-4">
                <CalculatorInput
                  label={t('forms.labels.initial_inv')}
                  icon={DollarSign}
                  value={scenarioA.initial}
                  onChange={(v) => updateScenario('A', 'initial', v)}
                />
                <CalculatorInput
                  label={t('forms.labels.monthly_contrib')}
                  icon={Calendar}
                  value={scenarioA.monthly}
                  onChange={(v) => updateScenario('A', 'monthly', v)}
                />
                <CalculatorInput
                  label={t('forms.labels.return_rate')}
                  icon={Percent}
                  value={scenarioA.rate}
                  step="0.1"
                  onChange={(v) => updateScenario('A', 'rate', v)}
                />
                <CalculatorInput
                  label={t('forms.labels.years_grow')}
                  icon={Calendar}
                  value={scenarioA.years}
                  onChange={(v) => updateScenario('A', 'years', v)}
                />
              </div>
            </div>

            {/* Scenario B Inputs */}
            {isComparing && (
               <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">Scenario B</span>
                  Comparison
                </h2>
                
                <div className="space-y-4">
                  <CalculatorInput
                    label={t('forms.labels.initial_inv')}
                    icon={DollarSign}
                    value={scenarioB.initial}
                    onChange={(v) => updateScenario('B', 'initial', v)}
                  />
                  <CalculatorInput
                    label={t('forms.labels.monthly_contrib')}
                    icon={Calendar}
                    value={scenarioB.monthly}
                    onChange={(v) => updateScenario('B', 'monthly', v)}
                  />
                  <CalculatorInput
                    label={t('forms.labels.return_rate')}
                    icon={Percent}
                    value={scenarioB.rate}
                    step="0.1"
                    onChange={(v) => updateScenario('B', 'rate', v)}
                  />
                  <CalculatorInput
                    label={t('forms.labels.years_grow')}
                    icon={Calendar}
                    value={scenarioB.years}
                    onChange={(v) => updateScenario('B', 'years', v)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className={`${isComparing ? 'xl:col-span-2' : 'lg:col-span-2'} space-y-8`}>
            
            {/* Comparison Summary Banner */}
            {isComparing && (
              <div className={`p-6 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
                isBBetter 
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800' 
                  : 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    isBBetter ? 'bg-indigo-100 text-indigo-600' : 'bg-emerald-100 text-emerald-600'
                  }`}>
                    {isBBetter ? <TrendingUp className="w-6 h-6" /> : <DollarSign className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {isBBetter ? 'Scenario B Wins!' : 'Scenario A Wins!'}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Difference of <strong>${Math.abs(diffTotal).toLocaleString()}</strong> after {Math.max(scenarioA.years, scenarioB.years)} years.
                    </p>
                  </div>
                </div>
                <div className="text-right hidden md:block">
                   <div className="text-sm text-gray-500">Total Difference</div>
                   <div className={`text-2xl font-bold ${isBBetter ? 'text-indigo-600' : 'text-emerald-600'}`}>
                      {diffTotal > 0 ? '+' : '-'}${Math.abs(diffTotal).toLocaleString()}
                   </div>
                </div>
              </div>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Scenario A Card */}
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800 text-center relative overflow-hidden">
                {isComparing && <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>}
                <h3 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                  {isComparing ? 'Scenario A Total' : t('results.future_value')}
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  ${finalValues.totalA.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Interest: ${finalValues.interestA.toLocaleString()}
                </p>
              </div>

              {/* Scenario B Card (Only shown in comparison, or repurposed for Interest in single mode) */}
              {!isComparing ? (
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 text-center">
                  <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{t('results.total_interest')}</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    ${finalValues.interestA.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                </div>
              ) : (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800 text-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
                  <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                    Scenario B Total
                  </h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                    ${finalValues.totalB.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Interest: ${finalValues.interestB.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-500" />
                Growth Over Time
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTotalA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorTotalB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <Tooltip 
                      formatter={(value: ValueType | undefined, name: NameType | undefined) => {
                        if (value === undefined) return ['', name];
                        const numericValue = Number(Array.isArray(value) ? value[0] : value);
                        const formatted = `$${(numericValue || 0).toLocaleString()}`;
                        if (name === 'totalA') return [formatted, 'Scenario A Total'];
                        if (name === 'totalB') return [formatted, 'Scenario B Total'];
                        if (name === 'investedA') return [formatted, 'Scenario A Principal'];
                        return [formatted, name];
                      }}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                    />

                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="totalA" 
                      name={isComparing ? "Scenario A" : "Total Value"}
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorTotalA)" 
                    />
                    {isComparing && (
                      <Area 
                        type="monotone" 
                        dataKey="totalB" 
                        name="Scenario B" 
                        stroke="#6366f1" 
                        fillOpacity={0.5} 
                        fill="url(#colorTotalB)" 
                      />
                    )}
                    {!isComparing && (
                        <Area 
                        type="monotone" 
                        dataKey="investedA" 
                        name="Principal Invested" 
                        stroke="#3b82f6" 
                        fillOpacity={0} 
                        fill="transparent" 
                        strokeDasharray="5 5"
                        />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">The Power of Compound Interest</h4>
              <p>
                Compound interest helps your money grow faster because you earn interest on both the money you save and the interest that money earns.
                {isComparing ? ' Comparison mode allows you to visualize how small changes in contribution or rate affect long-term wealth.' : ' Detailed planning now can lead to exponential growth in the future.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
