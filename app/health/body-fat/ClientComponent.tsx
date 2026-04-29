'use client';

import { useState, useMemo } from 'react';
import { Disclaimer } from '@/components/Disclaimer';
import { Activity } from 'lucide-react';

type Gender = 'male' | 'female';
type Unit = 'imperial' | 'metric';

const fmt1 = (n: number) => n.toFixed(1);

// US Navy body fat method (uses log10 of body measurements in inches/cm)
function navyBodyFat({ gender, heightIn, neckIn, waistIn, hipIn }: {
    gender: Gender; heightIn: number; neckIn: number; waistIn: number; hipIn?: number;
}): number {
    if (gender === 'male') {
        // 86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76
        return 86.010 * Math.log10(waistIn - neckIn) - 70.041 * Math.log10(heightIn) + 36.76;
    }
    if (!hipIn) return 0;
    // 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387
    return 163.205 * Math.log10(waistIn + (hipIn || 0) - neckIn) - 97.684 * Math.log10(heightIn) - 78.387;
}

function category(bf: number, gender: Gender): { label: string; color: string } {
    const ranges = gender === 'male'
        ? [
            { max: 5, label: 'Essential fat', color: 'text-blue-500' },
            { max: 13, label: 'Athletic', color: 'text-emerald-500' },
            { max: 17, label: 'Fitness', color: 'text-teal-500' },
            { max: 24, label: 'Average', color: 'text-amber-500' },
            { max: Infinity, label: 'Above average', color: 'text-rose-500' },
        ]
        : [
            { max: 13, label: 'Essential fat', color: 'text-blue-500' },
            { max: 20, label: 'Athletic', color: 'text-emerald-500' },
            { max: 24, label: 'Fitness', color: 'text-teal-500' },
            { max: 31, label: 'Average', color: 'text-amber-500' },
            { max: Infinity, label: 'Above average', color: 'text-rose-500' },
        ];
    return ranges.find((r) => bf < r.max) ?? ranges[ranges.length - 1];
}

const cmToIn = (cm: number) => cm / 2.54;

export default function BodyFatCalculator() {
    const [gender, setGender] = useState<Gender>('male');
    const [unit, setUnit] = useState<Unit>('imperial');
    const [height, setHeight] = useState(70); // in or cm
    const [neck, setNeck] = useState(15);
    const [waist, setWaist] = useState(34);
    const [hip, setHip] = useState(38);
    const [weight, setWeight] = useState(170); // lbs or kg

    const result = useMemo(() => {
        const heightIn = unit === 'imperial' ? height : cmToIn(height);
        const neckIn = unit === 'imperial' ? neck : cmToIn(neck);
        const waistIn = unit === 'imperial' ? waist : cmToIn(waist);
        const hipIn = unit === 'imperial' ? hip : cmToIn(hip);
        if (heightIn <= 0 || neckIn <= 0 || waistIn <= neckIn) return null;
        const bf = navyBodyFat({ gender, heightIn, neckIn, waistIn, hipIn: gender === 'female' ? hipIn : undefined });
        if (!isFinite(bf) || bf <= 0 || bf > 60) return null;
        const fatMass = (weight * bf) / 100;
        const leanMass = weight - fatMass;
        const cat = category(bf, gender);
        return { bf, fatMass, leanMass, cat };
    }, [gender, unit, height, neck, waist, hip, weight]);

    return (
        <div className="max-w-4xl mx-auto">
            <header className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Activity className="w-10 h-10 text-rose-500" />
                    Body Fat Calculator (US Navy Method)
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
                    Estimate body fat percentage using the US Navy circumference method. Just a tape measure required — accurate within ±3-4% for most people.
                </p>
            </header>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-3 mb-4">
                    <Toggle label="Male" active={gender === 'male'} onClick={() => setGender('male')} />
                    <Toggle label="Female" active={gender === 'female'} onClick={() => setGender('female')} />
                    <span className="ml-auto" />
                    <Toggle label="Imperial (in / lbs)" active={unit === 'imperial'} onClick={() => setUnit('imperial')} />
                    <Toggle label="Metric (cm / kg)" active={unit === 'metric'} onClick={() => setUnit('metric')} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <NumIn label={`Height (${unit === 'imperial' ? 'in' : 'cm'})`} value={height} onChange={setHeight} step={0.1} />
                    <NumIn label={`Neck (${unit === 'imperial' ? 'in' : 'cm'})`} value={neck} onChange={setNeck} step={0.1} />
                    <NumIn label={`Waist (${unit === 'imperial' ? 'in' : 'cm'})`} value={waist} onChange={setWaist} step={0.1} />
                    {gender === 'female' && (
                        <NumIn label={`Hip (${unit === 'imperial' ? 'in' : 'cm'})`} value={hip} onChange={setHip} step={0.1} />
                    )}
                    <NumIn label={`Weight (${unit === 'imperial' ? 'lbs' : 'kg'})`} value={weight} onChange={setWeight} step={0.5} />
                </div>
            </div>

            {result && (
                <div className="mt-6 p-8 bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl text-white shadow-lg text-center">
                    <div className="text-sm uppercase tracking-widest opacity-80 mb-2">Body Fat</div>
                    <div className="text-6xl font-bold font-mono tabular-nums">{fmt1(result.bf)}%</div>
                    <div className={`text-lg font-semibold mt-2 ${result.cat.color.replace('text-', 'text-white opacity-100 ')}`}>{result.cat.label}</div>
                    <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                        <div>
                            <div className="opacity-80">Fat mass</div>
                            <div className="text-xl font-bold">{fmt1(result.fatMass)} {unit === 'imperial' ? 'lbs' : 'kg'}</div>
                        </div>
                        <div>
                            <div className="opacity-80">Lean mass</div>
                            <div className="text-xl font-bold">{fmt1(result.leanMass)} {unit === 'imperial' ? 'lbs' : 'kg'}</div>
                        </div>
                    </div>
                </div>
            )}

            <Disclaimer type="health" />
        </div>
    );
}

function Toggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${active ? 'bg-rose-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'}`}
        >
            {label}
        </button>
    );
}
function NumIn({ label, value, onChange, step }: { label: string; value: number; onChange: (n: number) => void; step?: number }) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{label}</label>
            <input
                type="number" min={0} step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
            />
        </div>
    );
}
