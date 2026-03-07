'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Heart, Activity, Moon, Utensils, ArrowRight, Zap, Scale } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';

export default function WellnessHubPage() {
  const { t } = useTranslation();

  const faqs = [
    {
        question: "How do I calculate my macros?",
        answer: "First, determine your TDEE (Total Daily Energy Expenditure). Then, split your calories based on your goal. A common split for muscle gain is 40% Protein, 30% Fat, 30% Carbs."
    },
    {
        question: "What is a good heart rate zone for fat loss?",
        answer: "Zone 2 (60-70% of Max Heart Rate) is often cited as the 'Fat Burning Zone' because the body primarily uses fat for fuel at this intensity."
    },
    {
        question: "How much sleep do I really need?",
        answer: "Most adults need 7-9 hours of sleep. However, quality matters more than quantity. Aim for 5-6 full 90-minute sleep cycles."
    },
    {
        question: "Is BMI accurate?",
        answer: "BMI is a useful screening tool for the general population but can be inaccurate for athletes with high muscle mass, as it doesn't distinguish between muscle and fat."
    }
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl overflow-hidden shadow-xl mb-12 text-white p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t('wellness_hub.hero_title', 'Optimize Your Body & Mind')}
            </h1>
            <p className="text-lg md:text-xl text-teal-50 mb-8 leading-relaxed">
                {t('wellness_hub.hero_subtitle', 'Health isn\'t about guessing. It\'s about data. Use our precision tools to dial in your nutrition, training, and recovery for peak performance.')}
            </p>
            <Link href="/health/calories"
                className="inline-flex items-center gap-2 bg-white text-teal-600 px-6 py-3 rounded-full font-bold text-lg hover:bg-teal-50 transition-colors"
            >
                {t('wellness_hub.start_journey', 'Calculate Your Needs')}
                <ArrowRight className="w-5 h-5" />
            </Link>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-12 hidden md:block"></div>
        <div className="absolute right-0 bottom-0 h-1/2 w-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        <Activity className="absolute right-8 bottom-8 w-32 h-32 text-white/20 hidden md:block" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
            
            {/* Step 1: Nutrition */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Utensils className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl text-amber-600 dark:text-amber-400 font-bold text-xl">01</div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Dial in Nutrition</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        You can't out-train a bad diet. Whether you want to lose fat or build muscle, it starts with knowing your numbers.
                    </p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                         <Link href="/health/calories" className="block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 transition-colors bg-gray-50 dark:bg-gray-900">
                            <Utensils className="w-6 h-6 text-amber-500 mb-2" />
                            <div className="font-semibold text-gray-900 dark:text-white">TDEE & Calories</div>
                            <div className="text-xs text-gray-500">Find your baseline</div>
                        </Link>
                        <Link href="/health/macro-split" className="block p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-amber-500 dark:hover:border-amber-500 transition-colors bg-gray-50 dark:bg-gray-900">
                            <Scale className="w-6 h-6 text-orange-500 mb-2" />
                            <div className="font-semibold text-gray-900 dark:text-white">Macro Split</div>
                            <div className="text-xs text-gray-500">Protein, Carbs, Fats</div>
                        </Link>
                    </div>
                </div>
            </section>

             {/* Ad */}
             <AdSlot className="w-full h-32" label="In-Article Ad" />

             {/* Step 2: Training */}
             <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Zap className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl text-red-600 dark:text-red-400 font-bold text-xl">02</div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Train Smarter</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Intensity matters. Make sure you're training in the right heart rate zones to achieve your specific goals, from fat burning to VO2 max improvement.
                    </p>
                    
                    <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-800 mb-6 flex items-center gap-4">
                        <Heart className="w-10 h-10 text-red-500" />
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white">Heart Rate Zones</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Calculate your 5 training zones based on your resting heart rate (Karvonen formula).
                            </p>
                        </div>
                    </div>
                     <Link href="/health/heart-rate" className="text-red-600 dark:text-red-400 font-bold hover:underline inline-flex items-center gap-1">
                        Calculate Zones <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* Step 3: Recovery */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                 <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Moon className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl text-indigo-600 dark:text-indigo-400 font-bold text-xl">03</div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Master Recovery</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                        Growth happens when you rest, not when you train. Syncing your sleep with your natural circadian rhythm (90-minute ultadian cycles) ensures you wake up energized.
                    </p>
                    
                    <Link href="/health/sleep" className="inline-block w-full text-center py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none">
                        Find Your Sleep Window
                    </Link>
                </div>
            </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-24">
                <div className="bg-teal-50 dark:bg-teal-900/20 rounded-2xl p-6 border border-teal-100 dark:border-teal-800 mb-8">
                    <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-4">Quick Tools</h3>
                    <ul className="space-y-3">
                         <li>
                            <Link href="/health/bmi" className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                                <Activity className="w-5 h-5 text-blue-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">BMI Calculator</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/health/1rm" className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                                <Zap className="w-5 h-5 text-red-500" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">1 Rep Max</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <AdSlot className="h-[600px] w-full" label="Sidebar Skyscraper" />
            </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="mt-16 bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 border border-gray-100 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                        {faq.answer}
                    </p>
                </div>
            ))}
        </div>
      </section>

      <Disclaimer type="health" />
    </div>
  );
}
