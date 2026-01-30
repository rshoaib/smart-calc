import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CreditCard, Trash2, Plus, TrendingDown, ShieldCheck } from 'lucide-react';
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

interface Debt {
  id: string;
  name: string;
  balance: number;
  rate: number;
  minPayment: number;
}

interface PayoffData {
  month: number;
  remainingBalance: number;
  interestPaid: number;
}

export default function DebtPayoffPlanner() {
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card', balance: 5000, rate: 18.9, minPayment: 100 },
    { id: '2', name: 'Car Loan', balance: 12000, rate: 6.5, minPayment: 250 },
  ]);
  const [monthlyBudget, setMonthlyBudget] = useState<number>(500); // Extra money on top of mins
  const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>('snowball');

  const [payoffDate, setPayoffDate] = useState<string>('');
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [chartData, setChartData] = useState<PayoffData[]>([]);

  // Add new empty debt
  const addDebt = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setDebts([...debts, { id: newId, name: 'New Debt', balance: 0, rate: 0, minPayment: 0 }]);
  };

  // Remove debt
  const removeDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  // Update debt field
  const updateDebt = (id: string, field: keyof Debt, value: any) => {
    setDebts(debts.map(d => d.id === id ? { ...d, [field]: value } : d));
  };

  useEffect(() => {
    calculatePayoff();
  }, [debts, monthlyBudget, strategy]);

  const calculatePayoff = () => {
    let currentDebts = debts.map(d => ({ ...d }));
    let totalMinPayment = currentDebts.reduce((sum, d) => sum + d.minPayment, 0);

    // If budget is less than mins, warn or just use mins
    let availableForExtra = monthlyBudget; 
    
    // Sort debts based on strategy
    if (strategy === 'snowball') {
      currentDebts.sort((a, b) => a.balance - b.balance); // Lowest balance first
    } else {
      currentDebts.sort((a, b) => b.rate - a.rate); // Highest rate first
    }

    let months = 0;
    let totalInterestPaid = 0;
    let balanceHistory: PayoffData[] = [];
    let activeDebts = [...currentDebts];

    // Initial Point
    let totalInitialBalance = activeDebts.reduce((sum, d) => sum + d.balance, 0);
    balanceHistory.push({ month: 0, remainingBalance: totalInitialBalance, interestPaid: 0 });

    // Limit to 30 years to prevent infinite loops
    while (activeDebts.length > 0 && months < 360) {
      months++;
      
      // 1. Accrue Interest
      let monthlyInterest = 0;
      activeDebts.forEach(d => {
        let interest = d.balance * (d.rate / 100 / 12);
        d.balance += interest;
        monthlyInterest += interest;
        totalInterestPaid += interest;
      });

      // 2. Make Payments
      let extraMoney = availableForExtra;
      
      // Pay minimums first
      activeDebts.forEach(d => {
        let payment = d.minPayment;
        if (d.balance < payment) payment = d.balance; // Don't overpay
        d.balance -= payment;
        
        // If debt paid off, reallocate its min payment to "extraMoney" (Snowball effect)
        if (d.balance <= 0.01) {
             availableForExtra += d.minPayment; // The "Snowball" grows!
        }
      });

      // Pay extra money to the target debt (first in sorted list)
      if (extraMoney > 0 && activeDebts.length > 0) {
        // Find first non-paid debt
        let target = activeDebts.find(d => d.balance > 0.01);
        if (target) {
            target.balance -= extraMoney;
        }
      }

      // Cleanup paid debts
      activeDebts = activeDebts.filter(d => d.balance > 0.01);

      // Record History
      let currentTotalBalance = activeDebts.reduce((sum, d) => sum + d.balance, 0);
      if (months % 3 === 0 || activeDebts.length === 0) {
         balanceHistory.push({ 
           month: months, 
           remainingBalance: Math.max(0, currentTotalBalance),
           interestPaid: Math.round(totalInterestPaid)
         });
      }
    }

    // Generate Date
    const today = new Date();
    today.setMonth(today.getMonth() + months);
    setPayoffDate(today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
    setTotalInterest(totalInterestPaid);
    setChartData(balanceHistory);
  };

  return (
    <>
      <Helmet>
        <title>Debt Payoff Planner - Snowball vs Avalanche Calculator</title>
        <meta name="description" content="Create a custom plan to get out of debt faster. Compare Snowball vs Avalanche strategies and see your debt-free date." />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <ShieldCheck className="w-8 h-8 text-rose-500" />
            Debt Payoff Planner
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
             Stop stressing. Build a concrete plan to eliminate your debt forever.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            
            {/* Strategy Toggle */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
               <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">1. Choose Your Strategy</h3>
               <div className="flex gap-4">
                 <button
                   onClick={() => setStrategy('snowball')}
                   className={`flex-1 p-4 rounded-xl border-2 transition-all ${strategy === 'snowball' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-rose-300'}`}
                 >
                   <div className="font-bold text-gray-900 dark:text-white mb-1">❄️ Snowball Method</div>
                   <p className="text-xs text-gray-500">Pay smallest balance first.</p>
                   <span className="text-xs font-semibold text-rose-600">Best for Motivation due to quick wins.</span>
                 </button>
                 <button
                   onClick={() => setStrategy('avalanche')}
                   className={`flex-1 p-4 rounded-xl border-2 transition-all ${strategy === 'avalanche' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}
                 >
                   <div className="font-bold text-gray-900 dark:text-white mb-1">🏔️ Avalanche Method</div>
                   <p className="text-xs text-gray-500">Pay highest interest first.</p>
                   <span className="text-xs font-semibold text-blue-600">Mathematically optimal. Saves most money.</span>
                 </button>
               </div>
            </div>

             {/* Budget */}
             <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">2. Extra Monthly Payment</h3>
                <p className="text-sm text-gray-500 mb-2">How much EXTRA can you pay per month on top of minimums?</p>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
            </div>

            {/* Debts List */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-semibold text-gray-900 dark:text-white">3. Your Debts</h3>
                 <button onClick={addDebt} className="text-sm flex items-center gap-1 text-primary-600 hover:text-primary-700 font-medium">
                   <Plus className="w-4 h-4" /> Add Debt
                 </button>
              </div>

              <div className="space-y-4">
                {debts.map((debt) => (
                  <div key={debt.id} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700 relative group">
                    <button 
                      onClick={() => removeDebt(debt.id)}
                      className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="md:col-span-1">
                        <label className="text-xs font-medium text-gray-500 block mb-1">Name</label>
                        <input 
                          type="text" 
                          value={debt.name}
                          onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                          className="w-full px-2 py-1 bg-white dark:bg-gray-800 border rounded text-sm text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="text-xs font-medium text-gray-500 block mb-1">Balance ($)</label>
                         <input 
                          type="number" 
                          value={debt.balance}
                          onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white dark:bg-gray-800 border rounded text-sm text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="text-xs font-medium text-gray-500 block mb-1">Rate (%)</label>
                         <input 
                          type="number" 
                          step="0.1"
                          value={debt.rate}
                          onChange={(e) => updateDebt(debt.id, 'rate', Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white dark:bg-gray-800 border rounded text-sm text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="text-xs font-medium text-gray-500 block mb-1">Min Pmt ($)</label>
                         <input 
                          type="number" 
                          value={debt.minPayment}
                          onChange={(e) => updateDebt(debt.id, 'minPayment', Number(e.target.value))}
                          className="w-full px-2 py-1 bg-white dark:bg-gray-800 border rounded text-sm text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Results Section */}
          <div className="space-y-6">
             <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-3xl border border-green-100 dark:border-green-800 text-center relative overflow-hidden">
                <div className="relative z-10">
                   <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 uppercase tracking-widest mb-2">Debt Free Date</h3>
                   <p className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                     {payoffDate || "Never"}
                   </p>
                   <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-black/20 rounded-full text-sm font-medium text-green-800 dark:text-green-300">
                     <TrendingDown className="w-4 h-4" />
                     Total Interest Paid: ${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                   </div>
                </div>
             </div>

             {/* Chart */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-gray-500" />
                Your Payoff Journey
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottomRight', offset: -5 }} />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <Tooltip 
                      formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="remainingBalance" 
                      name="Total Debt Balance" 
                      stroke="#f43f5e" 
                      fillOpacity={1} 
                      fill="url(#colorDebt)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Strategy Tip</h4>
              <p>
                {strategy === 'snowball' 
                  ? "You've chosen the Snowball method. By knocking out small balances first, you gain psychological momentum to keep going!" 
                  : "You've chosen the Avalanche method. By attacking high-interest debt first, you are saving the maximum amount of money efficiently."}
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
