'use client';

import Link from 'next/link';
import {
    Activity, Heart, Utensils, Dumbbell, Moon, HeartPulse
} from 'lucide-react';

const healthTools = [
    { name: 'BMI Calculator', desc: 'Calculate your Body Mass Index with WHO health classifications.', icon: Activity, path: '/health/bmi', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
    { name: 'Calorie Calculator', desc: 'Find your daily calorie needs based on activity level and goals.', icon: Heart, path: '/health/calories', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    { name: 'Macro Split Calculator', desc: 'Get your ideal protein, carbs, and fat ratios for your goals.', icon: Utensils, path: '/health/macro-split', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { name: 'Heart Rate Zones', desc: 'Calculate target heart rate zones for optimal training intensity.', icon: HeartPulse, path: '/health/heart-rate', color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20' },
    { name: 'Sleep Cycle Calculator', desc: 'Optimize your bedtime to wake up refreshed based on 90-minute cycles.', icon: Moon, path: '/health/sleep', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { name: 'One Rep Max (1RM)', desc: 'Estimate your max lift from submaximal loads for safe progression.', icon: Dumbbell, path: '/health/1rm', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
];

export default function HealthLanding() {

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                    <Heart className="inline w-10 h-10 text-red-500 mr-2 -mt-1" />
                    Health & Fitness Calculators
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Data-driven tools to optimize your health, fitness, and recovery. No account required. Your data stays in your browser.
                </p>
            </div>

            {/* Featured Guide */}
            <Link href="/health/wellness-guide"
                className="block mb-10 p-6 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow"
            >
                <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-6 h-6 text-yellow-300" />
                    <h2 className="text-xl font-bold">✨ Total Wellness Optimization Guide</h2>
                </div>
                <p className="text-teal-100 text-sm">
                    A comprehensive guide to balancing nutrition, exercise, sleep, and mental health for peak performance.
                </p>
            </Link>

            {/* Calculator Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {healthTools.map((tool) => (
                    <Link
                        key={tool.name}
                        href={tool.path}
                        className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                    >
                        <div className={`absolute top-6 right-6 p-3 rounded-xl ${tool.bg} ${tool.color}`}>
                            <tool.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 pr-14">
                            {tool.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {tool.desc}
                        </p>
                    </Link>
                ))}
            </div>

            {/* Productivity CTA */}
            <div className="mt-10 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h2 className="font-bold text-gray-900 dark:text-white mb-3 text-center">⚡ Productivity</h2>
                <div className="flex justify-center">
                    <Link href="/productivity/pomodoro"
                        className="inline-flex items-center gap-2 px-5 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg font-medium hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                    >
                        🍅 Pomodoro Timer
                    </Link>
                </div>
            </div>

            {/* Blog CTA */}
            <div className="mt-6 text-center">
                <Link href="/blog" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                    Read our health & sleep guides on the Blog →
                </Link>
            </div>
        </div>
    );
}
