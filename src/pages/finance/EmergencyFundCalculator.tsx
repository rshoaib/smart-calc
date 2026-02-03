import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldAlert, DollarSign, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from 'recharts';

export default function EmergencyFundCalculator() {
  const { t } = useTranslation();
  
  // State for expenses
  const [essentialExpenses, setEssentialExpenses] = useState<number>(2000);
  const [optionalExpenses, setOptionalExpenses] = useState<number>(500);
  const [currentSavings, setCurrentSavings] = useState<number>(5000);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('medium');

  // Calculation Results
  const [targetFund, setTargetFund] = useState<number>(0);
  const [monthsOfFreedom, setMonthsOfFreedom] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // Determine target months based on risk
    const targetMonths = riskLevel === 'low' ? 3 : riskLevel === 'medium' ? 6 : 9;
    const totalMonthly = essentialExpenses + optionalExpenses;
    
    // Safety check to avoid division by zero
    const calculatedTarget = totalMonthly * targetMonths;
    const calculatedFreedom = totalMonthly > 0 ? currentSavings / totalMonthly : 0;
    
    // Prevent NaN
    const calculatedProgress = calculatedTarget > 0 ? Math.min((currentSavings / calculatedTarget) * 100, 100) : 0;

    setTargetFund(calculatedTarget);
    setMonthsOfFreedom(calculatedFreedom);
    setProgress(calculatedProgress);

  }, [essentialExpenses, optionalExpenses, currentSavings, riskLevel]);

  const pieData = [
    { name: t('emergency.essential'), value: essentialExpenses },
    { name: t('emergency.optional'), value: optionalExpenses },
  ].filter(d => d.value > 0);

  const COLORS = ['#ef4444', '#3b82f6']; // Red for essential, Blue for optional

  return (
    <>
      <Helmet>
        <title>{t('home.tools.emergency.name')} - SmartCalc</title>
        <meta name="description" content={t('home.tools.emergency.desc')} />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <ShieldAlert className="w-8 h-8 text-amber-500" />
            {t('home.tools.emergency.name')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {t('home.tools.emergency.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('forms.sections.expenses')}</h2>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('forms.labels.essential_expenses')}
                <span className="text-xs text-gray-500 block font-normal">{t('emergency.essential_hint')}</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={essentialExpenses}
                  onChange={(e) => setEssentialExpenses(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('forms.labels.optional_expenses')}
                <span className="text-xs text-gray-500 block font-normal">{t('emergency.optional_hint')}</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={optionalExpenses}
                  onChange={(e) => setOptionalExpenses(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.current_savings')}</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.risk_level')}</label>
              <div className="grid grid-cols-3 gap-2">
                {(['low', 'medium', 'high'] as const).map((level) => (
                    <button
                        key={level}
                        onClick={() => setRiskLevel(level)}
                        className={`py-2 px-2 text-sm rounded-lg border transition-all ${
                            riskLevel === level
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        {t(`emergency.risk.${level}`)}
                    </button>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                {riskLevel === 'low' && t('emergency.risk_desc.low')}
                {riskLevel === 'medium' && t('emergency.risk_desc.medium')}
                {riskLevel === 'high' && t('emergency.risk_desc.high')}
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-800 text-center">
                <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">{t('emergency.target_fund')}</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  ${targetFund.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {riskLevel === 'low' ? '3' : riskLevel === 'medium' ? '6' : '9'} {t('results.months')}
                </p>
              </div>
              
              <div className={`p-6 rounded-2xl border text-center ${
                  monthsOfFreedom >= (riskLevel === 'low' ? 3 : riskLevel === 'medium' ? 6 : 9)
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800'
              }`}>
                <h3 className={`text-sm font-semibold uppercase tracking-wide ${
                     monthsOfFreedom >= (riskLevel === 'low' ? 3 : riskLevel === 'medium' ? 6 : 9)
                     ? 'text-emerald-600 dark:text-emerald-400'
                     : 'text-blue-600 dark:text-blue-400'
                }`}>
                    {t('emergency.months_freedom')}
                </h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {monthsOfFreedom.toFixed(1)} {t('results.months')}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                    {monthsOfFreedom < 1 
                        ? t('emergency.status_danger') 
                        : monthsOfFreedom < 3 
                        ? t('emergency.status_warning') 
                        : t('emergency.status_good')}
                </p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('emergency.progress')}</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{progress.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                    <div 
                        className={`h-4 rounded-full transition-all duration-500 ${
                            progress >= 100 ? 'bg-emerald-500' : 
                            progress >= 50 ? 'bg-blue-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${progress}%` }} 
                    />
                </div>
                {progress < 100 && (
                    <p className="text-sm text-gray-500 mt-2 text-center">
                        {t('emergency.gap_message', { amount: (targetFund - currentSavings).toLocaleString() })}
                    </p>
                )}
            </div>

            {/* Expense Breakdown */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-gray-500" />
                {t('emergency.expense_breakdown')}
              </h3>
              <div className="h-[250px] w-full flex items-center justify-center">
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
                      {pieData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                        formatter={(value?: number) => [`$${Number(value || 0).toLocaleString()}`, '']}
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-4 ml-8">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div>
                            <p className="text-xs text-gray-500 uppercase">{t('emergency.essential')}</p>
                            <p className="font-bold text-gray-900 dark:text-white">${essentialExpenses.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500" />
                        <div>
                            <p className="text-xs text-gray-500 uppercase">{t('emergency.optional')}</p>
                            <p className="font-bold text-gray-900 dark:text-white">${optionalExpenses.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
