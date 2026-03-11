import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: '2025/2026 Federal Income Tax Calculator',
  description: 'Estimate your US federal income tax liability, marginal bracket, and effective tax rate for the 2025/2026 tax year. Supports Single and Married Jointly filing statuses.',
  openGraph: {
    title: 'Federal Income Tax Calculator | SmartCalc',
    description: 'Calculate your 2025/2026 US federal taxes, effective rate, and net pay automatically.',
    url: 'https://dailysmartcalc.com/finance/tax',
  },
  alternates: {
    canonical: 'https://dailysmartcalc.com/finance/tax',
  },
};

export default function TaxCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight">
            2025 / 2026 Federal Income Tax Calculator
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Calculate your estimated tax liability, marginal bracket, and effective tax rate based on the latest IRS rules.
          </p>
        </div>

        {/* Calculator Tool */}
        <ClientComponent />

        {/* SEO Content / FAQ */}
        <div className="max-w-4xl mx-auto mt-16 prose prose-lg dark:prose-invert">
          <h2>How to use the 2025 Tax Calculator</h2>
          <p>
            The US tax system is progressive, meaning you don't pay your highest tax rate on all your income. This calculator 
            automatically applies the <strong>2025 Standard Deduction</strong> ($15,750 for Single filers, $31,500 for Married Filing Jointly) 
            to determine your <em>Taxable Income</em>, and then pushes that income through the progressive brackets to find your true <strong>Effective Tax Rate</strong>.
          </p>
          
          <h3>Marginal vs Effective Tax Rate</h3>
          <ul>
            <li><strong>Marginal Tax Rate:</strong> The rate you pay on your <em>last</em> dollar of income (the highest bracket you fall into).</li>
            <li><strong>Effective Tax Rate:</strong> The actual percentage of your total gross income that you pay in taxes. This is always significantly lower than your marginal rate.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
