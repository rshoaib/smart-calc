/**
 * Centralised FAQ registry for calculator pages.
 *
 * Each calculator path maps to a list of question/answer pairs that get
 * emitted as FAQPage JSON-LD via `buildFaqJsonLd`. Google may surface these
 * as rich-result FAQ snippets in the SERP.
 */

export interface CalculatorFaq {
    question: string;
    answer: string;
}

export const CALCULATOR_FAQS: Record<string, CalculatorFaq[]> = {
    '/finance/mortgage': [
        {
            question: 'How is a mortgage payment calculated?',
            answer: 'The standard formula is M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the number of monthly payments (years × 12). Add property tax, insurance, and PMI on top to get your true PITI payment.',
        },
        {
            question: 'What does PITI stand for?',
            answer: 'PITI is Principal, Interest, Taxes, and Insurance — the four components of a typical monthly mortgage payment. Lenders include all four when assessing whether you qualify, so you should too when budgeting.',
        },
        {
            question: 'When do I have to pay PMI?',
            answer: 'Private Mortgage Insurance is typically required when your down payment is less than 20% on a conventional loan. PMI usually drops off automatically once your loan-to-value ratio reaches 78%, or you can request removal at 80% LTV.',
        },
        {
            question: 'Should I choose a 15-year or 30-year mortgage?',
            answer: 'A 15-year mortgage has higher monthly payments but a lower interest rate and can save tens of thousands in total interest. A 30-year offers a lower monthly payment and more flexibility. Run both scenarios in the calculator and compare total interest paid.',
        },
        {
            question: 'How much house can I afford?',
            answer: 'A common rule is the 28/36 rule: housing should be ≤28% of gross monthly income, and total debt ≤36%. Use the calculator to back into a home price that keeps your full PITI within that limit.',
        },
    ],
    '/finance/investment': [
        {
            question: 'How does compound interest work?',
            answer: 'Compound interest means you earn returns on both your original principal and on previously earned interest. Each period, your gains compound on a larger base — which is why long time horizons matter so much for wealth building.',
        },
        {
            question: 'What is a realistic stock market return?',
            answer: 'The S&P 500 has historically averaged about 10% nominal and ~7% after inflation over very long periods. For planning, most advisors use 6-7% real returns to stay conservative.',
        },
        {
            question: 'How does inflation affect my investment returns?',
            answer: 'Inflation erodes purchasing power. A 7% nominal return with 3% inflation is a 4% real return. Always plan in real (inflation-adjusted) dollars when projecting decades into the future.',
        },
        {
            question: 'What\'s the difference between simple and compound interest?',
            answer: 'Simple interest is calculated only on the principal each period. Compound interest is calculated on principal plus accumulated interest, accelerating growth over time.',
        },
    ],
    '/finance/inflation': [
        {
            question: 'How is inflation calculated?',
            answer: 'Inflation is the percentage change in the Consumer Price Index (CPI) — a basket of goods and services tracked by the Bureau of Labor Statistics. Year-over-year CPI change gives the inflation rate.',
        },
        {
            question: 'What is $100 in 1980 worth today?',
            answer: 'Roughly $375-$400 in 2026 dollars, depending on the month. Use the calculator to get an exact value for any base year.',
        },
        {
            question: 'Why does $1 buy less every year?',
            answer: 'When the supply of money grows faster than the supply of goods and services, each dollar chases more goods and prices rise. Mild inflation (~2%) is generally targeted by central banks; runaway inflation erodes savings rapidly.',
        },
    ],
    '/finance/auto-loan': [
        {
            question: 'How is an auto loan payment calculated?',
            answer: 'Same formula as a mortgage: M = P × [r(1+r)^n] / [(1+r)^n − 1]. P is the financed amount (price − down payment − trade-in + sales tax + fees), r is the monthly rate, n is the number of monthly payments.',
        },
        {
            question: 'Should I include sales tax in my auto loan?',
            answer: 'In most US states you can roll sales tax into the loan, which makes your monthly payment higher but lets you keep more cash. Paying tax up front saves on interest charges.',
        },
        {
            question: 'How does a trade-in affect my loan?',
            answer: 'Trade-in value reduces the amount you finance. Some states also reduce the taxable amount by your trade-in (a \'tax credit\') — a meaningful savings on a bigger purchase.',
        },
        {
            question: 'What\'s a good auto loan term?',
            answer: '48-60 months is typically the sweet spot. Loans longer than 72 months often leave you upside-down (owing more than the car is worth) for years.',
        },
    ],
    '/finance/loan': [
        {
            question: 'How do extra payments reduce total interest?',
            answer: 'Extra payments go directly to principal, shrinking the balance that future interest is calculated on. Even small extra payments early in the loan can save years of payments and significant interest.',
        },
        {
            question: 'What is loan amortization?',
            answer: 'Amortization is the process of paying off a loan with regular payments split between principal and interest. Early payments are mostly interest; later payments are mostly principal.',
        },
        {
            question: 'Can I pay off a loan early without penalty?',
            answer: 'Most modern personal loans and auto loans allow penalty-free early payoff. Check your loan agreement for any prepayment penalty clauses, especially on older mortgages.',
        },
    ],
    '/finance/retirement': [
        {
            question: 'What is a Monte Carlo retirement simulation?',
            answer: 'Instead of assuming a fixed annual return, Monte Carlo runs thousands of scenarios with randomized returns based on historical volatility. The result is a probability of success — for example, \'85% chance your portfolio survives 30 years\' — which is far more realistic than a single-return projection.',
        },
        {
            question: 'How much do I need to retire?',
            answer: 'A common rule is the 25× rule: save 25 times your annual expenses. That\'s the inverse of the 4% safe withdrawal rate. So if you spend $50,000/year, you need ~$1.25 million invested.',
        },
        {
            question: 'What is the 4% rule?',
            answer: 'The 4% rule says you can withdraw 4% of your portfolio in your first year of retirement and adjust for inflation each year, with a high probability of not running out over 30 years. It\'s a starting point, not a guarantee.',
        },
        {
            question: 'Should I include Social Security in my retirement plan?',
            answer: 'Yes — Social Security is a meaningful part of most retirees\' income. The calculator lets you add expected benefits so the portfolio only needs to cover the gap above Social Security.',
        },
    ],
    '/finance/debt-payoff': [
        {
            question: 'What is the debt snowball method?',
            answer: 'Pay minimums on every debt, then put every extra dollar on the smallest balance until it\'s gone. Once the smallest is paid, roll its payment into the next smallest. Built around behavioral wins — quick payoffs build momentum.',
        },
        {
            question: 'What is the debt avalanche method?',
            answer: 'Pay minimums on every debt, then put every extra dollar on the highest interest rate. Mathematically optimal — saves the most in total interest — but slower visible wins than snowball.',
        },
        {
            question: 'Which is better, snowball or avalanche?',
            answer: 'Avalanche saves more money. Snowball is more motivating. If you\'ve struggled to stick with a debt plan, snowball\'s quick wins win in practice. If you\'re disciplined, go avalanche.',
        },
    ],
    '/finance/tax': [
        {
            question: 'What\'s the difference between marginal and effective tax rate?',
            answer: 'Marginal rate is the tax rate on your last dollar of income (the bracket you\'re in). Effective rate is your total tax divided by total income — always lower than your marginal rate because lower brackets are taxed at lower rates.',
        },
        {
            question: 'What is the 2026 standard deduction?',
            answer: 'For 2026, the standard deduction is approximately $15,000 single, $30,000 married filing jointly. Use this calculator for current-year exact values.',
        },
        {
            question: 'How does income tax bracket creep work?',
            answer: 'When your income rises into a new bracket, only the portion above the bracket threshold is taxed at the higher rate. You don\'t pay the higher rate on your full income — a common misconception.',
        },
    ],
    '/finance/time-to-millionaire': [
        {
            question: 'How long does it take to become a millionaire?',
            answer: 'Saving $1,000/month at a 7% annual return gets you to $1M in about 28 years from $0. Higher contributions or higher returns shorten the timeline meaningfully — try different scenarios in the calculator.',
        },
        {
            question: 'Is $1 million enough to retire?',
            answer: 'At a 4% safe withdrawal rate, $1M generates $40,000/year in retirement income. Whether that\'s enough depends entirely on your spending. For many people, $1.5-3M is a more realistic target.',
        },
    ],
    '/finance/rent-vs-buy': [
        {
            question: 'Is it better to rent or buy a house?',
            answer: 'It depends on how long you\'ll stay, local price-to-rent ratios, and what you\'d do with the down payment if you rented. The breakeven horizon is typically 5-7 years; under that, renting usually wins financially.',
        },
        {
            question: 'What is opportunity cost in a rent-vs-buy comparison?',
            answer: 'Money tied up in a down payment can\'t be invested elsewhere. A real comparison must account for what that capital would have earned in the market — typically modeled as 6-7% annually.',
        },
        {
            question: 'What costs do homeowners forget to budget for?',
            answer: 'Maintenance (1-2% of home value annually), HOA, property taxes, homeowners insurance, closing costs to sell (~6-8%), and repairs. Add them all up before assuming buying is automatically cheaper.',
        },
    ],
    '/finance/fire': [
        {
            question: 'What is FIRE?',
            answer: 'FIRE stands for Financial Independence, Retire Early. The core idea: save aggressively (often 50%+ of income) until your investments produce enough income to cover expenses indefinitely.',
        },
        {
            question: 'What is the FIRE number?',
            answer: 'Your FIRE number is 25 times your annual expenses — the savings level at which the 4% safe withdrawal rule supports your lifestyle indefinitely.',
        },
        {
            question: 'What\'s the difference between Lean FIRE, Fat FIRE, and Coast FIRE?',
            answer: 'Lean FIRE = enough to cover bare-bones expenses (~$30-40K/year). Fat FIRE = comfortable retirement ($100K+/year). Coast FIRE = enough invested today that compound growth alone covers your retirement, even if you stop adding new contributions.',
        },
        {
            question: 'How does savings rate affect time to FIRE?',
            answer: 'Savings rate is the most powerful lever. At 50% savings rate you can FIRE in ~17 years; at 70% in ~9 years; at 25% it takes ~32 years. The math comes from your savings rate alone, not your income level.',
        },
    ],
    '/finance/freelance-rate': [
        {
            question: 'How much should I charge as a freelancer?',
            answer: 'Take your target salary, add ~30% for self-employment taxes, ~$10K-20K for healthcare, retirement, and unpaid time off. Divide by your billable hours (typically 1,000-1,500 per year, not 2,080). The result is often 1.5-2× your equivalent W-2 hourly rate.',
        },
        {
            question: 'Why are freelance rates so much higher than W-2 hourly?',
            answer: 'Freelancers cover their own taxes (15.3% extra self-employment tax), healthcare, retirement, sick days, vacation, business expenses, and downtime between clients. None of those are baked into your W-2 hourly figure.',
        },
        {
            question: 'How many billable hours per year should I plan for?',
            answer: '1,000-1,500 is realistic for most freelancers. The remaining hours go to admin, sales, learning, and unpaid time. Aiming for 2,000+ billable hours leads to burnout.',
        },
    ],
    '/finance/roi': [
        {
            question: 'What is the difference between ROI and ROAS?',
            answer: 'ROI = (gain − cost) / cost, applied to any investment. ROAS = revenue / ad spend, specifically for marketing. ROAS doesn\'t account for product cost; ROI does. A 4× ROAS can still be unprofitable if margins are thin.',
        },
        {
            question: 'What\'s a good ROAS?',
            answer: 'Highly category-dependent. SaaS often runs 3-5×, e-commerce typically aims for 4×+, agency clients often demand 5-10×. The right number is whatever covers product cost, overhead, and your target margin.',
        },
        {
            question: 'How do I annualize a return?',
            answer: 'Use (1 + total return)^(1/years) − 1. A 50% return over 3 years is a 14.5% annualized return, not 16.7% (which would be the simple average).',
        },
    ],
    '/finance/savings-goal': [
        {
            question: 'How much should I save each month?',
            answer: 'Work backward from your goal: needed amount ÷ months until target = base contribution, before interest. The calculator factors in interest so you can save less if your money is invested.',
        },
        {
            question: 'Where should I keep my savings goal money?',
            answer: 'Short-term goals (under 2 years): high-yield savings or money market. Medium-term (3-5 years): mix of bonds and conservative funds. Long-term (5+ years): broadly diversified equity index funds.',
        },
    ],
    '/finance/emergency': [
        {
            question: 'How big should my emergency fund be?',
            answer: 'A common rule is 3-6 months of essential expenses. Single income, less stable job, or dependents → lean toward 6-12. Dual income, stable job, no dependents → 3 may be enough.',
        },
        {
            question: 'Where should I keep my emergency fund?',
            answer: 'High-yield savings account (HYSA) — easily accessible, FDIC insured, currently earning 4-5%. Don\'t invest emergency money in stocks; the whole point is it\'s there in a downturn when stocks may also be down.',
        },
        {
            question: 'Should I pay off debt before building an emergency fund?',
            answer: 'Build a small starter fund ($1,000-$2,000) first, then attack high-interest debt, then build up to your full target. Without any cushion, the next surprise puts you back into debt.',
        },
    ],
    '/health/bmi': [
        {
            question: 'What is the BMI formula?',
            answer: 'Metric: weight (kg) ÷ height (m) squared. Imperial: (weight (lbs) × 703) ÷ height (inches) squared. The result is dimensionless — just a number to compare against WHO categories.',
        },
        {
            question: 'What is a healthy BMI range?',
            answer: 'WHO defines 18.5-24.9 as \'normal weight.\' Below 18.5 is underweight, 25-29.9 is overweight, 30+ is obese. These categories are population averages; individual context matters.',
        },
        {
            question: 'Why is BMI inaccurate for athletes?',
            answer: 'BMI doesn\'t distinguish muscle from fat. A muscular athlete may have a BMI in the \'overweight\' or \'obese\' range while having very low body fat. For individuals, body fat percentage is more meaningful than BMI alone.',
        },
        {
            question: 'Is BMI different for men and women?',
            answer: 'The standard BMI formula and ranges are the same for adult men and women. However, body fat composition does differ: women typically carry slightly more body fat at the same BMI.',
        },
    ],
    '/health/calories': [
        {
            question: 'What is TDEE?',
            answer: 'Total Daily Energy Expenditure — the calories you burn per day at your current activity level. TDEE = BMR × activity factor. Eat at TDEE to maintain weight, below to lose, above to gain.',
        },
        {
            question: 'What is the Mifflin-St Jeor equation?',
            answer: 'The most widely used BMR (basal metabolic rate) formula. Men: 10×weight(kg) + 6.25×height(cm) − 5×age + 5. Women: same but − 161 instead of + 5. Multiply by activity factor for TDEE.',
        },
        {
            question: 'How many calories should I eat to lose weight?',
            answer: 'A 500 calorie/day deficit produces about 1 lb/week of weight loss. Aggressive cuts (1,000+ deficit) work short-term but commonly lead to muscle loss and rebound. Slow and sustainable wins.',
        },
        {
            question: 'How accurate are calorie calculators?',
            answer: 'Within ±10-15% for most people. They\'re a starting point — track your weight for 2-3 weeks at a given intake and adjust based on actual results.',
        },
    ],
    '/health/macro-split': [
        {
            question: 'How much protein should I eat per day?',
            answer: 'For active adults: 0.7-1.0 g per pound of body weight (1.6-2.2 g/kg). Higher when cutting (to preserve muscle) or training heavily. Above ~1.0 g/lb has diminishing returns for most people.',
        },
        {
            question: 'What macro split is best for fat loss?',
            answer: 'High protein is the priority (preserves muscle in a deficit). After protein, the carb/fat split is largely personal preference — both work as long as you\'re in a calorie deficit.',
        },
        {
            question: 'What\'s the difference between IIFYM and clean eating?',
            answer: 'If It Fits Your Macros (IIFYM) prioritizes hitting daily protein/carb/fat targets regardless of food source. Clean eating focuses on whole foods. Both work; IIFYM is more flexible, clean eating tends to be more nutrient-dense.',
        },
    ],
    '/health/1rm': [
        {
            question: 'What is the Epley 1RM formula?',
            answer: '1RM = weight × (1 + reps/30). It\'s the most common formula in strength training apps. Slightly overestimates compared to Brzycki for very high rep sets.',
        },
        {
            question: 'Which 1RM formula is most accurate?',
            answer: 'All formulas converge below ~5 reps and diverge above ~10. Epley and Brzycki are the most popular; for very strong athletes, Lombardi sometimes fits better. Use multiple formulas and average them.',
        },
        {
            question: 'Should I actually test my 1RM?',
            answer: 'For most lifters, no — too injury-prone, hard to recover from. Estimate from a 3-5 rep max set instead. Powerlifters peaking for a meet are an exception.',
        },
    ],
    '/health/heart-rate': [
        {
            question: 'How do I calculate my max heart rate?',
            answer: 'Common formulas: 220 − age (simple but imprecise) or 211 − 0.64 × age (Tanaka, more accurate). The most accurate is to test it — but a max HR test is exhausting and risky for untrained people.',
        },
        {
            question: 'What is Zone 2 training?',
            answer: 'Low-intensity aerobic training, typically 60-70% of max HR — the pace where you can hold a conversation. Builds aerobic base, mitochondrial density, and fat oxidation. Most endurance athletes spend 80% of their training time in Zone 2.',
        },
        {
            question: 'What is the Karvonen heart rate formula?',
            answer: 'Karvonen uses heart rate reserve (HRR) instead of just max HR. Target HR = ((max HR − resting HR) × intensity %) + resting HR. More accurate for fit individuals because it accounts for resting HR differences.',
        },
    ],
    '/health/sleep': [
        {
            question: 'How long is a sleep cycle?',
            answer: 'About 90 minutes on average. A full night includes 4-6 cycles. Each cycle moves through light, deep, and REM stages — waking at the END of a cycle (light sleep) feels far less groggy than waking mid-cycle.',
        },
        {
            question: 'How many hours of sleep do adults need?',
            answer: 'Most adults need 7-9 hours per night. The sleep cycle calculator targets 5-6 cycles (7.5-9 hours) and adds 14 minutes for time to fall asleep.',
        },
        {
            question: 'Why do I wake up groggy at the same time every day?',
            answer: 'If you set a fixed wake time but bedtime drifts, you\'re often waking mid-cycle. Try shifting bedtime by 15-30 minute increments to find the time that lets you wake at the end of a cycle.',
        },
    ],
    '/health/pregnancy-due-date': [
        {
            question: 'How is the due date calculated?',
            answer: 'From last menstrual period (LMP): add 280 days (40 weeks). From conception date: add 266 days (38 weeks). The LMP method is more common because most people remember their period start date better than ovulation.',
        },
        {
            question: 'How accurate is the due date?',
            answer: 'Only about 4-5% of babies are born on their exact due date. Most arrive within a 2-week window before or after. First-trimester ultrasound dating is more accurate than LMP-based.',
        },
        {
            question: 'What is gestational age vs fetal age?',
            answer: 'Gestational age counts from the first day of LMP, two weeks before conception. Fetal age counts from conception. So a \'12-week pregnancy\' (gestational) means the fetus is 10 weeks old.',
        },
    ],
    '/productivity/pomodoro': [
        {
            question: 'What is the Pomodoro Technique?',
            answer: 'A time-management method invented by Francesco Cirillo in the late 1980s. Work for 25 minutes (one \'pomodoro\'), then take a 5-minute break. After four pomodoros, take a longer 15-30 minute break.',
        },
        {
            question: 'Why does Pomodoro work?',
            answer: 'It chunks work into manageable, finite intervals — easier to start when you only commit to 25 minutes. Regular breaks prevent decision fatigue and protect deep focus. The visible progress also creates momentum.',
        },
        {
            question: 'Can I customize the intervals?',
            answer: 'Yes. The classic 25/5 split is a default, not a rule. Common variations: 50/10 for deep technical work, 90/20 (matching ultradian cycles) for creative work. Try a few and find what fits.',
        },
    ],
    '/productivity/salary-hourly': [
        {
            question: 'How do I convert salary to hourly?',
            answer: 'Divide annual salary by 2,080 (40 hours × 52 weeks). $50,000/year = $24.04/hour. Adjust for actual paid hours worked if your week isn\'t 40 hours.',
        },
        {
            question: 'How do I convert hourly to salary?',
            answer: 'Multiply hourly rate by 2,080 for full-time. $25/hour = $52,000/year before taxes.',
        },
        {
            question: 'Should I include vacation in the conversion?',
            answer: 'Salaried positions usually include paid vacation in the annual figure. Hourly workers typically don\'t get paid for time off. To compare apples to apples, subtract unpaid vacation hours from 2,080 when computing the equivalent hourly rate.',
        },
    ],
    '/productivity/meeting-cost': [
        {
            question: 'How is meeting cost calculated?',
            answer: 'Sum the per-hour fully-loaded cost of each attendee (salary × benefits multiplier ÷ working hours per year), then multiply by meeting duration. A 1-hour meeting with five $150K engineers can easily cost $500-700.',
        },
        {
            question: 'What\'s a good rule for whether to hold a meeting?',
            answer: 'Could it be an email or async doc? If yes, send the doc. If genuinely interactive, set a tight agenda, invite only essential people, and end early when done.',
        },
    ],
    '/productivity/percentage': [
        {
            question: 'How do I calculate X% of Y?',
            answer: 'Multiply Y by X/100. For example, 20% of 80 = 80 × 0.20 = 16.',
        },
        {
            question: 'What is the percent change formula?',
            answer: 'Percent change = (new − old) / old × 100. From 50 to 75 is (75−50)/50 = 50% increase. From 75 to 50 is −33%.',
        },
        {
            question: 'What\'s the difference between percent change and percent difference?',
            answer: 'Percent change has a direction (from old to new). Percent difference is symmetric: |a − b| / ((a + b) / 2) × 100. Use percent difference when neither value is the \'baseline.\'',
        },
    ],
    '/productivity/gpa': [
        {
            question: 'How is GPA calculated?',
            answer: 'Multiply each course\'s grade points by its credit hours, sum across all courses, then divide by total credit hours. A 4-credit A (4.0) and a 3-credit B (3.0) → (16 + 9) / 7 = 3.57 GPA.',
        },
        {
            question: 'What is the difference between weighted and unweighted GPA?',
            answer: 'Unweighted caps at 4.0 regardless of course difficulty. Weighted adds bonus points for honors/AP/IB courses (commonly capping at 4.5 or 5.0). Most colleges recompute applicants\' GPAs on their own scale anyway.',
        },
        {
            question: 'What\'s a good GPA?',
            answer: '3.5+ is competitive for most colleges. 3.7+ is competitive for top-50 schools. But context matters — admissions look at course rigor, trajectory, and the strength of your school\'s grading scale.',
        },
    ],
    '/productivity/typing-speed': [
        {
            question: 'What is a good typing speed in WPM?',
            answer: 'Average is 40 WPM. 60+ is fast. 80+ is very fast. Professional typists and skilled programmers often hit 90-120 WPM. Most office work doesn\'t require top speed — accuracy matters more.',
        },
        {
            question: 'How is WPM calculated?',
            answer: '(Characters typed correctly / 5) / minutes. The \'5 characters per word\' standard makes WPM comparable across languages and texts of different word lengths.',
        },
    ],
    '/productivity/tip-calculator': [
        {
            question: 'How much should I tip?',
            answer: 'In the US: 15% standard, 18-20% for good service, 25%+ for excellent. Many countries don\'t expect tipping at all (Japan, much of continental Europe), and some add service charges to the bill — always check before adding more.',
        },
        {
            question: 'How do I split a tip evenly?',
            answer: '(Bill + tip) ÷ number of people. The calculator handles this automatically. For uneven splits (different orders), itemize first then add a uniform tip percentage on top of each person\'s share.',
        },
    ],
    '/productivity/word-counter': [
        {
            question: 'How is reading time calculated?',
            answer: 'Most reading-time estimates assume 200-250 words per minute, the average adult silent reading speed. Technical or dense text trends slower (100-150 WPM); skimming runs 400+ WPM.',
        },
        {
            question: 'What counts as a word?',
            answer: 'Sequences of characters separated by whitespace. The calculator splits on whitespace and counts non-empty tokens. Hyphenated words count as one; contractions like \'don\'t\' also count as one.',
        },
    ],
    '/productivity/age': [
        {
            question: 'How do I calculate my age in days?',
            answer: 'Subtract your birth date from today. The calculator handles leap years and calendar variations automatically. Roughly: years × 365.25.',
        },
        {
            question: 'What zodiac sign am I?',
            answer: 'Western zodiac is determined by the sun\'s position on your birth date. The age calculator can show your sign alongside age details.',
        },
    ],
    '/productivity/date-difference': [
        {
            question: 'How do I calculate the number of days between two dates?',
            answer: 'Subtract the earlier date from the later date. The calculator handles leap years and time zones, and can also exclude weekends if you only want business days.',
        },
        {
            question: 'What are business days?',
            answer: 'Monday through Friday, excluding public holidays. The calculator\'s business-days mode skips weekends; toggle holidays separately if your jurisdiction requires.',
        },
    ],
    '/productivity/unit-converter': [
        {
            question: 'How do I convert Celsius to Fahrenheit?',
            answer: '(°C × 9/5) + 32 = °F. Quick mental version: double the Celsius value and add 30 for a rough estimate.',
        },
        {
            question: 'How do I convert kilometers to miles?',
            answer: 'Multiply km by 0.621. So 100 km ≈ 62.1 miles. The reverse: miles × 1.609 = km.',
        },
        {
            question: 'How do I convert kilograms to pounds?',
            answer: 'kg × 2.205 = lbs. Quick mental version: double the kg value and add 10%.',
        },
    ],
    '/finance/net-worth': [
        {
            question: 'What is net worth?',
            answer: 'Net worth is the total dollar value of everything you own (assets) minus everything you owe (liabilities). It\'s the single best summary number for your overall financial health.',
        },
        {
            question: 'How do I calculate my net worth?',
            answer: 'List every asset (cash, investments, retirement accounts, real estate, vehicles) and every liability (mortgage, auto loans, student loans, credit cards). Sum each side, then subtract liabilities from assets.',
        },
        {
            question: 'What\'s a good net worth for my age?',
            answer: 'Common benchmarks: 1× annual salary by 30, 3× by 40, 6× by 50, 10× by retirement. These are guideposts, not requirements — context (income, location, kids, debt level) varies hugely.',
        },
        {
            question: 'Should I include my house in net worth?',
            answer: 'Yes — at current market value, with the remaining mortgage as a separate liability. The home is an asset; the mortgage is a debt against it. Both belong on the balance sheet.',
        },
    ],
    '/finance/budget': [
        {
            question: 'What is the 50/30/20 budget rule?',
            answer: 'A simple budgeting framework popularized by Senator Elizabeth Warren: spend 50% of after-tax income on needs, 30% on wants, and save or invest 20%. The simplicity is the point — most people fail at detailed budgeting but can stick to three numbers.',
        },
        {
            question: 'What counts as a "need" vs a "want"?',
            answer: 'Needs: rent or mortgage, utilities, groceries, basic transportation, minimum debt payments, insurance. Wants: dining out, streaming subscriptions, hobbies, travel, non-essential shopping. The litmus test: would your life be meaningfully harder without it?',
        },
        {
            question: 'Is 50/30/20 realistic in expensive cities?',
            answer: 'In high-cost-of-living areas, needs often consume 60-70% of take-home pay. Adjust the ratios — 60/20/20 is more honest in San Francisco or NYC. The savings target should be the last thing you cut.',
        },
        {
            question: 'Should the 20% savings include retirement contributions?',
            answer: 'Yes. Pre-tax 401(k) contributions effectively count, since the rule is based on take-home pay (which already excludes those contributions). Add Roth, brokerage, and emergency fund contributions to hit the 20% target.',
        },
    ],
    '/productivity/time-card': [
        {
            question: 'How do I calculate hours worked from clock-in and clock-out times?',
            answer: 'Subtract clock-in time from clock-out time, then subtract any unpaid breaks. For overnight shifts, add 24 hours to the clock-out time before subtracting. The calculator handles both automatically.',
        },
        {
            question: 'How is overtime pay calculated?',
            answer: 'Federal law (FLSA) requires 1.5× the regular rate for hours over 40 in a workweek for non-exempt employees. Some states have daily overtime rules too — California, for example, requires 1.5× over 8 hours/day and 2× over 12 hours/day.',
        },
        {
            question: 'Does the time card calculator handle overnight shifts?',
            answer: 'Yes. If your clock-out time is earlier than your clock-in time, the calculator assumes you crossed midnight and adds 24 hours.',
        },
        {
            question: 'Should I include lunch breaks?',
            answer: 'In the US, unpaid breaks of 30+ minutes generally aren\'t counted toward worked hours. Short paid rest breaks (5-15 minutes) typically are. Subtract any unpaid break time in the "break" field.',
        },
    ],
    '/health/body-fat': [
        {
            question: 'What is the US Navy body fat formula?',
            answer: 'For men: 86.010 × log10(waist − neck) − 70.041 × log10(height) + 36.76. For women: 163.205 × log10(waist + hip − neck) − 97.684 × log10(height) − 78.387. All measurements in inches.',
        },
        {
            question: 'How accurate is the US Navy method?',
            answer: 'Within ±3-4% body fat compared to DEXA scan for most people, which is good enough for tracking progress. It\'s less accurate at extremes — very lean (<8% men, <15% women) or very high body fat — but excellent for the typical range.',
        },
        {
            question: 'What body fat percentage is healthy?',
            answer: 'Men: 10-20% is generally healthy; 6-13% is athletic. Women: 18-28% is healthy; 14-20% is athletic. Below ~5% (men) or ~13% (women) is essential fat — going lower is dangerous and not sustainable.',
        },
        {
            question: 'Why does the female formula include hip measurement?',
            answer: 'Women carry proportionally more fat in the hips and thighs (gluteofemoral fat). Including hip measurement makes the formula far more accurate for women than waist + neck alone.',
        },
    ],
};

export function getFaqsForPath(path: string): CalculatorFaq[] {
    return CALCULATOR_FAQS[path] ?? [];
}