'use client';

import { useState, useMemo } from 'react';
import { Disclaimer } from '@/components/Disclaimer';
import { Wallet, TrendingDown, TrendingUp } from 'lucide-react';

type NumKey = 'cash' | 'investments' | 'retirement' | 'realEstate' | 'vehicles' | 'otherAssets'
    | 'mortgage' | 'autoLoans' | 'studentLoans' | 'creditCards' | 'otherDebt';

const ASSET_FIELDS: { key: NumKey; label: string; help?: string }[] = [
    { key: 'cash', label: 'Cash & savings', help: 'Checking, savings, money market.' },
    { key: 'investments', label: 'Taxable investments', help: 'Brokerage accounts, stocks, ETFs, crypto.' },
    { key: 'retirement', label: 'Retirement accounts', help: '401(k), IRA, Roth, pension PV.' },
    { key: 'realEstate', label: 'Real estate value', help: 'Current market value of homes you own.' },
    { key: 'vehicles', label: 'Vehicles', help: 'Resale value, not original price.' },
    { key: 'otherAssets', label: 'Other assets', help: 'Business equity, jewelry, collectibles.' },
];
const LIABILITY_FIELDS: { key: NumKey; label: string; help?: string }[] = [
    { key: 'mortgage', label: 'Mortgage balance', help: 'Remaining principal owed.' },
    { key: 'autoLoans', label: 'Auto loans' },
    { key: 'studentLoans', label: 'Student loans' },
    { key: 'creditCards', label: 'Credit cards' },
    { key: 'otherDebt', label: 'Other debt', help: 'Personal loans, medical debt, family loans.' },
];

const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function NetWorthCalculator() {
    const [vals, setVals] = useState<Record<NumKey, number>>({
        cash: 5000, investments: 25000, retirement: 50000, realEstate: 350000, vehicles: 15000, otherAssets: 0,
        mortgage: 280000, autoLoans: 8000, studentLoans: 12000, creditCards: 3000, otherDebt: 0,
    });
    const set = (k: NumKey) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setVals((v) => ({ ...v, [k]: Number(e.target.value) || 0 }));

    const { totalAssets, totalLiabilities, netWorth, assetBreakdown, liabilityBreakdown } = useMemo(() => {
        const totalAssets = ASSET_FIELDS.reduce((s, f) => s + vals[f.key], 0);
        const totalLiabilities = LIABILITY_FIELDS.reduce((s, f) => s + vals[f.key], 0);
        const netWorth = totalAssets - totalLiabilities;
        const assetBreakdown = ASSET_FIELDS.map((f) => ({
            label: f.label,
            value: vals[f.key],
            pct: totalAssets > 0 ? (vals[f.key] / totalAssets) * 100 : 0,
        })).filter((a) => a.value > 0);
        const liabilityBreakdown = LIABILITY_FIELDS.map((f) => ({
            label: f.label,
            value: vals[f.key],
            pct: totalLiabilities > 0 ? (vals[f.key] / totalLiabilities) * 100 : 0,
        })).filter((l) => l.value > 0);
        return { totalAssets, totalLiabilities, netWorth, assetBreakdown, liabilityBreakdown };
    }, [vals]);

    const positive = netWorth >= 0;

    return (
        <div className="max-w-5xl mx-auto">
            <header className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Wallet className="w-10 h-10 text-emerald-500" />
                    Net Worth Calculator
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
                    Add up everything you own and subtract everything you owe. Track this number once a quarter and you have an honest picture of whether you're getting wealthier.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                    <h2 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" /> Assets (what you own)
                    </h2>
                    <div className="space-y-3">
                        {ASSET_FIELDS.map((f) => (
                            <div key={f.key}>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex justify-between">
                                    <span>{f.label}</span>
                                    {f.help && <span className="text-xs text-gray-400 italic">{f.help}</span>}
                                </label>
                                <input
                                    type="number" min={0}
                                    value={vals[f.key]}
                                    onChange={set(f.key)}
                                    className="w-full mt-1 px-3 py-2 rounded-lg border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-2xl border border-rose-100 dark:border-rose-800">
                    <h2 className="text-lg font-bold text-rose-900 dark:text-rose-100 mb-4 flex items-center gap-2">
                        <TrendingDown className="w-5 h-5" /> Liabilities (what you owe)
                    </h2>
                    <div className="space-y-3">
                        {LIABILITY_FIELDS.map((f) => (
                            <div key={f.key}>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex justify-between">
                                    <span>{f.label}</span>
                                    {f.help && <span className="text-xs text-gray-400 italic">{f.help}</span>}
                                </label>
                                <input
                                    type="number" min={0}
                                    value={vals[f.key]}
                                    onChange={set(f.key)}
                                    className="w-full mt-1 px-3 py-2 rounded-lg border border-rose-200 dark:border-rose-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`mt-8 p-8 rounded-2xl text-center text-white shadow-lg ${positive ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-gradient-to-r from-rose-600 to-pink-600'}`}>
                <div className="text-sm uppercase tracking-widest opacity-80 mb-2">Net Worth</div>
                <div className="text-5xl md:text-6xl font-bold font-mono tabular-nums">{fmt(netWorth)}</div>
                <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                    <div>
                        <div className="opacity-80">Total Assets</div>
                        <div className="text-xl font-bold">{fmt(totalAssets)}</div>
                    </div>
                    <div>
                        <div className="opacity-80">Total Liabilities</div>
                        <div className="text-xl font-bold">{fmt(totalLiabilities)}</div>
                    </div>
                </div>
            </div>

            {(assetBreakdown.length > 0 || liabilityBreakdown.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Asset breakdown</h3>
                        {assetBreakdown.map((a) => (
                            <div key={a.label} className="mb-2">
                                <div className="flex justify-between text-sm">
                                    <span>{a.label}</span>
                                    <span className="font-mono">{fmt(a.value)} ({a.pct.toFixed(0)}%)</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${a.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Liability breakdown</h3>
                        {liabilityBreakdown.map((l) => (
                            <div key={l.label} className="mb-2">
                                <div className="flex justify-between text-sm">
                                    <span>{l.label}</span>
                                    <span className="font-mono">{fmt(l.value)} ({l.pct.toFixed(0)}%)</span>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                                    <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${l.pct}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Disclaimer />
        </div>
    );
}
