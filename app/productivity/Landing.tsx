'use client';

import Link from 'next/link';
import {
    Zap, Timer, ArrowLeftRight, Users, Percent,
    GraduationCap, Keyboard, FileText, Calendar
} from 'lucide-react';

const productivityTools = [
    { name: 'Pomodoro Timer', desc: 'Boost focus with customizable work & break intervals.', icon: Timer, path: '/productivity/pomodoro', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
    { name: 'Salary ↔ Hourly Converter', desc: 'Convert annual salary to hourly wage and vice versa.', icon: ArrowLeftRight, path: '/productivity/salary-hourly', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20' },
    { name: 'Meeting Cost Calculator', desc: 'Track the real-time cost of your meetings.', icon: Users, path: '/productivity/meeting-cost', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    { name: 'Percentage Calculator', desc: 'Three ways to calculate percentages instantly.', icon: Percent, path: '/productivity/percentage', color: 'text-cyan-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
    { name: 'GPA Calculator', desc: 'Calculate your cumulative GPA on a 4.0 scale.', icon: GraduationCap, path: '/productivity/gpa', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { name: 'Typing Speed Test', desc: 'Measure your typing speed (WPM) and accuracy.', icon: Keyboard, path: '/productivity/typing-speed', color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20' },
    { name: 'Word & Character Counter', desc: 'Count words, characters, and estimate your reading time instantly.', icon: FileText, path: '/productivity/word-counter', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20' },
    { name: 'Age Calculator', desc: 'Calculate your exact age in years, months, and days.', icon: Calendar, path: '/productivity/age', color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20' },
];

export default function ProductivityLanding() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
                    <Zap className="inline w-10 h-10 text-orange-500 mr-2 -mt-1" />
                    Productivity Tools
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Work smarter with free, instant tools designed to save you time and boost your efficiency. No sign-ups. No data collection.
                </p>
            </div>

            {/* Tool Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productivityTools.map((tool) => (
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

            {/* Blog CTA */}
            <div className="mt-10 text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h2 className="font-bold text-gray-900 dark:text-white mb-2">📚 Learn More</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Explore our blog for tips on productivity, time management, and working smarter.
                </p>
                <Link href="/blog" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
                    Visit the Blog →
                </Link>
            </div>
        </div>
    );
}
