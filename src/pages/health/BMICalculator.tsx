import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Activity, Scale, Ruler } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { useTranslation } from 'react-i18next';

export default function BMICalculator() {
  const { t } = useTranslation();
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [height, setHeight] = useState<string>(''); // cm or ft
  const [heightInches, setHeightInches] = useState<string>(''); // inches for imperial
  const [weight, setWeight] = useState<string>(''); // kg or lbs
  
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const h_in = parseFloat(heightInches);

    if (isNaN(w)) return;

    let calculatedBmi = 0;

    if (unit === 'metric') {
      if (isNaN(h) || h <= 0) return;
      // BMI = kg / (m^2)
      calculatedBmi = w / Math.pow(h / 100, 2);
    } else {
      // BMI = 703 * lbs / (inches^2)
      const totalInches = (h * 12) + (isNaN(h_in) ? 0 : h_in);
      if (totalInches <= 0) return;
      calculatedBmi = 703 * w / Math.pow(totalInches, 2);
    }

    setBmi(calculatedBmi);
    determineCategory(calculatedBmi);
  };

  const determineCategory = (value: number) => {
    if (value < 18.5) setCategory(t('results.categories.underweight'));
    else if (value < 25) setCategory(t('results.categories.normal'));
    else if (value < 30) setCategory(t('results.categories.overweight'));
    else setCategory(t('results.categories.obese'));
  };

  const data = [
    { name: t('results.categories.underweight'), value: 18.5, color: '#3b82f6' },
    { name: t('results.categories.normal'), value: 6.5, color: '#22c55e' }, // 18.5-25 range size
    { name: t('results.categories.overweight'), value: 5, color: '#eab308' }, // 25-30 range size
    { name: t('results.categories.obese'), value: 10, color: '#ef4444' }, // 30+ range
  ];

  return (
    <>
      <Helmet>
        <title>{t('home.tools.bmi.name')} - SmartCalc</title>
        <meta name="description" content={t('home.tools.bmi.desc')} />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Activity className="w-8 h-8 text-red-500" />
            {t('home.tools.bmi.name')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
             {t('home.tools.bmi.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            
            {/* Unit Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-6">
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${unit === 'metric' ? 'bg-white dark:bg-gray-600 shadow text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setUnit('metric')}
              >
                {t('common.metric')} (kg/cm)
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${unit === 'imperial' ? 'bg-white dark:bg-gray-600 shadow text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setUnit('imperial')}
              >
                {t('common.imperial')} (lbs/ft)
              </button>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {unit === 'metric' ? t('forms.labels.height_cm') : t('forms.labels.height_ft')}
                </label>
                <div className="flex gap-4">
                  <div className="relative w-full">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="number"
                      placeholder={unit === 'metric' ? "175" : "5"}
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                  </div>
                  {unit === 'imperial' && (
                    <div className="relative w-full">
                       <input
                        type="number"
                        placeholder="9"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">in</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {unit === 'metric' ? t('forms.labels.weight_kg') : t('forms.labels.weight_lb')}
                </label>
                <div className="relative">
                  <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    placeholder={unit === 'metric' ? "70" : "154"}
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={calculateBMI}
                className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary-500/30"
              >
                {t('common.calculate')}
              </button>
            </div>
          </div>

          {/* Result Section */}
          <div className="flex flex-col justify-center space-y-6">
            {bmi !== null ? (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm text-center relative overflow-hidden">
                <h3 className="text-gray-500 dark:text-gray-400 uppercase tracking-widest text-sm font-semibold mb-2">{t('results.bmi_score')}</h3>
                <div className="text-6xl font-black text-gray-900 dark:text-white mb-2 relative z-10">
                  {bmi.toFixed(1)}
                </div>
                <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-4 ${
                  category === t('results.categories.normal') ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                  category === t('results.categories.overweight') ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {category}
                </div>

                {/* Gauge Chart */}
                <div className="h-[150px] w-full mt-4 flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm relative z-10">
                  {category === t('results.categories.normal') 
                    ? "Great job! Your BMI indicates a healthy weight." 
                    : "Maintaining a healthy weight is important for reducing the risk of chronic diseases."}
                </p>
              </div>
            ) : (
                <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center h-full">
                    <Activity className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-400 dark:text-gray-500">Enter your height and weight to see your result.</p>
                </div>
            )}
            
            {/* Simple Legend/Char Placeholder */}
            {bmi !== null && (
                 <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h4 className="font-semibold text-sm mb-3 text-gray-700 dark:text-gray-300">BMI Categories</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-blue-500">{t('results.categories.underweight')}</span> <span>&lt; 18.5</span></div>
                        <div className="flex justify-between"><span className="text-green-500">{t('results.categories.normal')}</span> <span>18.5 - 24.9</span></div>
                        <div className="flex justify-between"><span className="text-yellow-500">{t('results.categories.overweight')}</span> <span>25 - 29.9</span></div>
                        <div className="flex justify-between"><span className="text-red-500">{t('results.categories.obese')}</span> <span>&gt; 30</span></div>
                    </div>
                 </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
