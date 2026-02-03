import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Dumbbell, Activity, Scale, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface RepData {
  percentage: number;
  weight: number;
  reps: number;
}

export default function OneRepMaxCalculator() {
  const { t } = useTranslation();
  
  // State
  const [liftWeight, setLiftWeight] = useState<number>(100);
  const [reps, setReps] = useState<number>(5);
  const [formula, setFormula] = useState<'epley' | 'brzycki'>('epley');
  const [unit, setUnit] = useState<'kg' | 'lbs'>('lbs');

  // Results
  const [oneRepMax, setOneRepMax] = useState<number>(0);
  const [trainingTable, setTrainingTable] = useState<RepData[]>([]);

  useEffect(() => {
    const calculate1RM = () => {
        let max = 0;
        
        if (reps === 1) {
            max = liftWeight;
        } else if (formula === 'epley') {
            // Epley Formula: w * (1 + r/30)
            max = liftWeight * (1 + reps / 30);
        } else {
            // Brzycki Formula: w / (1.0278 - 0.0278 * r)
            max = liftWeight / (1.0278 - 0.0278 * reps);
        }

        const calculatedMax = Math.round(max);
        setOneRepMax(calculatedMax);

        // Generate Training Table
        const table: RepData[] = [];
        const percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50];
        
        // Approximate reps for percentages (standard estimates)
        const repEstimates: Record<number, number> = {
            95: 2, 90: 4, 85: 6, 80: 8, 75: 10, 70: 12, 65: 15, 60: 20, 55: 24, 50: 30
        };

        percentages.forEach(pct => {
            table.push({
                percentage: pct,
                weight: Math.round(calculatedMax * (pct / 100)),
                reps: repEstimates[pct] || 0
            });
        });

        setTrainingTable(table);
    };

    if (liftWeight > 0 && reps > 0) {
        calculate1RM();
    }
  }, [liftWeight, reps, formula]);

  return (
    <>
      <Helmet>
        <title>{t('home.tools.orm.name')} - SmartCalc</title>
        <meta name="description" content={t('home.tools.orm.desc')} />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Dumbbell className="w-8 h-8 text-indigo-600" />
            {t('home.tools.orm.name')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {t('home.tools.orm.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
            
            {/* Unit Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-6">
                <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${unit === 'lbs' ? 'bg-white dark:bg-gray-600 shadow text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setUnit('lbs')}
                >
                LBS
                </button>
                <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${unit === 'kg' ? 'bg-white dark:bg-gray-600 shadow text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setUnit('kg')}
                >
                KG
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('orm.lift_details')}</h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('orm.weight_lifted')} ({unit})
              </label>
              <div className="relative">
                <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={liftWeight}
                  onChange={(e) => setLiftWeight(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('orm.repetitions')}
                <span className="text-xs text-gray-500 block font-normal">{t('orm.reps_hint')}</span>
              </label>
              <div className="relative">
                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('orm.formula')}</label>
              <select
                value={formula}
                onChange={(e) => setFormula(e.target.value as 'epley' | 'brzycki')}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="epley">Epley (Standard)</option>
                <option value="brzycki">Brzycki (Better for higher reps)</option>
              </select>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Result */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800 text-center relative overflow-hidden">
                <Trophy className="absolute top-4 right-4 w-16 h-16 text-indigo-200 dark:text-indigo-800/30 rotate-12" />
                <h3 className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mb-2">{t('orm.estimated_max')}</h3>
                <p className="text-5xl font-black text-gray-900 dark:text-white">
                  {oneRepMax} <span className="text-2xl font-medium text-gray-500">{unit}</span>
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4">{t('orm.training_percentages')}</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={trainingTable.slice(0, 5)} layout="vertical" margin={{ left: 10, right: 30 }}>
                            <XAxis type="number" hide />
                            <YAxis dataKey="percentage" type="category" width={40} tickFormatter={(val) => `${val}%`} />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                                formatter={(value: number | undefined) => [`${value} ${unit}`, 'Weight']}
                            />
                            <Bar dataKey="weight" radius={[0, 4, 4, 0]}>
                                {trainingTable.slice(0, 5).map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'][index]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-3">{t('orm.percentage')}</th>
                            <th className="px-6 py-3">{t('orm.weight')} ({unit})</th>
                            <th className="px-6 py-3">{t('orm.reps')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {trainingTable.map((row) => (
                            <tr key={row.percentage} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">{row.percentage}%</td>
                                <td className="px-6 py-3 font-bold text-indigo-600 dark:text-indigo-400">{row.weight}</td>
                                <td className="px-6 py-3 text-gray-500 dark:text-gray-400">~{row.reps}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
