'use client';

import { useState, useEffect } from 'react';
import { Disclaimer } from '@/components/Disclaimer';
import { Car, Percent, Calendar, DollarSign, PieChart } from 'lucide-react';
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

interface PaymentSchedule {
  month: number;
  balance: number;
  interest: number;
  principal: number;
}

export default function AutoLoanCalculator() {
  const { t } = useTranslation();
  const [carPrice, setCarPrice] = useState<number>(35000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tradeIn, setTradeIn] = useState<number>(2000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [loanTerm, setLoanTerm] = useState<number>(60); // Months
  const [salesTax, setSalesTax] = useState<number>(6.25); // Percentage
  const [extraPayment, setExtraPayment] = useState<number>(0);

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [timeSaved, setTimeSaved] = useState<number>(0);
  const [interestSaved, setInterestSaved] = useState<number>(0);
  const [chartData, setChartData] = useState<PaymentSchedule[]>([]);

  useEffect(() => {
    const calculateLoan = () => {
    // 1. Calculate Tax
    const taxAmount = (carPrice * salesTax) / 100;
    
    // 2. Calculate Loan Amount
    // Principal = (Price + Tax) - Down Payment - Trade In
    const principal = (carPrice + taxAmount) - downPayment - tradeIn;
    
    if (principal <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalCost(carPrice + taxAmount);
      setChartData([]);
      setTimeSaved(0);
      setInterestSaved(0);
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    
    // 3. Monthly Payment Formula
    // M = P * (r(1+r)^n) / ((1+r)^n - 1)
    let basePayment = 0;
    if (interestRate === 0) {
      basePayment = principal / loanTerm;
    } else {
      basePayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    }

    setMonthlyPayment(basePayment);

    // 4. Generate Schedule (Standard vs Extra)
    
    // First, calculate STANDARD schedule (no extra payment) for comparison
    let stdBalance = principal;
    let stdTotalInterest = 0;
    for (let i = 0; i < loanTerm; i++) {
        const interest = stdBalance * monthlyRate;
        const principalPaid = basePayment - interest;
        stdBalance -= principalPaid;
        stdTotalInterest += interest;
    }

    // Now calculate ACTUAL schedule (with extra payment)
    let balance = principal;
    let accumulatedInterest = 0;
    const schedule: PaymentSchedule[] = [];
    let actualMonths = 0;
    const totalMonthlyPayment = basePayment + extraPayment;

    // Use a safety break for the loop
    for (let i = 1; i <= loanTerm; i++) {
      const interestChunk = balance * monthlyRate;
      let principalChunk = totalMonthlyPayment - interestChunk;
      
      // Don't overpay
      if (principalChunk > balance) {
          principalChunk = balance;
      }
      
      balance -= principalChunk;
      if (balance < 0.01) balance = 0; // Floating point fix
      accumulatedInterest += interestChunk;
      actualMonths = i;

      // Add data point every 6 months or first/last to check perf
      if (i === 1 || i % 6 === 0 || balance === 0 || i === loanTerm) {
        schedule.push({
          month: i,
          balance: balance,
          interest: accumulatedInterest,
          principal: (principal - balance)
        });
      }
      
      if (balance === 0) break;
    }

    setTotalInterest(accumulatedInterest);
    setTotalCost(carPrice + taxAmount + accumulatedInterest);
    setChartData(schedule);

    // Savings Logic
    if (extraPayment > 0) {
        const savedInt = stdTotalInterest - accumulatedInterest;
        const savedMonths = loanTerm - actualMonths;
        setInterestSaved(savedInt > 0 ? savedInt : 0);
        setTimeSaved(savedMonths > 0 ? savedMonths : 0);
    } else {
        setInterestSaved(0);
        setTimeSaved(0);
    }

  };
    calculateLoan();
  }, [carPrice, downPayment, tradeIn, interestRate, loanTerm, salesTax, extraPayment]);

  const faqs = [
    {
      question: "What is Gap Insurance?",
      answer: "Gap Insurance covers the 'gap' between what you owe on the car and its actual cash value if it's totaled or stolen. It is essential if you put less than 20% down, as new cars depreciate 20-30% in the first year alone. Without it, you could owe thousands on a car you no longer have. It typically costs $20-40/month."
    },
    {
      question: "Should I choose a longer loan term for lower payments?",
      answer: "While 72 or 84-month loans lower your monthly payment, they drastically increase total interest paid — sometimes by 30-50%. They also keep you 'underwater' (owing more than the car is worth) for years. A 60-month loan is generally the maximum recommended term. If you can't afford the payment on a 60-month term, consider a less expensive vehicle."
    },
    {
      question: "Does paying extra actually help on auto loans?",
      answer: "Yes! Most auto loans use simple interest, so any extra payment goes directly to reducing the principal balance, which immediately reduces the interest charged in all future months. Even $50-100 extra per month can save $500-$2,000 in total interest and shorten your loan by 6-12 months. Always verify your lender applies extra payments to principal, not future payments."
    },
    {
      question: "How does my credit score affect auto loan rates?",
      answer: "Credit scores dramatically impact your interest rate. Excellent credit (750+) typically qualifies for 3-5% APR, while poor credit (below 580) may face 15-20%+ APR. On a $30,000 loan over 60 months, the difference between 4% and 15% APR is over $10,000 in extra interest. Improving your score by even 50 points before buying can save thousands."
    },
    {
      question: "Is it better to buy new or used?",
      answer: "A 2-3 year old certified pre-owned (CPO) vehicle often provides the best value. New cars lose 20% of their value in year one and 60% over five years. A CPO car avoids the steepest depreciation while still offering manufacturer-backed warranties. However, if you plan to keep the car for 10+ years, buying new with a low interest rate can be cost-effective."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="finance" />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Car className="w-8 h-8 text-teal-500" />
          Auto Loan Calculator (with Extra Payments)
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          See exactly how much that car really costs. Calculate payments, sales tax, and interest savings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-5 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('forms.sections.loan')}</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('forms.labels.vehicle_price')}</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('forms.labels.down_payment')}</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('forms.labels.trade_in')}</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={tradeIn}
                    onChange={(e) => setTradeIn(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('forms.labels.sales_tax')} (%)</label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={salesTax}
                  onChange={(e) => setSalesTax(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('forms.labels.interest_rate')}</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={interestRate}
                    step="0.1"
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('forms.labels.term_months')}</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none appearance-none"
                  >
                    <option value={36}>36 Months</option>
                    <option value={48}>48 Months</option>
                    <option value={60}>60 Months</option>
                    <option value={72}>72 Months</option>
                    <option value={84}>84 Months</option>
                    <option value={96}>96 Months</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Extra Monthly Payment</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  placeholder="0"
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Pay off your loan faster and save interest.</p>
            </div>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-800 text-center">
              <h3 className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wide">{t('results.monthly_payment')}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800 text-center">
              <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">{t('results.total_interest')}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 text-center">
              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{t('results.total_cost')}</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                ${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
            
            {extraPayment > 0 && (interestSaved > 0 || timeSaved > 0) && (
              <div className="md:col-span-3 bg-teal-100 dark:bg-teal-900/40 p-4 rounded-xl border border-teal-200 dark:border-teal-800 text-center animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-teal-800 dark:text-teal-200 font-medium">
                      🎉 You could save <span className="font-bold">${interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> in interest 
                      and pay off the car <span className="font-bold">{timeSaved} months</span> early!
                  </p>
              </div>
            )}
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-gray-500" />
              Loan Payoff Schedule
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
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
                    stroke="#14b8a6" 
                    fillOpacity={1} 
                    fill="url(#colorBalance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Tip</h4>
            <p>
              A high interest rate significantly increases your total car cost. 
              Increasing your down payment or improving your credit score before buying can save you thousands over the life of the loan.
            </p>
          </div>
        </div>
      </div>
      
      {/* Educational Content (Trojan Horse) */}
      <article className="mt-16 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why 72-Month Loans Start You "Underwater"</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
              The average car loan term has stretched to nearly 72 months. While this lowers your monthly payment, it is dangerous for one reason: 
              <strong> Depreciation</strong>. New cars lose about 20% of their value in the first year. If you have a long loan with a small down payment, 
              you will owe more than the car is worth for years. This is called "Negative Equity" or being "Underwater".
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Simple Interest vs. Amortization</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
              Most auto loans use "Simple Interest". This is good news! It means that paying extra directly reduces your principal immediately. 
              Unlike a mortgage where pre-payment can be complex, paying just $50 extra per month on a car loan can save typically $500-$1000 in interest 
              and shorten your loan by several months. Use the "Extra Payment" field above to see your savings.
          </p>

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
