'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Disclaimer } from '@/components/Disclaimer';
import { DollarSign, Clock, Calendar, Briefcase, Calculator } from 'lucide-react';
import { CalculatorInput } from '@/components/CalculatorInput';
import { AdSlot } from '@/components/AdSlot';

export default function FreelanceRateCalculator() {
  const { t } = useTranslation();

  // State
  const [desiredIncome, setDesiredIncome] = useState<number>(100000);
  const [billableHours, setBillableHours] = useState<number>(30);
  const [weeksOff, setWeeksOff] = useState<number>(4);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(500);
  const [taxRate, setTaxRate] = useState<number>(25);
  const [profitMargin, setProfitMargin] = useState<number>(10);

  // Results
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [dailyRate, setDailyRate] = useState<number>(0);
  const [weeklyRate, setWeeklyRate] = useState<number>(0);
  const [monthlyRate, setMonthlyRate] = useState<number>(0);
  const [yearlyGross, setYearlyGross] = useState<number>(0);

  useEffect(() => {
    calculateRate();
  }, [desiredIncome, billableHours, weeksOff, monthlyExpenses, taxRate, profitMargin]);

  const calculateRate = () => {
    // 1. Calculate Total Annual Expenses
    const annualExpenses = monthlyExpenses * 12;
    
    // 2. Calculate Desired Net Income (after taxes)
    // Formula: Gross = Net / (1 - TaxRate)
    // But usually users input "Desired Gross Salary" or "Desired Take Home". 
    // Let's assume input is Desired Personal Salary (Net+Tax for personal), plus business expenses.
    // If input is "Desired Annual Income" (what they want to earn gross personally),
    // Then Total Required Revenue = (Desired Income + Annual Expenses) / (1 - ProfitMargin) ?
    // Let's stick to a simpler model:
    // Total Need = (Desired Income / (1 - TaxRate/100)) + Annual Expenses
    // Actually, Desired Income usually implies "Pre-tax personal income".
    
    // Model:
    // Target Gross Revenue = (Desired Personal Income + Business Expenses) / (1 - ProfitMargin/100)
    // Wait, tax is on the personal income usually for freelancers (pass-through).
    
    // Simplified Freelance Model:
    // Target Annual Revenue = Desired Personal Income + Annual Business Expenses
    // Add Tax Buffer? Users usually think in "Pre-tax income". 
    // Let's add a "Tax Buffer" visualization but calculate rate based on Revenue needed to hit that income.
    
    // Let's try: 
    // Total Revenue Needed = (Desired Income + Annual Expenses) 
    // We can also add a "Profit Margin" markup.
    
    const totalRevenueNeeded = (desiredIncome + annualExpenses) * (1 + profitMargin / 100);
    
    // 3. Calculate Billable Hours per Year
    const weeksWorking = 52 - weeksOff;
    const totalBillableHours = weeksWorking * billableHours;

    // 4. Calculate Rates
    const calculatedHourly = totalBillableHours > 0 ? totalRevenueNeeded / totalBillableHours : 0;
    const calculatedDaily = calculatedHourly * (billableHours / 5); // Approx daily based on 5 day week
    const calculatedWeekly = totalRevenueNeeded / weeksWorking;
    const calculatedMonthly = totalRevenueNeeded / 12;

    setHourlyRate(calculatedHourly);
    setDailyRate(calculatedDaily);
    setWeeklyRate(calculatedWeekly);
    setMonthlyRate(calculatedMonthly);
    setYearlyGross(totalRevenueNeeded);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const faqs = [
    { question: 'How do I calculate my freelance hourly rate?', answer: 'Add your desired annual income and total annual business expenses (software, insurance, coworking, equipment), divide by your annual billable hours, then add a profit margin buffer (10-20%). Factor in self-employment taxes (15.3% in the US). Formula: (Income + Expenses) × (1 + Profit%) ÷ Billable Hours. This gives you your minimum viable rate.' },
    { question: 'How many billable hours should I plan for?', answer: 'Most successful freelancers bill only 20-30 hours per week — not 40. The remaining time goes to marketing (finding new clients), admin (invoicing, bookkeeping), professional development, and communication. Planning for 40 billable hours will lead to burnout or underpricing. At 25 hours/week with 4 weeks off, you have ~1,200 billable hours/year.' },
    { question: 'Should I charge hourly or project-based?', answer: 'Start with hourly to understand your true cost and speed, then transition to project-based (value pricing) as you gain experience. Project pricing decouples your income from time, rewarding efficiency. Knowing your hourly rate helps you estimate projects accurately. Many top freelancers use day rates or weekly retainers to simplify pricing and client management.' },
    { question: 'How do I negotiate my freelance rate?', answer: 'Never quote a rate without understanding the project scope first. Present your price as an investment, not a cost — focus on the ROI you deliver. Offer tiered packages (basic/standard/premium) to anchor your rate. If a client says your rate is too high, reduce scope rather than price. Always have a minimum acceptable rate and walk away from projects below it.' },
    { question: 'When should I raise my rates?', answer: 'Raise your rates annually (at minimum 5-10% to keep up with inflation), when demand exceeds your capacity, after gaining significant new skills or certifications, or when you consistently deliver results that exceed what you charge. Implement increases for new clients immediately and for existing clients with 30-60 days notice. If no one ever pushes back on your rate, you are charging too little.' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="finance" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Briefcase className="w-8 h-8 text-blue-500" />
          {t('freelance.title', 'Freelance Rate Calculator')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('freelance.subtitle', 'Determine how much you should charge to meet your income goals.')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
              <Calculator className="w-5 h-5 text-blue-500" />
              {t('forms.sections.inputs', 'Your Details')}
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <CalculatorInput
                label={t('freelance.desired_income', 'Desired Annual Income')}
                value={desiredIncome}
                onChange={setDesiredIncome}
                min={0}
                max={1000000}
                step={1000}
                icon={DollarSign}
                helpText={t('freelance.desired_income_help', 'Your goal annual salary (pre-tax).')}
              />

              <CalculatorInput
                label={t('freelance.monthly_expenses', 'Monthly Business Expenses')}
                value={monthlyExpenses}
                onChange={setMonthlyExpenses}
                min={0}
                max={50000}
                step={50}
                icon={DollarSign}
                helpText={t('freelance.expenses_help', 'Software, insurance, coworking, etc.')}
              />

              <CalculatorInput
                label={t('freelance.billable_hours', 'Billable Hours / Week')}
                value={billableHours}
                onChange={setBillableHours}
                min={1}
                max={168}
                icon={Clock}
                helpText={t('freelance.billable_help', 'Hours you actually charge clients for.')}
              />

              <CalculatorInput
                label={t('freelance.weeks_off', 'Weeks Off / Year')}
                value={weeksOff}
                onChange={setWeeksOff}
                min={0}
                max={52}
                icon={Calendar}
                helpText={t('freelance.weeks_off_help', 'Vacation, sick days, and holidays.')}
              />
              
              <CalculatorInput
                label={t('freelance.profit_margin', 'Profit Margin (%)')}
                value={profitMargin}
                onChange={setProfitMargin}
                min={0}
                max={100}
                icon={DollarSign}
                helpText={t('freelance.profit_help', 'Buffer for savings or business growth.')}
              />

              <CalculatorInput
                label={t('freelance.tax_rate', 'Est. Tax Rate (%)')}
                value={taxRate}
                onChange={setTaxRate}
                min={0}
                max={100}
                icon={DollarSign}
                helpText={t('freelance.tax_help', 'For estimation purposes only.')}
              />
            </div>
          </div>
          
          <AdSlot className="h-24 w-full" label="Native Ad" />
        </div>

        {/* Results Section */}
        {/* Sticky Sidebar on Desktop */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-medium opacity-90 mb-4">{t('freelance.min_hourly_rate', 'Minimum Hourly Rate')}</h3>
              <div className="text-5xl font-bold mb-2">
                {formatCurrency(hourlyRate)}
              </div>
              <p className="text-blue-100 text-sm">
                {t('freelance.based_on', 'Based on {{hours}} billable hours/year', { hours: (52 - weeksOff) * billableHours })}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-2">
                {t('freelance.income_breakdown', 'Income Breakdown')}
              </h3>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('freelance.daily', 'Daily')}</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{formatCurrency(dailyRate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('freelance.weekly', 'Weekly')}</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{formatCurrency(weeklyRate)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">{t('freelance.monthly', 'Monthly')}</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{formatCurrency(monthlyRate)}</span>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{t('freelance.gross_revenue', 'Total Revenue Needed')}</span>
                  <span className="font-bold text-gray-900 dark:text-gray-100">{formatCurrency(yearlyGross)}</span>
                </div>
                 <div className="flex justify-between items-center text-sm mt-2 text-red-500">
                  <span>{t('freelance.est_tax', 'Est. Tax ({{rate}}%)', { rate: taxRate })}</span>
                  <span>{formatCurrency(yearlyGross * (taxRate / 100))}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-2 text-green-500 font-medium">
                  <span>{t('freelance.net_estimate', 'Est. Net Income')}</span>
                  <span>{formatCurrency(yearlyGross * (1 - taxRate / 100) - (monthlyExpenses * 12))}</span>
                </div>
              </div>
            </div>
            
            <AdSlot className="h-[250px] w-full" label="Result Sidebar Ad" />
          </div>
        </div>
      </div>
    </div>
  );
}
