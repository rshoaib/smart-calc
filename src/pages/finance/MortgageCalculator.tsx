import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [amortization, setAmortization] = useState<AmortizationData[]>([]);

  useEffect(() => {
    const calculateMortgage = () => {
    const principal = amount - downPayment;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;

    if (principal <= 0 || rate <= 0 || years <= 0) return;

    // Monthly Payment Formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    const mortgagePayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(mortgagePayment);

    let balance = principal;
    const schedule: AmortizationData[] = [];
    let totalInt = 0;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = mortgagePayment - interestPayment;
      balance -= principalPayment;
      totalInt += interestPayment;

      if (i % 12 === 0 || i === 1) { // Optimize chart points (yearly + first month)
        schedule.push({
          month: i,
          balance: Math.max(0, balance),
          interest: totalInt,
          principal: (principal - balance)
        });
      }
    }

    setTotalInterest(totalInt);
    setTotalPayment(principal + totalInt + downPayment);
    setAmortization(schedule);
  };
    calculateMortgage();
  }, [amount, rate, years, downPayment]);

  return (
    <>
      <Helmet>
        <title>{t('home.tools.mortgage.name')} - SmartCalc</title>
        <meta name="description" content={t('home.tools.mortgage.desc')} />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <DollarSign className="w-8 h-8 text-green-500" />
            {t('home.tools.mortgage.name')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            {t('home.tools.mortgage.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('forms.sections.loan')}</h2>
            
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

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-2xl border border-primary-100 dark:border-primary-800 text-center">
                <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">{t('results.monthly_payment')}</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-800 text-center">
                <h3 className="text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">{t('results.total_interest')}</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800 text-center">
                <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">{t('results.total_cost')}</h3>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  ${totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
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
                      formatter={(value?: number) => [`$${Number(value).toLocaleString()}`, '']}
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
      </div>
    </>
  );
}
