import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { User, Save, TrendingUp, Calendar, Target } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/userStore';

export default function Dashboard() {
  const { t } = useTranslation();
  const profile = useUserStore();
  const [formData, setFormData] = useState(profile);
  const [isDirty, setIsDirty] = useState(false);

  // Sync form with store when store updates (initial load)
  useEffect(() => {
    setFormData(profile);
  }, [profile.age]); // Basic dep check

  const handleChange = (field: keyof typeof profile, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: Number(value)
    }));
    setIsDirty(true);
  };

  const handleSave = () => {
    profile.updateProfile(formData);
    setIsDirty(false);
  };

  // Simple "Financial Health" metrics
  const projectedNetWorth = formData.currentSavings * Math.pow(1.07, 10); // 10 years @ 7%
  const retirementGap = formData.retirementAge - formData.age;

  return (
    <>
      <Helmet>
        <title>{t('nav.dashboard', 'My Smart Profile')} - SmartCalc</title>
      </Helmet>

      <div className="space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <User className="w-8 h-8 text-indigo-500" />
                    {t('nav.dashboard', 'My Smart Profile')}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Manage your financial data in one place. Changes here update all calculators.
                </p>
            </div>
            
            <button 
                onClick={handleSave}
                disabled={!isDirty}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                    isDirty 
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white translate-y-0' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
            >
                <Save className="w-5 h-5" />
                {t('common.save', 'Save Changes')}
            </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quick Stats */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-2 opacity-90">
                        <TrendingUp className="w-5 h-5" />
                        <span className="font-medium">Projected Net Worth (10y)</span>
                    </div>
                    <div className="text-3xl font-bold">
                        ${Math.round(projectedNetWorth).toLocaleString()}
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2 text-gray-500 dark:text-gray-400">
                        <Calendar className="w-5 h-5" />
                        <span className="font-medium">Years to Retirement</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {Math.max(0, retirementGap)} <span className="text-base font-normal text-gray-400">years</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-2 text-gray-500 dark:text-gray-400">
                        <Target className="w-5 h-5" />
                        <span className="font-medium">Savings Rate</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {Math.round((formData.monthlyContribution * 12 / formData.annualIncome) * 100)}%
                    </div>
                </div>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Personal Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Age</label>
                        <input 
                            type="number" 
                            value={formData.age}
                            onChange={(e) => handleChange('age', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Retirement Age</label>
                        <input 
                            type="number" 
                            value={formData.retirementAge}
                            onChange={(e) => handleChange('retirementAge', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Annual Income ($)</label>
                        <input 
                            type="number" 
                            value={formData.annualIncome}
                            onChange={(e) => handleChange('annualIncome', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Savings ($)</label>
                        <input 
                            type="number" 
                            value={formData.currentSavings}
                            onChange={(e) => handleChange('currentSavings', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Monthly Contribution ($)</label>
                        <input 
                            type="number" 
                            value={formData.monthlyContribution}
                            onChange={(e) => handleChange('monthlyContribution', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Safe Withdrawal Rate (%)</label>
                        <input 
                            type="number" 
                            step="0.1"
                            value={formData.safeWithdrawalRate}
                            onChange={(e) => handleChange('safeWithdrawalRate', e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                    <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-2">Why use a profile?</h3>
                    <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed">
                        Instead of typing your income and savings into every single calculator, save it here. 
                        We'll securely store it on your device and auto-fill it everywhere.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
