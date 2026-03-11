'use client';

import { useState } from 'react';
import { DollarSign, Users, Percent } from 'lucide-react';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState(50);
  const [tipPercent, setTipPercent] = useState(18);
  const [customTip, setCustomTip] = useState(false);
  const [splitCount, setSplitCount] = useState(1);

  const tipAmount = (tipPercent / 100) * billAmount;
  const totalAmount = billAmount + tipAmount;
  const perPerson = splitCount > 0 ? totalAmount / splitCount : totalAmount;
  const tipPerPerson = splitCount > 0 ? tipAmount / splitCount : tipAmount;

  const presets = [10, 15, 18, 20, 25];

  const [roundUp, setRoundUp] = useState(false);
  const roundedTotal = roundUp ? Math.ceil(totalAmount) : totalAmount;
  const roundedTip = roundUp ? roundedTotal - billAmount : tipAmount;
  const roundedPerPerson = splitCount > 0 ? roundedTotal / splitCount : roundedTotal;

  const displayTip = roundUp ? roundedTip : tipAmount;
  const displayTotal = roundUp ? roundedTotal : totalAmount;
  const displayPerPerson = roundUp ? roundedPerPerson : perPerson;
  const displayTipPerPerson = roundUp
    ? splitCount > 0 ? roundedTip / splitCount : roundedTip
    : tipPerPerson;

  const faqs = [
    { question: 'How much should I tip?', answer: '15% is considered standard for adequate service in the US, 18-20% for good service, and 25%+ for exceptional service. For takeout, 10-15% is common. In countries like Japan or South Korea, tipping is generally not expected.' },
    { question: 'How do I calculate a tip quickly in my head?', answer: 'Find 10% by moving the decimal point one place left. For 15%, add half of 10%. For 20%, double 10%. For 25%, add 10% to 15%. Example: On a $64 bill — 10% = $6.40, so 20% = $12.80.' },
    { question: 'Should I tip on the pre-tax or post-tax amount?', answer: 'Etiquette experts say tipping on the pre-tax (subtotal) amount is correct. However, many people tip on the total for simplicity. The difference is usually small (1-2%).' },
    { question: 'How do I split a tip fairly?', answer: 'Divide the total (bill + tip) evenly, or have each person tip on their own subtotal. For uneven orders, some groups calculate individual tips. Our calculator splits the total evenly for simplicity.' },
    { question: 'What is the average tip in the US?', answer: 'The average tip in US restaurants is about 18-20%. According to industry data, the national average has risen to around 19.5% in recent years. Delivery drivers typically receive 15-20%.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="general" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <DollarSign className="w-8 h-8 text-emerald-500" />
          Tip Calculator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate tips and split bills instantly — no math required.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Bill Amount */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bill Amount ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={billAmount}
                  onChange={(e) => setBillAmount(Math.max(0, Number(e.target.value)))}
                  className="w-full pl-10 pr-4 py-3 text-xl bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                />
              </div>
            </div>

            {/* Tip Presets */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tip Percentage
              </label>
              <div className="flex gap-2 flex-wrap mb-3">
                {presets.map((p) => (
                  <button
                    key={p}
                    onClick={() => { setTipPercent(p); setCustomTip(false); }}
                    className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                      tipPercent === p && !customTip
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {p}%
                  </button>
                ))}
                <button
                  onClick={() => setCustomTip(true)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    customTip
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Custom
                </button>
              </div>
              {customTip && (
                <div className="relative w-32">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={tipPercent}
                    onChange={(e) => setTipPercent(Math.max(0, Math.min(100, Number(e.target.value))))}
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                  />
                  <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
              )}
            </div>

            {/* Split Bill */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Split Between
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-gray-900 dark:text-white w-12 text-center font-mono">
                  {splitCount}
                </span>
                <button
                  onClick={() => setSplitCount(splitCount + 1)}
                  className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold text-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  +
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                  {splitCount === 1 ? 'person' : 'people'}
                </span>
              </div>
            </div>

            {/* Round Up */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={roundUp}
                onChange={(e) => setRoundUp(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Round up total to nearest dollar
              </span>
            </label>
          </div>

          {/* Results */}
          <div className="bg-emerald-600 dark:bg-emerald-700 rounded-2xl shadow-lg p-8 text-white">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-sm uppercase tracking-widest font-semibold opacity-80 mb-1">Tip Amount</div>
                <div className="text-4xl font-bold font-mono tabular-nums">
                  ${displayTip.toFixed(2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm uppercase tracking-widest font-semibold opacity-80 mb-1">Total</div>
                <div className="text-4xl font-bold font-mono tabular-nums">
                  ${displayTotal.toFixed(2)}
                </div>
              </div>
            </div>
            {splitCount > 1 && (
              <div className="mt-6 pt-6 border-t border-emerald-500/40">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-sm uppercase tracking-widest font-semibold opacity-80 mb-1">Tip / Person</div>
                    <div className="text-3xl font-bold font-mono tabular-nums">
                      ${displayTipPerPerson.toFixed(2)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm uppercase tracking-widest font-semibold opacity-80 mb-1">Total / Person</div>
                    <div className="text-3xl font-bold font-mono tabular-nums">
                      ${displayPerPerson.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Reference Table */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📊 Quick Tip Reference for ${billAmount > 0 ? billAmount.toFixed(2) : '0.00'}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                    <th className="py-2 pr-4">Tip %</th>
                    <th className="py-2 pr-4">Tip Amount</th>
                    <th className="py-2 pr-4">Total</th>
                    {splitCount > 1 && <th className="py-2">Per Person</th>}
                  </tr>
                </thead>
                <tbody className="text-gray-700 dark:text-gray-300">
                  {[10, 15, 18, 20, 25, 30].map((p) => {
                    const t = (p / 100) * billAmount;
                    const tot = billAmount + t;
                    const isActive = p === tipPercent && !customTip;
                    return (
                      <tr
                        key={p}
                        className={`border-b border-gray-100 dark:border-gray-700/50 ${isActive ? 'bg-emerald-50 dark:bg-emerald-900/20 font-medium' : ''}`}
                      >
                        <td className="py-2 pr-4">{p}%</td>
                        <td className="py-2 pr-4 font-mono">${t.toFixed(2)}</td>
                        <td className="py-2 pr-4 font-mono">${tot.toFixed(2)}</td>
                        {splitCount > 1 && (
                          <td className="py-2 font-mono">${(tot / splitCount).toFixed(2)}</td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <AdSlot className="h-24 w-full" label="Native Ad" />

          {/* FAQ */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              ❓ Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group">
                  <summary className="cursor-pointer font-medium text-gray-800 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pl-4 border-l-2 border-emerald-200 dark:border-emerald-800">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-800">
              <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                💡 Quick Mental Math
              </h3>
              <ul className="space-y-2 text-sm text-amber-800 dark:text-amber-200">
                <li><strong>10%</strong> — Move decimal left one place</li>
                <li><strong>15%</strong> — 10% + half of 10%</li>
                <li><strong>20%</strong> — Double the 10%</li>
                <li><strong>25%</strong> — Divide bill by 4</li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                🌍 Tipping Guide by Country
              </h3>
              <ul className="space-y-1.5 text-sm text-blue-800 dark:text-blue-200">
                <li>🇺🇸 USA — 15-25%</li>
                <li>🇨🇦 Canada — 15-20%</li>
                <li>🇬🇧 UK — 10-15% (service charge often included)</li>
                <li>🇪🇺 Europe — 5-10% or round up</li>
                <li>🇯🇵 Japan — Not expected</li>
                <li>🇦🇺 Australia — Not expected (but appreciated)</li>
              </ul>
            </div>

            <AdSlot className="h-[600px] w-full" label="Sidebar Skyscraper" />
          </div>
        </div>
      </div>
    </div>
  );
}
