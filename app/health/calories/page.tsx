'use client';

import { useState } from 'react';
import { Disclaimer } from '@/components/Disclaimer';
import { Heart, Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CalorieCalculator() {
  const { t } = useTranslation();
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [height, setHeight] = useState<number>(175); // cm
  const [weight, setWeight] = useState<number>(75); // kg
  const [activity, setActivity] = useState<number>(1.2);
  
  const [result, setResult] = useState<number | null>(null);

  const calculateCalories = () => {
    // Mifflin-St Jeor Equation
    let bmr = 0;
    
    // Normalized values
    let w = weight;
    let h = height;

    if (unit === 'imperial') {
       w = weight * 0.453592; // lbs to kg
       h = height * 2.54; // in to cm
    }

    if (gender === 'male') {
      bmr = (10 * w) + (6.25 * h) - (5 * age) + 5;
    } else {
      bmr = (10 * w) + (6.25 * h) - (5 * age) - 161;
    }

    const tdee = bmr * activity;
    setResult(Math.round(tdee));
  };

  const faqs = [
    { question: 'How many calories should I eat per day?', answer: 'It depends on your age, gender, height, weight, and activity level. The average adult needs 1,800-2,400 kcal/day (women) or 2,200-3,000 kcal/day (men). This calculator uses the Mifflin-St Jeor equation — the most accurate formula validated by research — to estimate your personal Total Daily Energy Expenditure (TDEE).' },
    { question: 'What is TDEE vs BMR?', answer: 'BMR (Basal Metabolic Rate) is the calories your body burns at complete rest just to keep you alive — breathing, circulation, cell production. TDEE is BMR multiplied by your activity factor (1.2 for sedentary up to 1.9 for athletes). TDEE is the number that matters for meal planning, as it represents your total daily calorie burn including all physical activity.' },
    { question: 'How do I lose weight with calorie counting?', answer: 'Create a calorie deficit of 500 kcal/day to lose about 0.5 kg (1 lb) per week, or 1,000 kcal/day for 1 kg/week. Never go below 1,200 kcal/day for women or 1,500 kcal/day for men without medical supervision. Faster weight loss risks muscle loss, nutrient deficiencies, and metabolic slowdown.' },
    { question: 'What is the Mifflin-St Jeor equation?', answer: 'The Mifflin-St Jeor equation (1990) is considered the most accurate BMR formula. For men: BMR = 10×weight(kg) + 6.25×height(cm) − 5×age + 5. For women: BMR = 10×weight(kg) + 6.25×height(cm) − 5×age − 161. It replaced the older Harris-Benedict equation and is accurate to within ±10% for most people.' },
    { question: 'How does activity level affect calorie needs?', answer: 'Your activity multiplier dramatically changes calorie requirements. Sedentary (desk job, 1.2×) vs. very active (athlete, 1.9×) can mean a difference of 1,000+ calories per day. Be honest when selecting — most people overestimate their activity level. If your weight is not changing as expected, try adjusting your activity multiplier down.' },
  ];

  return (
    <>
      <Disclaimer type="health" />

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Flame className="w-8 h-8 text-orange-500" />
            {t('home.tools.calorie.name')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
             {t('home.tools.calorie.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm h-fit">
            
            <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-6">
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

            <div className="grid grid-cols-2 gap-4 mb-6">
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

               <button
                onClick={calculateCalories}
                className="w-full py-3 px-4 mt-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-orange-500/30"
              >
                {t('common.calculate')}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {result ? (
              <>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm text-center">
                <h3 className="text-gray-500 dark:text-gray-400 uppercase tracking-widest text-sm font-semibold mb-2">{t('results.maintain_weight')}</h3>
                <div className="text-5xl font-black text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
                   {result} <span className="text-xl font-medium text-gray-500">kcal/day</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-4">
                  This is your predicted TDEE (Total Daily Energy Expenditure). Eating this amount will keep your weight stable.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800 text-center">
                     <h4 className="font-bold text-green-700 dark:text-green-400 mb-1">{t('results.loss')}</h4>
                     <div className="text-2xl font-bold text-gray-900 dark:text-white">{result - 500} <span className="text-sm font-normal">kcal</span></div>
                     <p className="text-xs text-gray-500 mt-2">-0.5 kg / week</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 text-center">
                     <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-1">{t('results.gain')}</h4>
                     <div className="text-2xl font-bold text-gray-900 dark:text-white">{result + 500} <span className="text-sm font-normal">kcal</span></div>
                     <p className="text-xs text-gray-500 mt-2">+0.5 kg / week</p>
                  </div>
              </div>
              </>
            ) : (
                <div className="h-full bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                    <Heart className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-400 dark:text-gray-500">
                        Fill in your details to see your daily <br/> calorie requirements.
                    </p>
                </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
