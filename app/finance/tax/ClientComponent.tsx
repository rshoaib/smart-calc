'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calculator, DollarSign, PieChart as PieChartIcon, AlignLeft } from 'lucide-react';
import { calculateFederalTaxes, FilingStatus } from '@/data/taxBrackets2025';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

const COLORS = ['#10b981', '#ef4444']; // Green for Net Pay, Red for Taxes

export default function TaxCalculator() {
  const [grossIncomeStr, setGrossIncomeStr] = useState('75000');
  const [filingStatus, setFilingStatus] = useState<FilingStatus>('single');

  const grossIncome = parseFloat(grossIncomeStr) || 0;

  // Run the massive calculation
  const results = useMemo(() => calculateFederalTaxes(grossIncome, filingStatus), [grossIncome, filingStatus]);

  const pieData = [
    { name: 'Net Pay (After Taxes)', value: results.netIncome },
    { name: 'Federal Taxes Owed', value: results.totalTaxOwed },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-7xl mx-auto">
      {/* LEFT COLUMN - INPUTS */}
      <div className="lg:col-span-4 space-y-6">
        <Card className="bg-white dark:bg-gray-800 shadow-xl border-gray-100 dark:border-gray-700/60 sticky top-6">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-t-xl text-white">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-200" />
              <CardTitle>Tax Simulator</CardTitle>
            </div>
            <CardDescription className="text-emerald-100">
              Estimate your 2025/2026 Federal Income Taxes
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Gross Annual Income
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  min="0"
                  value={grossIncomeStr}
                  onChange={(e) => setGrossIncomeStr(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  placeholder="75000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Filing Status
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFilingStatus('single')}
                  className={`py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                    filingStatus === 'single'
                      ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500 shadow-sm dark:bg-emerald-900/40 dark:text-emerald-300'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  Single
                </button>
                <button
                  onClick={() => setFilingStatus('married_jointly')}
                  className={`py-2 px-4 rounded-xl text-sm font-medium transition-all ${
                    filingStatus === 'married_jointly'
                      ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500 shadow-sm dark:bg-emerald-900/40 dark:text-emerald-300'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700'
                  }`}
                >
                  Married Jointly
                </button>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">Standard Deduction Applied:</p>
              <p className="text-xl font-bold text-yellow-900 dark:text-yellow-100 mt-1">
                ${results.standardDeduction.toLocaleString()}
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                Automatically deducted from your gross income.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT COLUMN - RESULTS & CHARTS */}
      <div className="lg:col-span-8 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700/60">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Estimated Federal Tax</h3>
              <p className="text-3xl font-extrabold text-red-600 dark:text-red-400">
                ${Math.round(results.totalTaxOwed).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Effective Rate: <span className="font-bold">{(results.effectiveRate * 100).toFixed(1)}%</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700/60 md:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Estimated Net Pay (After Fed Tax)</h3>
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                ${Math.round(results.netIncome).toLocaleString()}
              </p>
              <div className="flex gap-4 mt-2">
                <p className="text-sm text-gray-500">
                  Monthly: <span className="font-bold">${Math.round(results.netIncome / 12).toLocaleString()}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Marginal Bracket: <span className="font-bold">{(results.marginalRate * 100).toFixed(0)}%</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visualizations and Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-indigo-500" />
                Income Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value: any) => ['$' + Math.round(Number(value)).toLocaleString(), '']}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlignLeft className="w-5 h-5 text-cyan-500" />
                Tax Bracket Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {results.bracketsUsed.map((bracket, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        {(bracket.rate * 100).toFixed(0)}% Bracket
                      </p>
                      <p className="text-xs text-gray-500">
                        ${Math.round(bracket.amountTaxable).toLocaleString()} taxed
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-red-600 dark:text-red-400">
                        + ${Math.round(bracket.taxOwed).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {results.bracketsUsed.length === 0 && (
                  <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <p className="text-green-800 dark:text-green-300 font-medium">No Federal Tax Owed!</p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">Your income is covered entirely by the standard deduction.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
