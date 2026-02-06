import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Utensils } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface MacroResult {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
}

export default function MacroCalculator() {
  const { t } = useTranslation();
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [height, setHeight] = useState<number>(175);
  const [weight, setWeight] = useState<number>(75);
  const [activity, setActivity] = useState<number>(1.2);
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [diet, setDiet] = useState<'balanced' | 'low_carb' | 'high_protein' | 'keto'>('balanced');
  
  const [result, setResult] = useState<MacroResult | null>(null);

  useEffect(() => {
    const calculateMacros = () => {
      // 1. Calculate BMR (Mifflin-St Jeor)
      let w = weight;
      let h = height;

      if (unit === 'imperial') {
         w = weight * 0.453592; // lbs to kg
         h = height * 2.54; // in to cm
      }

      let bmr = 0;
      if (gender === 'male') {
        bmr = (10 * w) + (6.25 * h) - (5 * age) + 5;
      } else {
        bmr = (10 * w) + (6.25 * h) - (5 * age) - 161;
      }

      // 2. TDEE
      let tdee = bmr * activity;

      // 3. Goal Adjustment
      if (goal === 'lose') tdee -= 500;
      if (goal === 'gain') tdee += 500;

      // 4. Macro Ratios
      let pRatio = 0.3;
      let cRatio = 0.4;
      let fRatio = 0.3;

      switch (diet) {
          case 'balanced': // 30P / 40C / 30F
              pRatio = 0.3; cRatio = 0.4; fRatio = 0.3;
              break;
          case 'low_carb': // 40P / 20C / 40F
              pRatio = 0.4; cRatio = 0.2; fRatio = 0.4;
              break;
          case 'high_protein': // 50P / 30C / 20F
              pRatio = 0.5; cRatio = 0.3; fRatio = 0.2;
              break;
          case 'keto': // 25P / 5C / 70F
              pRatio = 0.25; cRatio = 0.05; fRatio = 0.7;
              break;
      }

      const protein = Math.round((tdee * pRatio) / 4);
      const carbs = Math.round((tdee * cRatio) / 4);
      const fats = Math.round((tdee * fRatio) / 9);

      setResult({
          protein,
          carbs,
          fats,
          calories: Math.round(tdee)
      });
    };

    calculateMacros();
  }, [unit, gender, age, height, weight, activity, goal, diet]);

  const data = result ? [
    { name: t('results.macros.protein'), value: result.protein, color: '#3b82f6' }, // Blue
    { name: t('results.macros.carbs'), value: result.carbs, color: '#10b981' },    // Green
    { name: t('results.macros.fats'), value: result.fats, color: '#eab308' },      // Yellow
  ] : [];

  return (
    <>
      <Helmet>
        <title>{t('home.tools.macro_split.name')} - SmartCalc</title>
        <meta name="description" content={t('home.tools.macro_split.desc')} />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Utensils className="w-8 h-8 text-green-600" />
            {t('home.tools.macro_split.name')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
             {t('home.tools.macro_split.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
            
             {/* Unit Toggle */}
             <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${unit === 'metric' ? 'bg-white dark:bg-gray-600 shadow text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setUnit('metric')}
              >
                {t('common.metric')}
              </button>
              <button
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${unit === 'imperial' ? 'bg-white dark:bg-gray-600 shadow text-primary-600 dark:text-primary-400' : 'text-gray-500 dark:text-gray-400'}`}
                onClick={() => setUnit('imperial')}
              >
                {t('common.imperial')}
              </button>
            </div>

            {/* Gender */}
            <div className="grid grid-cols-2 gap-4">
               <button
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border ${gender === 'male' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600' : 'border-gray-200 dark:border-gray-700 text-gray-500'}`}
                  onClick={() => setGender('male')}
               >
                 <span>{t('forms.options.male')}</span>
               </button>
               <button
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl border ${gender === 'female' ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-600' : 'border-gray-200 dark:border-gray-700 text-gray-500'}`}
                  onClick={() => setGender('female')}
               >
                 <span>{t('forms.options.female')}</span>
               </button>
            </div>

            <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.age')}</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {unit === 'metric' ? t('forms.labels.weight_kg') : t('forms.labels.weight_lb')}
                    </label>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
               </div>

               <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {unit === 'metric' ? t('forms.labels.height_cm') : t('forms.labels.height_in')}
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  />
               </div>

               <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.activity_level')}</label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value={1.2}>{t('forms.options.sedentary')}</option>
                    <option value={1.375}>{t('forms.options.light')}</option>
                    <option value={1.55}>{t('forms.options.moderate')}</option>
                    <option value={1.725}>{t('forms.options.heavy')}</option>
                    <option value={1.9}>{t('forms.options.athlete')}</option>
                  </select>
               </div>

               <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.goal')}</label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value as 'lose' | 'maintain' | 'gain')}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="lose">{t('forms.options.lose_weight')}</option>
                    <option value="maintain">{t('forms.options.maintain_weight')}</option>
                    <option value="gain">{t('forms.options.gain_muscle')}</option>
                  </select>
               </div>

               <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.diet_type')}</label>
                  <select
                    value={diet}
                    onChange={(e) => setDiet(e.target.value as 'balanced' | 'low_carb' | 'high_protein' | 'keto')}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="balanced">{t('forms.options.balanced')}</option>
                    <option value="low_carb">{t('forms.options.low_carb')}</option>
                    <option value="high_protein">{t('forms.options.high_protein')}</option>
                    <option value="keto">{t('forms.options.keto')}</option>
                  </select>
               </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
             {result && (
                <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center">
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                     </div>
                     
                     <div className="flex flex-col gap-4 justify-center">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
                             <h3 className="text-gray-500 dark:text-gray-400 uppercase tracking-widest text-sm font-semibold mb-2">Total Calories</h3>
                             <div className="text-4xl font-black text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
                                {result.calories.toLocaleString('en-US')} <span className="text-xl font-medium text-gray-500">kcal</span>
                             </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center border border-blue-100 dark:border-blue-800">
                                <span className="block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase mb-1">{t('results.macros.protein')}</span>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">{result.protein}g</span>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center border border-green-100 dark:border-green-800">
                                <span className="block text-xs font-bold text-green-600 dark:text-green-400 uppercase mb-1">{t('results.macros.carbs')}</span>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">{result.carbs}g</span>
                            </div>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl text-center border border-yellow-100 dark:border-yellow-800">
                                <span className="block text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase mb-1">{t('results.macros.fats')}</span>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">{result.fats}g</span>
                            </div>
                        </div>
                     </div>
                </div>
                </>
             )}
          </div>
        </div>
      </div>
    </>
  );
}
