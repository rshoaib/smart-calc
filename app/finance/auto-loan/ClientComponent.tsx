'use client';

import { useState, useEffect } from 'react';
import { Disclaimer } from '@/components/Disclaimer';
import { AdSlot } from '@/components/AdSlot';
import Link from 'next/link';
import { DollarSign, Percent, Calendar, PieChart, Car } from 'lucide-react';
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

export default function AutoLoanCalculator() {
  const [carPrice, setCarPrice] = useState<number>(35000);
  const [loanTerm, setLoanTerm] = useState<number>(60); // in months
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tradeInValue, setTradeInValue] = useState<number>(8000);
  const [amountOwedOnTradeIn, setAmountOwedOnTradeIn] = useState<number>(3000);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(6.5);

  const [totalFinanced, setTotalFinanced] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalSalesTax, setTotalSalesTax] = useState<number>(0);
  const [totalLoanCost, setTotalLoanCost] = useState<number>(0);
  const [amortization, setAmortization] = useState<AmortizationData[]>([]);

  useEffect(() => {
    const calculateAutoLoan = () => {
      // Sales tax is typically applied to the difference between the new car price and the trade-in value
      const taxableAmount = Math.max(0, carPrice - tradeInValue);
      const tax = taxableAmount * (salesTaxRate / 100);
      setTotalSalesTax(tax);

      // Principal is the total amount financed
      // Car Price + Tax + Owed on Trade-In - Trade-In Value - Down Payment
      const principal = (carPrice + tax + amountOwedOnTradeIn) - tradeInValue - downPayment;
      
      if (principal <= 0 || interestRate <= 0 || loanTerm <= 0) {
        setTotalFinanced(Math.max(0, principal));
        setMonthlyPayment(0);
        setTotalInterest(0);
        setTotalLoanCost(0);
        setAmortization([]);
        return;
      }
      
      setTotalFinanced(principal);

      const monthlyRate = interestRate / 100 / 12;
      const numberOfPayments = loanTerm;

      // Amortization formula
      const payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      
      setMonthlyPayment(payment);

      // Amortization Schedule
      let balance = principal;
      const schedule: AmortizationData[] = [];
      let totalInt = 0;

      for (let i = 1; i <= numberOfPayments; i++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = payment - interestPayment;
        balance -= principalPayment;
        totalInt += interestPayment;

        if (i % 6 === 0 || i === 1 || i === numberOfPayments) { 
          schedule.push({
            month: i,
            balance: Math.max(0, balance),
            interest: totalInt,
            principal: (principal - balance)
          });
        }
      }

      setTotalInterest(totalInt);
      setTotalLoanCost(principal + totalInt);
      setAmortization(schedule);
    };

    calculateAutoLoan();
  }, [carPrice, loanTerm, interestRate, downPayment, tradeInValue, amountOwedOnTradeIn, salesTaxRate]);

  const faqs = [
    {
      question: "How does my trade-in affect my car loan?",
      answer: "Your trade-in acts as a form of down payment. In most states, trading in a vehicle also provides a massive tax benefit. You only pay sales tax on the difference between the new car price and your trade-in value. For example, if you buy a $40,000 car and trade in a $15,000 car, you only pay sales tax on $25,000."
    },
    {
      question: "What happens if I owe more on my trade-in than it is worth (Negative Equity)?",
      answer: "Being 'upside down' on your current car loan means you have negative equity. If you trade it in, the dealership will simply take the remaining balance you owe and add it to your new car loan. This increases your total amount financed, your monthly payment, and the total interest you will pay."
    },
    {
      question: "What is a good auto loan interest rate?",
      answer: "Auto loan rates vary heavily based on your credit score and whether the car is new or used. Typically, new cars offer lower interest rates (often subsidized by the manufacturer, sometimes around 0% to 5%). Used car rates are higher, often ranging from 7% to 12% or more, depending on the age of the vehicle and your credit profile."
    },
    {
      question: "Should I take a 60-month or 72-month car loan?",
      answer: "A longer loan term (like 72 or 84 months) will automatically lower your monthly payment, making the car feel more affordable. However, you will pay significantly more in total interest over the life of the loan. Furthermore, cars depreciate rapidly—with a 72-month loan, you are at a much higher risk of having negative equity for a longer period of time."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Disclaimer type="finance" />
      <div className="my-6">
        <AdSlot className="h-[90px] w-full max-w-[728px] mx-auto" label="728x90 Leaderboard" />
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-3">
          <Car className="w-8 h-8 text-blue-500" />
          Auto Loan Calculator
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Calculate your monthly car payment, see your amortization schedule, and factor in sales tax & trade-ins.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Vehicle Details</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Car Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={carPrice}
                    onChange={(e) => setCarPrice(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Loan Term (Months)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all appearance-none"
                  >
                    <option value={36}>36 Months (3 Years)</option>
                    <option value={48}>48 Months (4 Years)</option>
                    <option value={60}>60 Months (5 Years)</option>
                    <option value={72}>72 Months (6 Years)</option>
                    <option value={84}>84 Months (7 Years)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Interest Rate</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Down Payment</label>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sales Tax Rate (%)</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.1"
                    value={salesTaxRate}
                    onChange={(e) => setSalesTaxRate(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Trade-In Vehicle</h3>
                
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Trade-In Value</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                            <input
                            type="number"
                            value={tradeInValue}
                            onChange={(e) => setTradeInValue(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400">Amount Owed on Trade-In</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                            <input
                            type="number"
                            value={amountOwedOnTradeIn}
                            onChange={(e) => setAmountOwedOnTradeIn(Number(e.target.value))}
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
                  ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                
                <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                        <span>Total Financed (Principal)</span>
                        <span className="font-semibold">${totalFinanced.toFixed(0)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Estimated Sales Tax</span>
                        <span className="font-semibold">${totalSalesTax.toFixed(0)}</span>
                    </div>
                </div>
              </div>

               <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col justify-center">
                 <div className="space-y-4">
                    <div>
                         <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Interest Paid</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                    </div>
                    <div>
                         <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Total Cost of Loan</h3>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${totalLoanCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
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
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <Tooltip 
                      formatter={(value: unknown) => [`$${Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`, '']}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      name="Loan Balance" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorBalance)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Dealership Negotiation Tip</h4>
              <p>
                Dealerships often try to negotiate based on the "Monthly Payment" rather than the actual price of the car. 
                They can lower your monthly payment simply by stretching the loan term to 72 or 84 months, which costs you thousands more in interest. Always negotiate the <strong>Total Car Price</strong> and your <strong>Trade-In Value</strong> separately.
              </p>
            </div>
        </div>
      </div>
      
      {/* Educational Content Section */}
      <article className="mt-16 prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Calculate Your Car Payment</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
              Buying a car is one of the largest financial decisions you will make. Our auto loan calculator helps you see past the dealership's monthly payment quotes and understand the absolute true cost of your vehicle. 
              By inputting your vehicle price, down payment, trade-in value, and interest rate, you can generate an exact amortization schedule.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Impact of Sales Tax and Trade-Ins</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
              One of the biggest mistakes buyers make is forgetting to include sales tax and dealership fees in their calculations. 
              In most states, trading in your vehicle gives you a massive tax break. For example, if your new car is $40,000 and your trade-in is worth $15,000, 
              <strong> you only pay sales tax on the $25,000 difference</strong>. This calculator automatically applies this tax logic to estimate your total amount financed accurately.
          </p>

          <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you run a dealership or calculate auto loan interest for clients, you may also find our <Link href="/finance/margin" className="text-blue-600 dark:text-blue-400 hover:underline">margin calculator</Link> useful for determining your net profit on vehicle sales.
          </p>

          <div className="my-8">
            <AdSlot className="h-[250px] w-[300px] mx-auto" label="300x250 Medium Rectangle" />
          </div>

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
