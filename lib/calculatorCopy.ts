/**
 * Centralised long-form copy for calculator pages.
 *
 * Each entry contributes server-rendered HTML that gives Google something
 * substantive to index alongside the (client-rendered) interactive tool.
 * Closes the on-page-content gap with omnicalculator.com / calculator.net.
 */

export interface CalculatorCopy {
    intro: string;
    formulaHeading: string;
    formulaBody: string;
    useHeading: string;
    useBody: string;
    exampleHeading: string;
    exampleBody: string;
}

export const CALCULATOR_COPY: Record<string, CalculatorCopy> = {
    '/finance/mortgage': {
        intro: 'A mortgage payment is more than just principal and interest. The four components together — Principal, Interest, Taxes, and Insurance — are abbreviated PITI. Understanding all four upfront keeps you from buying a house you can\'t actually afford.',
        formulaHeading: 'The mortgage payment formula',
        formulaBody: 'The standard amortization formula is M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan amount (home price minus down payment), r is the monthly interest rate (annual rate divided by 12), and n is the total number of monthly payments (years × 12). On top of that base figure, lenders add monthly property tax, homeowners insurance, and — if your down payment is below 20% — Private Mortgage Insurance (PMI).',
        useHeading: 'When to use this calculator',
        useBody: 'Use it before you start house-hunting to know your real budget. Use it again when you have a specific home in mind to see how taxes and insurance change the picture for that property. Use it a third time when comparing 15-year and 30-year terms — same loan amount, very different total interest. The 28/36 rule is a useful guardrail: housing should be at most 28% of gross monthly income, and total debt at most 36%.',
        exampleHeading: 'Worked example',
        exampleBody: 'On a $400,000 home with 20% down ($80,000), a 30-year fixed at 6.5% generates a principal-and-interest payment of about $2,022/month. Add ~$400/month for property tax (1.2% annually) and ~$100/month for homeowners insurance, and your real PITI is closer to $2,520. Over 30 years, you\'ll pay $727,000 total — $407,000 of that is interest. That\'s why even a 1% rate difference matters: the same loan at 5.5% costs about $192/month less and saves $69,000 over the life of the loan.',
    },
    '/finance/investment': {
        intro: 'Compound interest is the engine of long-term wealth. Earning returns on your previous returns turns small, consistent contributions into life-changing balances if you give them enough time. The catch: inflation and taxes silently erode those gains, and good projections account for both.',
        formulaHeading: 'The compound growth formula',
        formulaBody: 'Future value with monthly contributions is FV = P(1+r)^n + PMT × [((1+r)^n − 1) / r], where P is your starting principal, PMT is your monthly contribution, r is the monthly return rate, and n is the number of months. To convert to real (inflation-adjusted) dollars, divide the result by (1 + inflation rate)^years.',
        useHeading: 'When to use this calculator',
        useBody: 'Use it to set realistic expectations before you start investing — most beginners overestimate short-term returns and underestimate long-term ones. Use it again to compare investing vehicles with different fee structures: a 1% annual fee can quietly cost you a third of your final balance over 40 years. Use a conservative 6-7% real return for planning; the long-run S&P average is closer to 7% real, but no one should bet a retirement on the average year.',
        exampleHeading: 'Worked example',
        exampleBody: 'Start with $10,000, add $500/month, earn a 7% real return. After 30 years you have about $620,000 in today\'s dollars. Bump the monthly contribution to $1,000 and the same scenario produces $1.18 million. The difference comes almost entirely from compounding the extra $500/month — the contributions themselves only add $180,000 more; the rest is growth.',
    },
    '/finance/retirement': {
        intro: 'Retirement planning is fundamentally a question of probability, not certainty. Historical market returns vary widely year to year, so a single-return projection can be wildly optimistic or pessimistic. A Monte Carlo simulation runs thousands of scenarios and tells you the realistic probability that your savings last as long as you do.',
        formulaHeading: 'How Monte Carlo and the 4% rule work together',
        formulaBody: 'The 4% rule says you can withdraw 4% of your starting portfolio in year one of retirement, then adjust for inflation each year, with a high probability of not running out over 30 years. The number comes from the Trinity Study, which back-tested historical sequences. Monte Carlo extends this idea: instead of assuming average returns, it randomly samples from historical volatility, runs the scenario 1,000+ times, and reports the percentage of trials in which your money lasts.',
        useHeading: 'When to use this calculator',
        useBody: 'Use it any time you\'re about to make a major retirement decision: choosing a target retirement age, deciding whether to take Social Security at 62 vs 67, evaluating whether you can afford to retire now. A success rate above 85% is generally considered safe; below 75% means you\'re under-saved or planning to over-spend, and you have decades of compounding to fix that if you act early.',
        exampleHeading: 'Worked example',
        exampleBody: 'A 40-year-old with $200,000 saved, contributing $1,500/month, planning to retire at 65 with $80,000/year of expenses (in today\'s dollars). Monte Carlo with a 60/40 portfolio shows roughly an 85-90% success rate over 30 years of retirement. Drop the contribution to $750/month and the success rate falls below 70% — a meaningful gap that\'s invisible in a single-return projection.',
    },
    '/finance/auto-loan': {
        intro: 'Car dealerships excel at quoting monthly payments while obscuring what you\'re actually financing. Sales tax, title, registration, and dealer fees can quietly add thousands. Trade-in value reduces what you finance — and in many states, also reduces taxable amount. The real number you should care about is your fully-loaded monthly payment.',
        formulaHeading: 'Auto loan amortization',
        formulaBody: 'Same as a mortgage: M = P × [r(1+r)^n] / [(1+r)^n − 1]. The variable to watch is P (financed amount), which equals (price − down payment − trade-in + sales tax + dealer fees). In about 40 US states, your trade-in reduces the taxable price as well — meaningful savings on a higher-priced car.',
        useHeading: 'When to use this calculator',
        useBody: 'Run it before you walk into a dealer. Decide your max monthly payment based on income — the conservative rule is that all car expenses (payment, insurance, gas, maintenance) should be under 15% of take-home pay. Then back into the price you can afford. Avoid 72+ month loans: they keep monthly payments low but leave you upside-down (owing more than the car is worth) for years.',
        exampleHeading: 'Worked example',
        exampleBody: 'A $35,000 vehicle with $5,000 down, an $8,000 trade-in, 7% sales tax, and a 60-month loan at 7%. Financed amount: $35,000 − $5,000 − $8,000 + tax. In a state where trade-in reduces taxable amount, the tax is 7% of ($35,000 − $8,000) = $1,890. Total financed: $23,890 → $473/month. Total paid: $28,393. Total interest: $4,503.',
    },
    '/finance/fire': {
        intro: 'Financial Independence, Retire Early (FIRE) is the practice of saving aggressively until your investments produce enough income to cover expenses indefinitely. The math is simpler than the discipline — but the math gives you the target.',
        formulaHeading: 'The FIRE number formula',
        formulaBody: 'FIRE Number = Annual Expenses × 25. This comes from the inverse of the 4% safe withdrawal rate (1 / 0.04 = 25). If you spend $50,000/year, you need $1.25 million invested. Time-to-FIRE is determined almost entirely by your savings rate, not your absolute income. At a 50% savings rate you can FIRE in roughly 17 years from $0; at 25% it takes about 32; at 70% it\'s about 9.',
        useHeading: 'When to use this calculator',
        useBody: 'Use it to set your target. Use it again to compare Lean FIRE (bare-bones expenses, ~$30-40K/year), regular FIRE (typical expenses), and Fat FIRE (comfortable retirement, $100K+/year). Coast FIRE is a useful intermediate concept: the savings level at which compound growth alone covers your retirement, even if you stop adding new contributions.',
        exampleHeading: 'Worked example',
        exampleBody: 'A household spending $60,000/year needs a FIRE number of $1.5 million. If they save $30,000/year (50% savings rate at $60K spending = $120K income) and earn a 7% real return, they hit $1.5M in roughly 16 years. Cut spending to $40,000 and the FIRE target drops to $1M while savings rises to $50,000/year — they reach it in about 12 years.',
    },
    '/finance/tax': {
        intro: 'US federal income tax is calculated in brackets, not as a flat percentage. The bracket you\'re \'in\' is your marginal rate — the rate on your last dollar earned. Your effective rate — total tax divided by total income — is always lower because lower brackets are taxed at lower rates.',
        formulaHeading: 'How federal tax brackets work',
        formulaBody: 'Each portion of your income is taxed at the rate of the bracket it falls into. For 2026, single filers pay 10% on the first ~$11,925, 12% on the portion from there up to ~$48,475, 22% from there to ~$103,350, and so on. The standard deduction (~$15,000 for single, ~$30,000 for married jointly in 2026) reduces taxable income before bracket calculations begin.',
        useHeading: 'When to use this calculator',
        useBody: 'Use it for take-home pay estimates after a salary change. Use it before December to see whether a Roth conversion makes sense at your current bracket. Use it before a year-end bonus to understand whether the bonus moves you into a higher bracket — it almost always doesn\'t move enough income to matter, despite the common myth.',
        exampleHeading: 'Worked example',
        exampleBody: 'A single filer earning $80,000 in 2026, taking the standard deduction. Taxable income: $65,000. Tax: 10% on the first $11,925 ($1,193) + 12% on $36,550 ($4,386) + 22% on $16,525 ($3,635) = about $9,214. That\'s a 14.2% effective rate even though they\'re \'in the 22% bracket.\'',
    },
    '/finance/debt-payoff': {
        intro: 'Two well-known debt payoff methods produce very different psychological experiences and slightly different financial outcomes. Snowball prioritizes the smallest balance first for early wins; avalanche prioritizes the highest interest rate for maximum interest savings.',
        formulaHeading: 'Snowball vs avalanche',
        formulaBody: 'Both methods pay minimums on every debt. Snowball directs every extra dollar to the smallest balance until paid off, then rolls that payment into the next smallest. Avalanche directs every extra dollar to the highest interest rate first. Avalanche always saves more money in absolute terms; snowball produces faster visible wins, which research suggests improves follow-through.',
        useHeading: 'When to use this calculator',
        useBody: 'Use it any time you have multiple debts. Plug in each balance, rate, and minimum payment, then choose your strategy. Run both side-by-side to see the actual dollar difference — for many people it\'s a few hundred to a few thousand dollars. If that gap is small relative to your total debt, snowball\'s behavioral advantage often wins; if the gap is large, avalanche\'s math wins.',
        exampleHeading: 'Worked example',
        exampleBody: 'Three debts: $1,000 at 22%, $5,000 at 18%, and $10,000 at 12%. With $500/month total payment, snowball clears the smallest first (in 3 months), creating an immediate sense of progress. Avalanche tackles the 22% card first too, saving the most on interest. In this case they happen to converge — when the highest rate also has a small balance, both methods agree.',
    },
    '/finance/rent-vs-buy': {
        intro: 'Whether to rent or buy is rarely just a math question, but the math matters. The most common mistake in rent-vs-buy comparisons is ignoring opportunity cost: money tied up in a down payment can\'t compound in the stock market. A real comparison accounts for that.',
        formulaHeading: 'What a real rent-vs-buy comparison includes',
        formulaBody: 'Buying costs include mortgage payment, property tax, insurance, maintenance (typically 1-2% of home value annually), HOA, and closing costs to sell (~6-8%). Renting costs include rent and renters insurance. The crucial extra: opportunity cost on the down payment. If you\'d otherwise invest that money, factor in 6-7% annual real returns. The result is a true monthly cost comparison.',
        useHeading: 'When to use this calculator',
        useBody: 'Use it before any home purchase decision, especially in expensive cities where price-to-rent ratios are high (above 20:1 typically favors renting). The breakeven horizon is typically 5-7 years; under that, transaction costs and forgone investment returns usually make renting win financially. Above 7-10 years and the math often flips.',
        exampleHeading: 'Worked example',
        exampleBody: 'A $500,000 home with 20% down vs renting an equivalent property for $2,500/month. Buying: ~$3,800/month total carrying cost. Renting: $2,500 + lost compound return on the $100,000 down payment (~$580/month at 7%). Net cost gap: about $720/month, in favor of renting. The home needs to appreciate roughly 1.7%/year just for buying to break even financially.',
    },
    '/health/bmi': {
        intro: 'Body Mass Index is the most widely used screening tool for weight-related health risk. It\'s also widely misunderstood. BMI is a population-level signal, not a precise individual diagnosis — but for most adults it\'s a reasonable starting point.',
        formulaHeading: 'The BMI formula',
        formulaBody: 'Metric: BMI = weight (kg) / height (m)². Imperial: BMI = (weight (lbs) × 703) / height (inches)². The result is a unitless number compared against WHO categories: under 18.5 is underweight, 18.5–24.9 is normal weight, 25.0–29.9 is overweight, 30.0+ is obese.',
        useHeading: 'When to use this calculator',
        useBody: 'Use it as a quick health screening check, especially when paired with waist circumference and a blood pressure reading. Be skeptical of the result if you\'re an athlete with significant muscle mass — BMI doesn\'t distinguish muscle from fat, so muscular bodies often score \'overweight\' despite low body fat. For older adults (65+), the optimal range tends to skew slightly higher than the standard categories.',
        exampleHeading: 'Worked example',
        exampleBody: 'A 5\'10" person weighing 175 lbs: BMI = (175 × 703) / 70² = 25.1. That puts them in the \'overweight\' category by exactly 0.1 — a useful illustration of why BMI categories shouldn\'t be treated as rigid clinical lines.',
    },
    '/health/calories': {
        intro: 'Calculating daily calorie needs is the foundation of any nutrition plan. Total Daily Energy Expenditure (TDEE) is the number of calories you actually burn — eating at TDEE maintains weight, below loses, above gains. The Mifflin-St Jeor equation is the most accurate of the common BMR formulas.',
        formulaHeading: 'BMR and TDEE formulas',
        formulaBody: 'Basal Metabolic Rate (BMR) is calories burned at complete rest. Mifflin-St Jeor for men: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5. For women: same but − 161 instead of + 5. TDEE = BMR × activity factor (1.2 sedentary, 1.375 light, 1.55 moderate, 1.725 active, 1.9 very active).',
        useHeading: 'When to use this calculator',
        useBody: 'Use it as the starting point for any cut, bulk, or maintenance phase. Eat at TDEE for two weeks and weigh yourself daily — if your weight is stable, your TDEE is accurate. Adjust by 250-500 calories/day to lose or gain about 0.5-1 lb/week. Aggressive deficits over 1,000 cals/day below TDEE work short-term but typically cause muscle loss and rebound.',
        exampleHeading: 'Worked example',
        exampleBody: 'A 30-year-old woman, 5\'6", 150 lbs (68 kg), 168 cm, moderately active. BMR: 10 × 68 + 6.25 × 168 − 5 × 30 − 161 = 1,419. TDEE: 1,419 × 1.55 = 2,200 calories/day. To lose 1 lb/week, eat ~1,700/day. To gain muscle, eat ~2,500/day with high protein.',
    },
    '/health/macro-split': {
        intro: 'Macros — protein, carbs, and fat — are the three energy-providing nutrients. Hitting the right macro targets matters more than chasing the perfect \'clean eating\' diet, especially if you\'re trying to lose fat while preserving muscle.',
        formulaHeading: 'How to set protein, carbs, and fat targets',
        formulaBody: 'Protein first: 0.7-1.0 g per pound of body weight (1.6-2.2 g/kg) for active adults. Each gram of protein has 4 calories. Fat second: 20-30% of total calories (each gram has 9 calories), set higher (30-35%) on low-carb plans. Carbs fill the rest of the calorie target — each gram has 4 calories, so divide remaining calories by 4.',
        useHeading: 'When to use this calculator',
        useBody: 'Use it any time your goal changes — cutting requires higher protein (preserves muscle in a deficit), bulking allows more carbs to fuel training. Use it after the first two weeks of a plan to recalibrate as your weight changes. Whole-food sources are better than the same macros from processed foods, but macro hitting is what drives body composition results.',
        exampleHeading: 'Worked example',
        exampleBody: 'A 180 lb (82 kg) lifter cutting on 2,200 calories: 180g protein (720 cal, 33%), 60g fat (540 cal, 25%), 235g carbs (940 cal, 42%). Adjust upward 100-150g of carbs on training days, hold protein constant, and the same person can recomp without changing weekly average calories.',
    },
    '/health/heart-rate': {
        intro: 'Heart rate zones translate cardiovascular training intensity into something you can actually monitor mid-workout. The five-zone model separates easy aerobic work from threshold sessions and maximal efforts — different zones produce different physiological adaptations.',
        formulaHeading: 'Calculating max HR and the five zones',
        formulaBody: 'Max HR estimates: 220 − age (simple) or 211 − 0.64 × age (Tanaka, more accurate). Zones as % of max: Zone 1 (recovery) 50-60%, Zone 2 (aerobic) 60-70%, Zone 3 (tempo) 70-80%, Zone 4 (threshold) 80-90%, Zone 5 (VO2max) 90-100%. The Karvonen method uses heart rate reserve (HRR = max HR − resting HR) for individuals with notably high or low resting HR.',
        useHeading: 'When to use this calculator',
        useBody: 'Use it to plan endurance training. Most well-designed endurance programs spend 80% of time in Zone 2 — the conversational pace that builds aerobic base and mitochondrial density — and 20% in Zones 4-5. Use the calculator to find your specific BPM ranges, then train inside them rather than going by perceived effort alone.',
        exampleHeading: 'Worked example',
        exampleBody: 'A 35-year-old with a resting HR of 60. Tanaka max HR: 211 − 0.64 × 35 = 188 bpm. Zone 2 (60-70%): 113-132 bpm. Zone 4 (80-90%): 150-169 bpm. Karvonen Zone 2 with HRR: ((188 − 60) × 0.65) + 60 = 143 bpm midpoint, slightly higher than the simple % method — typical for fit individuals.',
    },
    '/productivity/salary-hourly': {
        intro: 'Converting between annual salary and hourly rate sounds simple but trips people up because of vacation, holidays, and the difference between worked and paid hours. The conversion you want depends on whether you\'re comparing job offers or calculating freelance rates.',
        formulaHeading: 'The conversion formulas',
        formulaBody: 'Salary to hourly: divide annual salary by 2,080 (40 hours × 52 weeks). Hourly to salary: multiply hourly rate by 2,080. To compare a salaried job (typically with paid time off) to an hourly job (often without), subtract unpaid vacation hours from 2,080 in the hourly direction. To compare full-time employment to freelancing, divide by 1,000-1,500 actual billable hours instead.',
        useHeading: 'When to use this calculator',
        useBody: 'Use it when evaluating job offers in different formats (one offer in salary, another in hourly). Use it when negotiating raises — knowing your hourly equivalent makes overtime conversations more concrete. Use it when considering a switch to freelancing: the equivalent hourly rate is typically 1.5-2× the W-2 hourly because freelancers pay self-employment tax, healthcare, and unbillable time.',
        exampleHeading: 'Worked example',
        exampleBody: '$75,000/year ÷ 2,080 = $36.06/hour for a full-time W-2 role. As a freelancer, the equivalent rate is roughly $54-72/hour to net the same after self-employment tax (15.3% extra), healthcare (~$8K/year out of pocket), unpaid time off (~3 weeks), and downtime between clients.',
    },
    '/productivity/percentage': {
        intro: 'Percentages show up in retail discounts, tax brackets, tipping, statistics, and finance — and the three operations look similar but mean different things. The calculator covers all three: percentage of, percent change, and percent difference.',
        formulaHeading: 'Three percentage formulas',
        formulaBody: 'Percentage of a number: (X / 100) × Y. So 20% of 80 = 0.20 × 80 = 16. Percent change: (new − old) / old × 100. From 50 to 75 is +50%, from 75 to 50 is −33%. Percent difference (symmetric): |a − b| / ((a + b) / 2) × 100. Use this when neither value is the baseline.',
        useHeading: 'When to use this calculator',
        useBody: 'Use \'percentage of\' for tips, sales tax, and discount calculations. Use \'percent change\' for tracking growth — revenue, weight, anything with a clear before-and-after. Use \'percent difference\' when comparing two measurements that don\'t have a \'first\' (the diameter of two pipes, the height of two people).',
        exampleHeading: 'Worked example',
        exampleBody: 'A laptop drops from $1,200 to $999. Percent change: (999 − 1,200) / 1,200 × 100 = −16.75%. Percent difference: |1,200 − 999| / ((1,200 + 999) / 2) × 100 = 18.3%. Different numbers, both correct — they answer different questions.',
    },
    '/productivity/tip-calculator': {
        intro: 'Tipping conventions differ wildly by country and by service type. In the US, tipping is essentially mandatory for table service. In much of Europe and Asia, it\'s appreciated but rarely expected — and adding 20% can occasionally come across as offensive.',
        formulaHeading: 'How tips and bill splits are calculated',
        formulaBody: 'Tip = bill × (tip percent / 100). Total = bill + tip. Per person = total / number of people. For uneven splits where each person ordered different amounts, calculate each person\'s pre-tip subtotal, multiply each by (1 + tip percent / 100), then add tax to each.',
        useHeading: 'When to use this calculator',
        useBody: 'Use it for restaurant bills (15-20% standard in the US, less elsewhere). Use it for ride shares, food delivery, and other service tipping. The bill-split feature is most useful for large groups where mental math gets complicated, especially with mixed orders and a single check.',
        exampleHeading: 'Worked example',
        exampleBody: 'A $87.50 dinner bill at 20% tip: tip = $17.50, total = $105. Split four ways: $26.25 per person. With a \'round up\' option, each person could pay $27 and the slight overage goes to the server.',
    },
};

export function getCopyForPath(path: string): CalculatorCopy | undefined {
    return CALCULATOR_COPY[path];
}