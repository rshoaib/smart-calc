import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Car, Percent, Calendar, DollarSign, PieChart } from 'lucide-react';
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
  const [carPrice, setCarPrice] = useState<number>(35000);
  const [downPayment, setDownPayment] = useState<number>(5000);
  const [tradeIn, setTradeIn] = useState<number>(2000);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [loanTerm, setLoanTerm] = useState<number>(60); // Months
  const [salesTax, setSalesTax] = useState<number>(6.25); // Percentage

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
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
      return;
    }

    const monthlyRate = interestRate / 100 / 12;
    
    // 3. Monthly Payment Formula
    // M = P * (r(1+r)^n) / ((1+r)^n - 1)
    let payment = 0;
    if (interestRate === 0) {
      payment = principal / loanTerm;
    } else {
      payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    }

    setMonthlyPayment(payment);

    // 4. Generate Schedule
    let balance = principal;
    let accumulatedInterest = 0;
    const schedule: PaymentSchedule[] = [];

    for (let i = 1; i <= loanTerm; i++) {
      const interestChunk = balance * monthlyRate;
      const principalChunk = payment - interestChunk;
      
      balance -= principalChunk;
      if (balance < 0) balance = 0;
      accumulatedInterest += interestChunk;

      // Add data point every 6 months or first/last to check perf
      if (i === 1 || i % 6 === 0 || i === loanTerm) {
        schedule.push({
          month: i,
          balance: balance,
          interest: accumulatedInterest,
          principal: (principal - balance)
        });
      }
    }

    setTotalInterest(accumulatedInterest);
    setTotalCost(carPrice + taxAmount + accumulatedInterest);
    setChartData(schedule);
  };
    calculateLoan();
  }, [carPrice, downPayment, tradeIn, interestRate, loanTerm, salesTax]);

  return (
    <>
      <Helmet>
        <title>Auto Loan Calculator - Car Payment Estimator</title>
        <meta name="description" content="Calculate your monthly car payment with tax, trade-in, and interest. Instant results without login." />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <Car className="w-8 h-8 text-teal-500" />
            Auto Loan Calculator
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Find out exactly how much that new car will cost you per month.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-5 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Vehicle Price</label>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Down Payment</label>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Trade-in Value</label>
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sales Tax (%)</label>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Interest Rate (%)</label>
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
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Term (Months)</label>
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
                  </select>
                </div>
              </div>
            </div>

          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-2xl border border-teal-100 dark:border-teal-800 text-center">
                <h3 className="text-sm font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wide">Monthly Payment</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800 text-center">
                <h3 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">Total Interest</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 text-center">
                <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Total Cost</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  ${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
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
                      formatter={(value?: number) => [`$${Number(value).toLocaleString()}`, '']}
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
      </div>
    </>
  );
}
