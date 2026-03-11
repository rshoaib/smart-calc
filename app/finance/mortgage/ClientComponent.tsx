'use client';

import { useState, useEffect } from 'react';
import { Disclaimer } from '@/components/Disclaimer';
import { DollarSign, Percent, Calendar, PieChart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface AmortizationData {
  month: number;
  balance: number;
  interest: number;
  principal: number;
}

export default function MortgageCalculator() {
  const { t } = useTranslation();
  const [amount, setAmount] = useState<number>(300000);
  const [rate, setRate] = useState<number>(6.5);
  const [years, setYears] = useState<number>(30);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2);
  const [homeInsurance, setHomeInsurance] = useState<number>(1200);
  const [pmiRate, setPmiRate] = useState<number>(0.5);

  const [monthlyPrincipalInterest, setMonthlyPrincipalInterest] = useState<number>(0);
  const [monthlyTax, setMonthlyTax] = useState<number>(0);
  const [monthlyInsurance, setMonthlyInsurance] = useState<number>(0);
  const [monthlyPMI, setMonthlyPMI] = useState<number>(0);
  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);

  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [amortization, setAmortization] = useState<AmortizationData[]>([]);

  useEffect(() => {
    const calculateMortgage = () => {
      const principal = amount - downPayment;
      const monthlyRate = rate / 100 / 12;
      const numberOfPayments = years * 12;

      if (principal <= 0 || rate <= 0 || years <= 0) return;

      // 1. Principal & Interest
      const pi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      setMonthlyPrincipalInterest(pi);

      // 2. Property Tax (Monthly)
      const tax = (amount * (propertyTaxRate / 100)) / 12;
      setMonthlyTax(tax);

      // 3. Home Insurance (Monthly)
      const ins = homeInsurance / 12;
      setMonthlyInsurance(ins);

      // 4. PMI (Monthly) - Only if LTV > 80% (Down Payment < 20%)
      let pmi = 0;
      if (downPayment < (amount * 0.2)) {
          pmi = (principal * (pmiRate / 100)) / 12;
      }
      setMonthlyPMI(pmi);

      // Total Monthly
      setMonthlyTotal(pi + tax + ins + pmi);

      // Amortization Schedule
      let balance = principal;
      const schedule: AmortizationData[] = [];
      let totalInt = 0;

      for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = pi - interestPayment;
        balance -= principalPayment;
        totalInt += interestPayment;

        if (i % 12 === 0 || i === 1) { 
          schedule.push({
            month: i,
            balance: Math.max(0, balance),
            interest: totalInt,
            principal: (principal - balance)
          });
        }
      }

      setTotalInterest(totalInt);
      // Total Cost = Down Payment + (Monthly * Months) 
      
      // Re-run loop for exact totals
      let exactTotalCost = downPayment;
      let tempBalance = principal;
      let tempTotalPMI = 0;
      
      for (let i = 1; i <= numberOfPayments; i++) {
          const interestPayment = tempBalance * monthlyRate;
          const principalPayment = pi - interestPayment;
          tempBalance -= principalPayment;
          
          let currentPMI = 0;
          if (tempBalance > (amount * 0.78)) { // PMI usually drops at 78% LTV
             currentPMI = (principal * (pmiRate / 100)) / 12;
          }
          if (downPayment >= (amount * 0.2)) currentPMI = 0; // Never pay if started > 20%

          exactTotalCost += (pi + tax + ins + currentPMI);
          tempTotalPMI += currentPMI;
      }

      setTotalPayment(exactTotalCost);
      setAmortization(schedule);
    };
    calculateMortgage();
  }, [amount, rate, years, downPayment, propertyTaxRate, homeInsurance, pmiRate]);

  const faqs = [
    {
      question: "How much deposit do I need?",
      answer: "While 20% is the gold standard to avoid PMI, many lenders accept as little as 3.5% (FHA loans) or even 3% (Conventional 97). VA loans require 0% for veterans. However, a lower down payment means higher monthly payments, PMI costs ($100-300+/month), and more total interest paid. Saving 20% is worth the effort — on a $400K home, it saves you $150-250/month in PMI alone."
    },
    {
      question: "What is PMI?",
      answer: "PMI (Private Mortgage Insurance) protects the lender, not you, if you default on the loan. Required when your down payment is less than 20%, it typically costs 0.5-1.5% of the loan amount per year ($125-375/month on a $300K loan). PMI automatically drops off when you reach 78% LTV (loan-to-value), or you can request removal at 80% LTV."
    },
    {
      question: "How does the loan term affect interest?",
      answer: "A 15-year mortgage usually has a 0.5-0.75% lower interest rate than a 30-year mortgage, AND you pay it off twice as fast. On a $300K loan at 6.5% (30yr) vs 5.75% (15yr): the 30-year costs $382K in interest, while the 15-year costs only $139K — saving you $243K. The tradeoff is a higher monthly payment ($2,500 vs $1,900)."
    },
    {
      question: "What is the difference between ARM and fixed-rate mortgages?",
      answer: "A fixed-rate mortgage keeps the same interest rate for the entire loan term. An ARM (Adjustable Rate Mortgage) offers a lower initial rate (e.g., 5/1 ARM = fixed for 5 years, then adjusts annually). ARMs can be beneficial if you plan to sell or refinance within the fixed period. However, if rates rise, your payment could increase significantly after the adjustment period."
    },
    {
      question: "When should I refinance my mortgage?",
      answer: "The general rule is to refinance if you can lower your rate by at least 0.75-1%. Factor in closing costs (typically 2-5% of the loan), and calculate your break-even point (closing costs ÷ monthly savings). If you plan to stay in the home longer than the break-even period (usually 2-4 years), refinancing makes sense. You can also refinance to switch from an ARM to a fixed rate for stability."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="finance" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <DollarSign className="w-8 h-8 text-green-500" />
          Mortgage Calculator with PMI & Taxes
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          The most accurate 2026 housing market calculator. See exactly where your money goes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('forms.sections.loan')}</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.home_price')}</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.down_payment')}</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.interest_rate')}</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('forms.labels.loan_term')}</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Taxes & Insurance</h3>
                
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Property Tax (%/yr)</label>
                        <div className="relative">
                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                            <input
                            type="number"
                            step="0.1"
                            value={propertyTaxRate}
                            onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Home Insurance ($/yr)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                            <input
                            type="number"
                            value={homeInsurance}
                            onChange={(e) => setHomeInsurance(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                    </div>

                     <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">PMI Rate (%)</label>
                        <div className="relative">
                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                            <input
                            type="number"
                            step="0.1"
                            value={pmiRate}
                            onChange={(e) => setPmiRate(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-2xl border border-primary-100 dark:border-primary-800">
                <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">Estimated Monthly Payment</h3>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
                  ${monthlyTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                
                <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                        <span>Principal & Interest</span>
                        <span className="font-semibold">${monthlyPrincipalInterest.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Property Tax</span>
                        <span className="font-semibold">${monthlyTax.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Home Insurance</span>
                        <span className="font-semibold">${monthlyInsurance.toFixed(0)}</span>
                    </div>
                    {monthlyPMI > 0 && (
                        <div className="flex justify-between text-orange-600">
                            <span>PMI (Private Mortgage Insurance)</span>
                            <span className="font-semibold">${monthlyPMI.toFixed(0)}</span>
                        </div>
                    )}
                </div>
              </div>

               <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col justify-center">
                 <div className="space-y-4">
                    <div>
                         <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{t('results.total_interest')}</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                    </div>
                    <div>
                         <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Loan Cost (30 Years)</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-gray-500" />
                Amortization Schedule
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={amortization} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <Tooltip 
                      formatter={(value: unknown) => [`$${Number(value).toLocaleString()}`, '']}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      name="Loan Balance" 
                      stroke="#0ea5e9" 
                      fillOpacity={1} 
                      fill="url(#colorBalance)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Did you know?</h4>
              <p>
                Making one extra mortgage payment per year can shorten your loan term by several years and save you thousands in interest.
                Try adjusting the loan term to see how much you could save!
              </p>
            </div>
        </div>
      </div>
      
      {/* Educational Content Section (Trojan Horse) */}
      <article className="mt-16 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Use This Calculator</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our advanced mortgage calculator goes beyond simple principal and interest. By including 
              <strong> Property Taxes</strong>, <strong>Home Insurance</strong>, and <strong>PMI</strong>, 
              we give you the "Real PITI" (Principal, Interest, Taxes, Insurance) number that actually hits your bank account.
              Simply input your home price and down payment, and we will automatically estimate the rest based on national averages.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding the Formula</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your monthly payment is determined by an amortization formula that smooths out your payments over 30 years. 
              In the early years, nearly 80% of your payment goes to interest. This is why "Pre-payment" is so powerful—it attacks the principal directly, preventing interest from ever accruing.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2026 Market Context</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
              As we settle into 2026, mortgage rates have stabilized from the peaks of previous years. 
              However, with home prices remaining high, the key to affordability is a larger down payment (to avoid PMI) and "Rate Shopping". 
              A difference of just 0.5% in your rate can save you $30,000+ over the life of the loan.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding PMI: When You Pay It and How to Remove It</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Private Mortgage Insurance (PMI)</strong> is required when your down payment is less than 20% of the home price. 
              It protects the <em>lender</em> (not you) if you default. Here's what PMI typically costs based on your down payment:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-left border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-4 py-3 font-semibold">Down Payment</th>
                  <th className="px-4 py-3 font-semibold">PMI Rate (Annual)</th>
                  <th className="px-4 py-3 font-semibold">Monthly PMI on $300K Loan</th>
                  <th className="px-4 py-3 font-semibold">When PMI Drops Off</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-600 dark:text-gray-400">
                <tr>
                  <td className="px-4 py-3">3% (FHA)</td>
                  <td className="px-4 py-3">0.85–1.05%</td>
                  <td className="px-4 py-3 font-semibold text-orange-600">$213–$263</td>
                  <td className="px-4 py-3">Life of loan (FHA MIP)</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="px-4 py-3">5%</td>
                  <td className="px-4 py-3">0.55–0.75%</td>
                  <td className="px-4 py-3 font-semibold text-orange-600">$131–$178</td>
                  <td className="px-4 py-3">At 78% LTV (auto) or 80% (request)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">10%</td>
                  <td className="px-4 py-3">0.40–0.55%</td>
                  <td className="px-4 py-3 font-semibold text-orange-600">$90–$124</td>
                  <td className="px-4 py-3">At 78% LTV (auto) or 80% (request)</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="px-4 py-3">15%</td>
                  <td className="px-4 py-3">0.30–0.45%</td>
                  <td className="px-4 py-3 font-semibold text-yellow-600">$68–$101</td>
                  <td className="px-4 py-3">At 78% LTV (auto) or 80% (request)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-green-600">20%+</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">$0</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">$0</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">Not required</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">How to Eliminate PMI Faster</h3>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-400 mb-6 space-y-2">
            <li><strong>Make extra principal payments</strong> — even $200/month extra accelerates reaching 80% LTV.</li>
            <li><strong>Request a new appraisal</strong> — if your home value has increased significantly, the new LTV ratio may qualify for PMI removal.</li>
            <li><strong>Refinance</strong> — if you now have 20%+ equity and can get a lower rate, refinancing eliminates PMI and reduces your payment.</li>
            <li><strong>Automatic removal at 78% LTV</strong> — lenders are legally required to cancel PMI when your balance reaches 78% of the original value (Homeowners Protection Act).</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
            ))}
          </div>
      </article>
    </div>
  );
}
