'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Percent, Hash } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';

type Mode = 'whatIsXofY' | 'xIsWhatOfY' | 'change';

export default function PercentageCalculator() {
  const { t } = useTranslation();

  const [mode, setMode] = useState<Mode>('whatIsXofY');

  // Mode 1: What is X% of Y?
  const [percentOf, setPercentOf] = useState(25);
  const [ofValue, setOfValue] = useState(200);

  // Mode 2: X is what % of Y?
  const [partValue, setPartValue] = useState(50);
  const [wholeValue, setWholeValue] = useState(200);

  // Mode 3: % change from X to Y
  const [fromValue, setFromValue] = useState(100);
  const [toValue, setToValue] = useState(150);

  const [result, setResult] = useState<string>('');

  useEffect(() => {
    calculate();
  }, [mode, percentOf, ofValue, partValue, wholeValue, fromValue, toValue]);

  const calculate = () => {
    switch (mode) {
      case 'whatIsXofY': {
        const res = (percentOf / 100) * ofValue;
        setResult(res.toLocaleString('en-US', { maximumFractionDigits: 4 }));
        break;
      }
      case 'xIsWhatOfY': {
        const res = wholeValue !== 0 ? (partValue / wholeValue) * 100 : 0;
        setResult(res.toLocaleString('en-US', { maximumFractionDigits: 4 }) + '%');
        break;
      }
      case 'change': {
        const res = fromValue !== 0 ? ((toValue - fromValue) / Math.abs(fromValue)) * 100 : 0;
        const sign = res >= 0 ? '+' : '';
        setResult(sign + res.toLocaleString('en-US', { maximumFractionDigits: 4 }) + '%');
        break;
      }
    }
  };

  const modes: { key: Mode; label: string }[] = [
    { key: 'whatIsXofY', label: t('percentage.mode_of', 'X% of Y') },
    { key: 'xIsWhatOfY', label: t('percentage.mode_what', 'X is ?% of Y') },
    { key: 'change', label: t('percentage.mode_change', '% Change') },
  ];

  const faqs = [
    { question: 'How do I calculate a percentage?', answer: 'To find X% of Y, multiply Y by X/100. For example, 20% of 150 = 150 × 0.20 = 30. To find what percent X is of Y, divide X by Y and multiply by 100. For example, 30 is what percent of 150? → (30/150) × 100 = 20%. These two operations are inverses of each other.' },
    { question: 'How do I calculate percentage change?', answer: 'Percentage change = ((New Value − Old Value) / |Old Value|) × 100. A positive result is an increase, negative is a decrease. For example, a price going from $100 to $150 is a +50% increase. Going from $150 back to $100 is a −33.3% decrease (not −50%, because the base changed). This asymmetry is a common mistake.' },
    { question: 'How do I calculate a tip?', answer: 'Multiply the bill by the tip percentage. For a 15% tip on $50: $50 × 0.15 = $7.50. For 20%: $50 × 0.20 = $10. Quick mental math trick: find 10% (move the decimal left one place), then adjust — for 15%, add half of 10%; for 20%, double the 10% amount.' },
    { question: 'What is the difference between markup and margin?', answer: 'Markup is the percentage added to cost to get the selling price: ((Price − Cost) / Cost) × 100. Margin is the percentage of the selling price that is profit: ((Price − Cost) / Price) × 100. Example: cost $60, price $100 → markup = 66.7%, margin = 40%. Margin is always smaller than markup for the same transaction.' },
    { question: 'Why can\'t I just add and subtract percentages?', answer: 'Percentages don\'t add linearly because they refer to different base values. A 50% increase followed by a 50% decrease does NOT return to the original: $100 + 50% = $150, then $150 − 50% = $75 (a net 25% loss). Similarly, a 10% discount on a 10% discount is not 20% off — it is 19% off ($100 × 0.90 × 0.90 = $81).' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="general" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Percent className="w-8 h-8 text-cyan-500" />
          {t('percentage.title', 'Percentage Calculator')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('percentage.subtitle', 'Three ways to calculate percentages — instantly.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Mode Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex gap-2 mb-8">
              {modes.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    mode === m.key
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Mode 1 */}
            {mode === 'whatIsXofY' && (
              <div className="space-y-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
                  {t('percentage.q_of', 'What is X% of Y?')}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{t('percentage.what_is', 'What is')}</span>
                  <div className="relative w-28">
                    <input
                      type="number"
                      value={percentOf}
                      onChange={(e) => setPercentOf(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                    <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{t('percentage.of', 'of')}</span>
                  <div className="relative w-36">
                    <input
                      type="number"
                      value={ofValue}
                      onChange={(e) => setOfValue(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                    <Hash className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">?</span>
                </div>
              </div>
            )}

            {/* Mode 2 */}
            {mode === 'xIsWhatOfY' && (
              <div className="space-y-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
                  {t('percentage.q_what', 'X is what percent of Y?')}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="relative w-36">
                    <input
                      type="number"
                      value={partValue}
                      onChange={(e) => setPartValue(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {t('percentage.is_what_of', 'is what % of')}
                  </span>
                  <div className="relative w-36">
                    <input
                      type="number"
                      value={wholeValue}
                      onChange={(e) => setWholeValue(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">?</span>
                </div>
              </div>
            )}

            {/* Mode 3 */}
            {mode === 'change' && (
              <div className="space-y-4">
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
                  {t('percentage.q_change', 'What is the percentage change from X to Y?')}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{t('percentage.from', 'From')}</span>
                  <div className="relative w-36">
                    <input
                      type="number"
                      value={fromValue}
                      onChange={(e) => setFromValue(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{t('percentage.to', 'to')}</span>
                  <div className="relative w-36">
                    <input
                      type="number"
                      value={toValue}
                      onChange={(e) => setToValue(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
                    />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 font-medium">?</span>
                </div>
              </div>
            )}
          </div>

          {/* Result Card */}
          <div className="bg-cyan-600 dark:bg-cyan-700 rounded-2xl shadow-lg p-8 text-center text-white">
            <div className="text-sm uppercase tracking-widest font-semibold opacity-80 mb-2">
              {t('percentage.answer', 'Answer')}
            </div>
            <div className="text-6xl md:text-7xl font-bold font-mono tabular-nums">
              {result}
            </div>
          </div>

          <AdSlot className="h-24 w-full" label="Native Ad" />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                {t('percentage.formulas', '📐 Percentage Formulas')}
              </h3>
              <ul className="space-y-3 text-sm text-blue-800 dark:text-blue-200">
                <li>
                  <strong>X% of Y</strong> = (X / 100) × Y
                </li>
                <li>
                  <strong>X is ?% of Y</strong> = (X / Y) × 100
                </li>
                <li>
                  <strong>% Change</strong> = ((New − Old) / |Old|) × 100
                </li>
              </ul>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-emerald-100 dark:border-emerald-800">
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                {t('percentage.common_title', '🔢 Common Percentages')}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-emerald-800 dark:text-emerald-200">
                <span>10% of 100 = 10</span>
                <span>15% tip on $50 = $7.50</span>
                <span>20% off $80 = $64</span>
                <span>25% of 200 = 50</span>
                <span>50% of 300 = 150</span>
                <span>8.25% tax on $100 = $8.25</span>
              </div>
            </div>

            <AdSlot className="h-[600px] w-full" label="Sidebar Skyscraper" />
          </div>
        </div>
      </div>
    </div>
  );
}
