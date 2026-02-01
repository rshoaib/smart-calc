import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Home as HomeIcon, Building, DollarSign, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface ComparisonData {
  year: number;
  rentNetWorth: number;
  buyNetWorth: number;
  rentCost: number;
  buyCost: number;
}

export default function RentVsBuyCalculator() {
  const { t } = useTranslation();

  // Inputs
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPayment, setDownPayment] = useState<number>(80000); // 20%
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [buyingClosingCosts, setBuyingClosingCosts] = useState<number>(3); // %
  const [sellingClosingCosts, setSellingClosingCosts] = useState<number>(6); // %
  const [maintenanceCost, setMaintenanceCost] = useState<number>(1); // %

  const [rentMonthly, setRentMonthly] = useState<number>(2000);
  const [rentIncrease, setRentIncrease] = useState<number>(3); // %
  const [rentInsurance, setRentInsurance] = useState<number>(20); // Monthly

  const [homeAppreciation, setHomeAppreciation] = useState<number>(3); // %
  const [investmentReturn, setInvestmentReturn] = useState<number>(7); // % on savings

  const [data, setData] = useState<ComparisonData[]>([]);
  const [breakevenYear, setBreakevenYear] = useState<number | null>(null);

  useEffect(() => {
    const calculateComparison = () => {
      const years = 30;
      const monthlyRate = interestRate / 100 / 12;
      const n = loanTerm * 12;
      
      // Mortgage Payment (Principal + Interest)
      const loanAmount = homePrice - downPayment;
      let monthlyMortgage = 0;
      if (interestRate > 0) {
          monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
      } else {
          monthlyMortgage = loanAmount / n;
      }
  
      const chartData: ComparisonData[] = [];
      let breakeven: number | null = null;
      
      // Initial State
      // Rent Path: You invest the down payment and closing costs you didn't spend
      const initialBuyClosingCostAmount = homePrice * (buyingClosingCosts / 100);
      let rentSavings = downPayment + initialBuyClosingCostAmount;
      
      // Buying Path: You have equity (Home Price - Loan), but you spent cash.
      // Net Worth = Home Value - Mortgage Balance - Selling Costs (if sold)
      let homeValue = homePrice;
      let mortgageBalance = loanAmount;
      
      // Cumulative Costs (Sunk costs) for tracking
      let totalRentCost = 0;
      let totalBuyCost = initialBuyClosingCostAmount;
  
      for (let year = 1; year <= years; year++) {
          // RENT PATH CALCS
          let yearlyRent = 0;
          let yearlyRentInsurance = rentInsurance * 12;
          // Rent increases each year
          const currentMonthlyRent = rentMonthly * Math.pow(1 + rentIncrease / 100, year - 1);
          yearlyRent = currentMonthlyRent * 12;
  
          totalRentCost += yearlyRent + yearlyRentInsurance;
  
          // Investment growth on savings
          rentSavings = rentSavings * (1 + investmentReturn / 100);
          
          // Cost Difference: 
          // Buy Monthly = Mortgage + Maintenance + Property Tax (approx 1.2%?) + Insurance
          // Let's simplify Buy Monthly Cashflow vs Rent Monthly Cashflow
          // Ideally we compare total unrecoverable costs or total net worth.
          // Let's stick to Net Worth approach as it's cleaner for "Buy vs Rent".
          
          // BUY PATH CALCS
          // 1. Mortgage Paydown
          let interestPaid = 0;
          let principalPaid = 0;
          
          for (let m = 0; m < 12; m++) {
              if (mortgageBalance > 0) {
                  const interest = mortgageBalance * monthlyRate;
                  const principal = monthlyMortgage - interest;
                  interestPaid += interest;
                  principalPaid += principal;
                  mortgageBalance -= principal;
              }
          }
          
          // 2. Appreciation
          homeValue = homeValue * (1 + homeAppreciation / 100);
          
          // 3. Unrecoverable Costs
          const yearlyMaintenance = homeValue * (maintenanceCost / 100);
          const propertyTax = homeValue * 0.012; // Approx 1.2%
          const homeInsurance = homeValue * 0.005; // Approx 0.5%
          
          totalBuyCost += interestPaid + yearlyMaintenance + propertyTax + homeInsurance;
          
          // cash flow difference investing
          // Cost to Own (cash flow) = Mortgage + Maintenance + Tax + Insurance
          // Cost to Rent (cash flow) = Rent + Insurance
          const costToOwn = (monthlyMortgage * 12) + yearlyMaintenance + propertyTax + homeInsurance;
          const costToRent = yearlyRent + yearlyRentInsurance;
          
          const diff = costToRent - costToOwn;
          // If Rent is higher, owner saves the difference. If Own is higher, renter saves difference.
          if (diff > 0) {
               // Owning is cheaper cashflow-wise (rare early on), add to Homeowner's side investment? 
               // To simplify: Add to Rent Savings (negative drag) or separate investment?
               // Standard model: "Invest the difference".
               // We'll update the 'rentSavings' variable. If diff < 0 (Own is expensive), renter invests that amount.
               // If diff > 0 (Rent is expensive), renter withdraws? No, that breaks.
               // Let's assume Rent Savings is the "Opportunity Cost Portfolio".
               // We subtract 'costToRent' from it (spending) and add 'costToOwn' (spending)? No.
               
               // Correct "Invest Difference" Model:
               // Assume identical income. We track the surplus.
               // Let's just adjust Rent Savings by the difference.
               // If Own costs $3k, Rent costs $2k -> Renter invests $1k extra.
               // If Own costs $2k, Rent costs $3k -> Owner invests $1k extra (or Renter loses $1k savings).
               // Since we only track Rent Net Worth primarily via this var, let's inverse it:
               // rentSavings += (costToOwn - costToRent);
          }
          
          rentSavings += (costToOwn - costToRent); // If Own > Rent, Renter saves the diff.
  
          // CALC NET WORTH
          // Rent Net Worth = The Investment Portfolio
          const finalRentNetWorth = rentSavings;
          
          // Buy Net Worth = (Home Value * (1 - Selling Costs)) - Mortgage Balance
          const finalBuyNetWorth = (homeValue * (1 - sellingClosingCosts / 100)) - mortgageBalance;
          
          chartData.push({
              year,
              rentNetWorth: Math.round(finalRentNetWorth),
              buyNetWorth: Math.round(finalBuyNetWorth),
              rentCost: Math.round(totalRentCost),
              buyCost: Math.round(totalBuyCost)
          });
  
          if (breakeven === null && finalBuyNetWorth > finalRentNetWorth) {
               breakeven = year;
          }
      }
      
      setData(chartData);
      setBreakevenYear(breakeven);
    };

    calculateComparison();
  }, [homePrice, downPayment, interestRate, loanTerm, buyingClosingCosts, sellingClosingCosts, maintenanceCost, rentMonthly, rentIncrease, homeAppreciation, investmentReturn, rentInsurance]);

  return (
    <>
      <Helmet>
        <title>{t('home.tools.rent_vs_buy.name')} - SmartCalc</title>
        <meta name="description" content={t('home.tools.rent_vs_buy.desc')} />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
            <HomeIcon className="w-8 h-8 text-indigo-600" />
            {t('home.tools.rent_vs_buy.name')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
             {t('home.tools.rent_vs_buy.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Inputs */}
           <div className="lg:col-span-1 space-y-6 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 h-fit">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Building className="w-4 h-4" /> Buying Costs
              </h3>
              
              <div className="space-y-4">
                  <div>
                      <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.home_price')}</label>
                      <input type="number" value={homePrice} onChange={e => setHomePrice(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                      <div>
                          <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.down_payment')}</label>
                          <input type="number" value={downPayment} onChange={e => setDownPayment(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                      </div>
                      <div>
                          <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.interest_rate')}</label>
                          <input type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                      </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                       <div>
                          <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.loan_term')}</label>
                          <input type="number" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                       </div>
                       <div>
                          <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.buying_closing_costs')}</label>
                          <input type="number" value={buyingClosingCosts} onChange={e => setBuyingClosingCosts(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                       </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                       <div>
                          <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.home_appreciation')}</label>
                          <input type="number" value={homeAppreciation} onChange={e => setHomeAppreciation(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                       </div>
                       <div>
                          <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.maintenance_cost')}</label>
                          <input type="number" value={maintenanceCost} onChange={e => setMaintenanceCost(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                       </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                       <div>
                          <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.selling_closing_costs')}</label>
                          <input type="number" value={sellingClosingCosts} onChange={e => setSellingClosingCosts(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                       </div>
                  </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                      <DollarSign className="w-4 h-4" /> Renting Costs
                  </h3>
                   <div className="space-y-4">
                      <div>
                          <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.rent_monthly')}</label>
                          <input type="number" value={rentMonthly} onChange={e => setRentMonthly(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                          <div>
                              <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.rent_increase')}</label>
                              <input type="number" value={rentIncrease} onChange={e => setRentIncrease(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                          </div>
                          <div>
                              <label className="text-xs font-medium text-gray-500 uppercase">Rent Insurance ($/mo)</label>
                              <input type="number" value={rentInsurance} onChange={e => setRentInsurance(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                          <div>
                              <label className="text-xs font-medium text-gray-500 uppercase">{t('forms.labels.return_rate')}</label>
                              <input type="number" value={investmentReturn} onChange={e => setInvestmentReturn(Number(e.target.value))} className="w-full p-2 bg-gray-50 dark:bg-gray-900 border rounded-lg" />
                          </div>
                      </div>
                   </div>
              </div>
           </div>

           {/* Results and Chart */}
           <div className="lg:col-span-2 space-y-6">
               <div className="bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-2xl border border-indigo-100 dark:border-indigo-800 text-center">
                   <h3 className="text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-sm font-semibold mb-2">{t('results.break_even_point')}</h3>
                   {breakevenYear ? (
                       <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                           {t('results.buying_cheaper')} <span className="text-indigo-600 dark:text-indigo-400">{breakevenYear} {t('results.years')}</span>
                       </div>
                   ) : (
                       <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                           {t('results.renting_cheaper')} <span className="text-indigo-600 dark:text-indigo-400">{t('results.forever')}</span>
                       </div>
                   )}
               </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-gray-500" />
                        Net Worth Comparison
                    </h3>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
                                <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <Tooltip 
                                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                                />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="buyNetWorth" 
                                    name="Buying Net Worth" 
                                    stroke="#4f46e5" 
                                    strokeWidth={3}
                                    dot={false}
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="rentNetWorth" 
                                    name="Renting Net Worth" 
                                    stroke="#10b981" 
                                    strokeWidth={3} 
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
           </div>
        </div>
      </div>
    </>
  );
}
