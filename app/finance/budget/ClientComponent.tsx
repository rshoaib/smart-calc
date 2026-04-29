'use client';

import { useState, useMemo } from 'react';
import { Disclaimer } from '@/components/Disclaimer';
import { PieChart as PieChartIcon } from 'lucide-react';

const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const NEEDS = ['Rent or mortgage', 'Utilities', 'Groceries', 'Insurance (health, auto)', 'Transportation', 'Minimum debt payments'];
const WANTS = ['Dining out', 'Streaming subscriptions', 'Hobbies', 'Travel', 'Entertainment', 'Non-essential shopping'];
const SAVINGS = ['Emergency fund', 'Retirement (401k, IRA)', 'Brokerage / index funds', 'Extra debt principal', 'Big-purchase savings (car, home)'];

export default function BudgetCalculator() {
    const [takeHome, setTakeHome] = useState(5000);
    const [needsPct, setNeedsPct] = useState(50);
    const [wantsPct, setWantsPct] = useState(30);
    const savingsPct = Math.max(0, 100 - needsPct - wantsPct);

    const allocations = useMemo(() => ({
        needs: takeHome * (needsPct / 100),
        wants: takeHome * (wantsPct / 100),
        savings: takeHome * (savingsPct / 100),
    }), [takeHome, needsPct, wantsPct, savingsPct]);

    return (
        <div className="max-w-5xl mx-auto">
            <header className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <PieChartIcon className="w-10 h-10 text-indigo-500" />
                    50/30/20 Budget Calculator
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
                    Senator Elizabeth Warren's simple-but-effective framework: 50% needs, 30% wants, 20% savings. Adjust the split to fit your life.
                </p>
            </header>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Monthly take-home pay (after tax)
                </label>
                <input
                    type="number" min={0}
                    value={takeHome}
                    onChange={(e) => setTakeHome(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-2xl font-mono"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Slider label="Needs %" value={needsPct} onChange={setNeedsPct} max={100 - wantsPct} color="indigo" />
                    <Slider label="Wants %" value={wantsPct} onChange={setWantsPct} max={100 - needsPct} color="purple" />
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Savings %</label>
                        <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-700 dark:text-emerald-300 font-bold text-lg">
                            {savingsPct}% (auto)
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <Card title="Needs" pct={needsPct} amount={allocations.needs} examples={NEEDS} color="indigo" />
                <Card title="Wants" pct={wantsPct} amount={allocations.wants} examples={WANTS} color="purple" />
                <Card title="Savings" pct={savingsPct} amount={allocations.savings} examples={SAVINGS} color="emerald" />
            </div>

            <Disclaimer />
        </div>
    );
}

function Slider({ label, value, onChange, max, color }: { label: string; value: number; onChange: (n: number) => void; max: number; color: string }) {
    return (
        <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex justify-between">
                <span>{label}</span>
                <span className={`text-${color}-600 dark:text-${color}-400 font-bold`}>{value}%</span>
            </label>
            <input
                type="range" min={0} max={max} step={1}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full"
            />
        </div>
    );
}

function Card({ title, pct, amount, examples, color }: { title: string; pct: number; amount: number; examples: string[]; color: 'indigo' | 'purple' | 'emerald' }) {
    const cls: Record<string, string> = {
        indigo: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800 text-indigo-900 dark:text-indigo-100',
        purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800 text-purple-900 dark:text-purple-100',
        emerald: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100',
    };
    const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    return (
        <div className={`p-5 rounded-2xl border ${cls[color]}`}>
            <div className="text-xs uppercase tracking-wide opacity-70 font-semibold">{title} ({pct}%)</div>
            <div className="text-3xl font-bold font-mono tabular-nums mt-1">{fmt(amount)}</div>
            <ul className="mt-4 space-y-1 text-sm opacity-80">
                {examples.map((e) => <li key={e}>• {e}</li>)}
            </ul>
        </div>
    );
}
