'use client';

import { useState, useMemo } from 'react';
import { Disclaimer } from '@/components/Disclaimer';
import { Clock } from 'lucide-react';

interface DayEntry {
    label: string;
    inTime: string;
    outTime: string;
    breakMin: number;
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const fmtCurrency = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });

function diffHours(inTime: string, outTime: string, breakMin: number): number {
    if (!inTime || !outTime) return 0;
    const [ih, im] = inTime.split(':').map(Number);
    const [oh, om] = outTime.split(':').map(Number);
    let mins = (oh * 60 + om) - (ih * 60 + im) - breakMin;
    if (mins < 0) mins += 24 * 60; // overnight shift
    return Math.max(0, mins / 60);
}

export default function TimeCardCalculator() {
    const [days, setDays] = useState<DayEntry[]>(
        DAYS.map((d) => ({ label: d, inTime: d === 'Sat' || d === 'Sun' ? '' : '09:00', outTime: d === 'Sat' || d === 'Sun' ? '' : '17:00', breakMin: 30 }))
    );
    const [hourlyRate, setHourlyRate] = useState(25);
    const [otThreshold, setOtThreshold] = useState(40);
    const [otMultiplier, setOtMultiplier] = useState(1.5);

    const update = (i: number, patch: Partial<DayEntry>) =>
        setDays((d) => d.map((e, j) => (j === i ? { ...e, ...patch } : e)));

    const { perDay, totalHours, regularHours, otHours, regularPay, otPay, totalPay } = useMemo(() => {
        const perDay = days.map((d) => diffHours(d.inTime, d.outTime, d.breakMin));
        const totalHours = perDay.reduce((s, h) => s + h, 0);
        const regularHours = Math.min(totalHours, otThreshold);
        const otHours = Math.max(0, totalHours - otThreshold);
        const regularPay = regularHours * hourlyRate;
        const otPay = otHours * hourlyRate * otMultiplier;
        return { perDay, totalHours, regularHours, otHours, regularPay, otPay, totalPay: regularPay + otPay };
    }, [days, hourlyRate, otThreshold, otMultiplier]);

    return (
        <div className="max-w-5xl mx-auto">
            <header className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Clock className="w-10 h-10 text-orange-500" />
                    Time Card Calculator
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
                    Enter your daily clock-in and clock-out times for the week. We'll add it up, separate regular and overtime hours, and calculate your gross weekly pay.
                </p>
            </header>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <NumInput label="Hourly rate ($)" value={hourlyRate} onChange={setHourlyRate} />
                    <NumInput label="OT threshold (hrs/wk)" value={otThreshold} onChange={setOtThreshold} />
                    <NumInput label="OT multiplier (×)" value={otMultiplier} onChange={setOtMultiplier} step={0.25} />
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                                <th className="py-2 px-2">Day</th>
                                <th className="py-2 px-2">In</th>
                                <th className="py-2 px-2">Out</th>
                                <th className="py-2 px-2">Break (min)</th>
                                <th className="py-2 px-2 text-right">Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                            {days.map((d, i) => (
                                <tr key={d.label} className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="py-2 px-2 font-semibold">{d.label}</td>
                                    <td className="py-2 px-2"><input type="time" value={d.inTime} onChange={(e) => update(i, { inTime: e.target.value })} className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900" /></td>
                                    <td className="py-2 px-2"><input type="time" value={d.outTime} onChange={(e) => update(i, { outTime: e.target.value })} className="px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900" /></td>
                                    <td className="py-2 px-2"><input type="number" min={0} value={d.breakMin} onChange={(e) => update(i, { breakMin: Number(e.target.value) || 0 })} className="w-20 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900" /></td>
                                    <td className="py-2 px-2 text-right font-mono">{perDay[i].toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-800">
                    <h2 className="font-bold text-orange-900 dark:text-orange-100 mb-3">Hours summary</h2>
                    <Stat label="Total hours" value={totalHours.toFixed(2)} />
                    <Stat label="Regular hours" value={regularHours.toFixed(2)} />
                    <Stat label="Overtime hours" value={otHours.toFixed(2)} />
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                    <h2 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">Gross pay</h2>
                    <Stat label="Regular pay" value={fmtCurrency(regularPay)} />
                    <Stat label="Overtime pay" value={fmtCurrency(otPay)} />
                    <div className="mt-3 pt-3 border-t border-emerald-200 dark:border-emerald-800">
                        <Stat label="Total gross" value={fmtCurrency(totalPay)} bold />
                    </div>
                </div>
            </div>

            <Disclaimer type="general" />
        </div>
    );
}

function NumInput({ label, value, onChange, step }: { label: string; value: number; onChange: (n: number) => void; step?: number }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
            <input
                type="number" min={0} step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
        </div>
    );
}
function Stat({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
    return (
        <div className="flex justify-between mb-1">
            <span className="text-sm">{label}</span>
            <span className={`font-mono ${bold ? 'font-bold text-lg' : ''}`}>{value}</span>
        </div>
    );
}
