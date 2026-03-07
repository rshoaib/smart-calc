'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, Clock, Calendar, ArrowLeftRight } from 'lucide-react';
import { CalculatorInput } from '@/components/CalculatorInput';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';

export default function SalaryHourlyConverter() {
  const { t } = useTranslation();

  const [mode, setMode] = useState<'salary' | 'hourly'>('salary');
  const [annualSalary, setAnnualSalary] = useState(60000);
  const [hourlyRate, setHourlyRate] = useState(30);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);

  // Results
  const [results, setResults] = useState({
    annual: 0,
    monthly: 0,
    biweekly: 0,
    weekly: 0,
    daily: 0,
    hourly: 0,
  });

  useEffect(() => {
    calculate();
  }, [mode, annualSalary, hourlyRate, hoursPerWeek, weeksPerYear]);

  const calculate = () => {
    const totalHoursPerYear = hoursPerWeek * weeksPerYear;
    let annual: number;

    if (mode === 'salary') {
      annual = annualSalary;
    } else {
      annual = hourlyRate * totalHoursPerYear;
    }

    const hourly = totalHoursPerYear > 0 ? annual / totalHoursPerYear : 0;
    const monthly = annual / 12;
    const biweekly = annual / 26;
    const weekly = weeksPerYear > 0 ? annual / weeksPerYear : 0;
    const daily = weeksPerYear > 0 ? annual / (weeksPerYear * 5) : 0;

    setResults({ annual, monthly, biweekly, weekly, daily, hourly });
  };

  const fmt = (val: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(val);

  const faqs = [
    { question: 'How do I convert salary to hourly rate?', answer: 'Divide your annual salary by the number of work hours per year. For a standard 40-hour week with 52 weeks: $60,000 / 2,080 = $28.85/hour. If you take 2 weeks unpaid vacation, divide by 2,000 instead. Quick shortcut: drop three zeros from salary and divide by 2 — e.g., $60K → 60/2 = $30/hr (close approximation).' },
    { question: 'How many work hours are in a year?', answer: 'A standard full-time year is 2,080 hours (40 hours × 52 weeks). Accounting for 10 federal holidays = 2,000 hours. With 2 weeks vacation + holidays = 1,920 hours. An average knowledge worker actually works about 1,750-1,800 productive hours/year when accounting for meetings, breaks, and admin time.' },
    { question: 'Is hourly or salary better?', answer: 'Salary provides income stability, often includes benefits (health, 401k, PTO), and may offer career advancement. Hourly workers earn legally mandated overtime pay (1.5× after 40 hours in the US under FLSA), so overtime-heavy roles can earn more hourly. The better option depends on your expected work hours, benefits package, and whether your employer pays overtime.' },
    { question: 'How do I calculate my true hourly rate as a freelancer?', answer: 'Freelancers must account for self-employment tax (15.3% in the US), health insurance, retirement contributions, unpaid time off, equipment, and non-billable hours (marketing, admin). A common formula: target income × 1.3 (taxes) × 1.2 (overhead) ÷ billable hours. A $60K target often requires charging $45-55/hour to net the equivalent of a $60K salary with benefits.' },
    { question: 'How much are employee benefits worth?', answer: 'Benefits typically add 25-40% to base salary value. Health insurance averages $7,700 (single) to $22,000 (family) per year from employer contributions. 401(k) match of 3-6% of salary, PTO worth 5-8% of salary, and other benefits (dental, vision, life insurance, disability) add up. A $60K salary with full benefits is often worth $78K-$84K in total compensation.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="general" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <ArrowLeftRight className="w-8 h-8 text-violet-500" />
          {t('salary_hourly.title', 'Salary ↔ Hourly Converter')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('salary_hourly.subtitle', 'Instantly convert between annual salary and hourly wage.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {/* Mode Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setMode('salary')}
                className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  mode === 'salary'
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {t('salary_hourly.from_salary', 'Salary → Hourly')}
              </button>
              <button
                onClick={() => setMode('hourly')}
                className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                  mode === 'hourly'
                    ? 'bg-violet-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {t('salary_hourly.from_hourly', 'Hourly → Salary')}
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {mode === 'salary' ? (
                <CalculatorInput
                  label={t('salary_hourly.annual_salary', 'Annual Salary')}
                  value={annualSalary}
                  onChange={setAnnualSalary}
                  min={0}
                  max={10000000}
                  step={1000}
                  icon={DollarSign}
                  helpText={t('salary_hourly.salary_help', 'Your gross annual salary before taxes.')}
                />
              ) : (
                <CalculatorInput
                  label={t('salary_hourly.hourly_rate', 'Hourly Rate')}
                  value={hourlyRate}
                  onChange={setHourlyRate}
                  min={0}
                  max={10000}
                  step={0.5}
                  icon={DollarSign}
                  helpText={t('salary_hourly.hourly_help', 'Your gross hourly pay rate.')}
                />
              )}

              <CalculatorInput
                label={t('salary_hourly.hours_week', 'Hours per Week')}
                value={hoursPerWeek}
                onChange={setHoursPerWeek}
                min={1}
                max={168}
                icon={Clock}
                helpText={t('salary_hourly.hours_help', 'Standard is 40 hours.')}
              />

              <CalculatorInput
                label={t('salary_hourly.weeks_year', 'Weeks per Year')}
                value={weeksPerYear}
                onChange={setWeeksPerYear}
                min={1}
                max={52}
                icon={Calendar}
                helpText={t('salary_hourly.weeks_help', '52 = no unpaid time off.')}
              />
            </div>
          </div>

          <AdSlot className="h-24 w-full" label="Native Ad" />
        </div>

        {/* Results */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-violet-600 dark:bg-violet-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-medium opacity-90 mb-4">
                {mode === 'salary'
                  ? t('salary_hourly.your_hourly', 'Your Hourly Rate')
                  : t('salary_hourly.your_salary', 'Your Annual Salary')}
              </h3>
              <div className="text-5xl font-bold mb-2">
                {mode === 'salary' ? fmt(results.hourly) : fmt(results.annual)}
              </div>
              <p className="text-violet-100 text-sm">
                {t('salary_hourly.based_on', 'Based on {{hours}} hrs/week, {{weeks}} weeks/year', {
                  hours: hoursPerWeek,
                  weeks: weeksPerYear,
                })}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
                {t('salary_hourly.full_breakdown', 'Full Breakdown')}
              </h3>
              {[
                { label: t('salary_hourly.lbl_annual', 'Annual'), value: results.annual },
                { label: t('salary_hourly.lbl_monthly', 'Monthly'), value: results.monthly },
                { label: t('salary_hourly.lbl_biweekly', 'Biweekly'), value: results.biweekly },
                { label: t('salary_hourly.lbl_weekly', 'Weekly'), value: results.weekly },
                { label: t('salary_hourly.lbl_daily', 'Daily'), value: results.daily },
                { label: t('salary_hourly.lbl_hourly', 'Hourly'), value: results.hourly },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{row.label}</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{fmt(row.value)}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-100 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                {t('salary_hourly.did_you_know', '💡 Did You Know?')}
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {t(
                  'salary_hourly.tip',
                  'A quick rule of thumb: divide your salary by 2,000 to estimate your hourly rate. For example, $60,000 / 2,000 ≈ $30/hr.'
                )}
              </p>
            </div>

            <AdSlot className="h-[250px] w-full" label="Result Sidebar Ad" />
          </div>
        </div>
      </div>
    </div>
  );
}
