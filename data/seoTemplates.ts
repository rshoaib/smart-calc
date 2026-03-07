// Programmatic SEO page definitions for DailySmartCalc
// Each array generates a set of long-tail landing pages targeting specific search queries.

// ─── "What is X% of Y?" pages ───────────────────────────────────────
// Top 100+ most-searched percentage combos
export const percentagePages = [
    // Core combos (y=100)
    { x: 3, y: 100 }, { x: 5, y: 100 }, { x: 8, y: 100 }, { x: 10, y: 100 },
    { x: 12, y: 100 }, { x: 15, y: 100 }, { x: 20, y: 100 }, { x: 25, y: 100 },
    { x: 30, y: 100 }, { x: 33, y: 100 }, { x: 40, y: 100 }, { x: 50, y: 100 },
    { x: 60, y: 100 }, { x: 70, y: 100 }, { x: 75, y: 100 }, { x: 80, y: 100 },
    { x: 90, y: 100 },
    // y=50
    { x: 10, y: 50 }, { x: 15, y: 50 }, { x: 20, y: 50 }, { x: 25, y: 50 },
    { x: 50, y: 50 },
    // y=75
    { x: 10, y: 75 }, { x: 20, y: 75 }, { x: 25, y: 75 },
    // y=150
    { x: 10, y: 150 }, { x: 15, y: 150 }, { x: 20, y: 150 }, { x: 25, y: 150 },
    // y=200
    { x: 5, y: 200 }, { x: 10, y: 200 }, { x: 15, y: 200 }, { x: 20, y: 200 },
    { x: 25, y: 200 }, { x: 50, y: 200 },
    // y=250
    { x: 10, y: 250 }, { x: 20, y: 250 }, { x: 25, y: 250 },
    // y=300
    { x: 10, y: 300 }, { x: 15, y: 300 }, { x: 20, y: 300 }, { x: 25, y: 300 },
    { x: 50, y: 300 },
    // y=400
    { x: 10, y: 400 }, { x: 20, y: 400 }, { x: 25, y: 400 },
    // y=500
    { x: 5, y: 500 }, { x: 10, y: 500 }, { x: 15, y: 500 }, { x: 20, y: 500 },
    { x: 25, y: 500 }, { x: 50, y: 500 },
    // y=600
    { x: 10, y: 600 }, { x: 20, y: 600 }, { x: 25, y: 600 },
    // y=700
    { x: 10, y: 700 }, { x: 20, y: 700 },
    // y=800
    { x: 10, y: 800 }, { x: 20, y: 800 }, { x: 25, y: 800 },
    // y=900
    { x: 10, y: 900 }, { x: 20, y: 900 },
    // y=1000
    { x: 5, y: 1000 }, { x: 10, y: 1000 }, { x: 15, y: 1000 }, { x: 20, y: 1000 },
    { x: 25, y: 1000 }, { x: 50, y: 1000 },
    // y=1500
    { x: 10, y: 1500 }, { x: 20, y: 1500 }, { x: 25, y: 1500 },
    // y=2000
    { x: 5, y: 2000 }, { x: 10, y: 2000 }, { x: 15, y: 2000 }, { x: 20, y: 2000 },
    { x: 25, y: 2000 }, { x: 50, y: 2000 },
    // y=5000
    { x: 5, y: 5000 }, { x: 10, y: 5000 }, { x: 20, y: 5000 }, { x: 25, y: 5000 },
    // y=10000
    { x: 5, y: 10000 }, { x: 10, y: 10000 }, { x: 20, y: 10000 },
].map(({ x, y }) => ({
    slug: `${x}-percent-of-${y}`,
    x,
    y,
    answer: (x / 100) * y,
    title: `What is ${x}% of ${y}?`,
    description: `${x}% of ${y} is ${((x / 100) * y).toLocaleString('en-US', { maximumFractionDigits: 4 })}. Learn the formula, step-by-step solution, and related percentage calculations.`,
}));

// ─── Tip calculator pages ────────────────────────────────────────────
export const tipPages = [
    { amount: 15, tipPercent: 15 }, { amount: 15, tipPercent: 20 },
    { amount: 20, tipPercent: 15 }, { amount: 20, tipPercent: 20 },
    { amount: 25, tipPercent: 15 }, { amount: 25, tipPercent: 18 }, { amount: 25, tipPercent: 20 },
    { amount: 30, tipPercent: 15 }, { amount: 30, tipPercent: 20 },
    { amount: 35, tipPercent: 15 }, { amount: 35, tipPercent: 20 },
    { amount: 40, tipPercent: 15 }, { amount: 40, tipPercent: 20 },
    { amount: 45, tipPercent: 15 }, { amount: 45, tipPercent: 20 },
    { amount: 50, tipPercent: 15 }, { amount: 50, tipPercent: 18 }, { amount: 50, tipPercent: 20 },
    { amount: 60, tipPercent: 15 }, { amount: 60, tipPercent: 20 },
    { amount: 75, tipPercent: 15 }, { amount: 75, tipPercent: 20 },
    { amount: 80, tipPercent: 15 }, { amount: 80, tipPercent: 20 },
    { amount: 100, tipPercent: 15 }, { amount: 100, tipPercent: 18 }, { amount: 100, tipPercent: 20 },
    { amount: 125, tipPercent: 15 }, { amount: 125, tipPercent: 20 },
    { amount: 150, tipPercent: 15 }, { amount: 150, tipPercent: 20 },
    { amount: 200, tipPercent: 15 }, { amount: 200, tipPercent: 18 }, { amount: 200, tipPercent: 20 },
    { amount: 250, tipPercent: 15 }, { amount: 250, tipPercent: 20 },
    { amount: 300, tipPercent: 18 }, { amount: 300, tipPercent: 20 },
    { amount: 500, tipPercent: 18 }, { amount: 500, tipPercent: 20 },
].map(({ amount, tipPercent }) => {
    const tip = (tipPercent / 100) * amount;
    const total = amount + tip;
    return {
        slug: `${tipPercent}-percent-tip-on-${amount}`,
        amount,
        tipPercent,
        tip,
        total,
        title: `${tipPercent}% Tip on $${amount}`,
        description: `A ${tipPercent}% tip on a $${amount} bill is $${tip.toFixed(2)}, making the total $${total.toFixed(2)}. Quick tip calculator with split options.`,
    };
});

// ─── Discount / "X% off Y" pages ────────────────────────────────────
export const discountPages = [
    // 10% off
    { percent: 10, price: 25 }, { percent: 10, price: 50 }, { percent: 10, price: 75 },
    { percent: 10, price: 100 }, { percent: 10, price: 150 }, { percent: 10, price: 200 },
    { percent: 10, price: 300 }, { percent: 10, price: 500 },
    // 15% off
    { percent: 15, price: 50 }, { percent: 15, price: 100 }, { percent: 15, price: 200 },
    { percent: 15, price: 300 }, { percent: 15, price: 500 },
    // 20% off
    { percent: 20, price: 25 }, { percent: 20, price: 50 }, { percent: 20, price: 75 },
    { percent: 20, price: 100 }, { percent: 20, price: 150 }, { percent: 20, price: 200 },
    { percent: 20, price: 250 }, { percent: 20, price: 300 }, { percent: 20, price: 500 },
    { percent: 20, price: 1000 },
    // 25% off
    { percent: 25, price: 50 }, { percent: 25, price: 100 }, { percent: 25, price: 200 },
    { percent: 25, price: 300 }, { percent: 25, price: 400 }, { percent: 25, price: 500 },
    // 30% off
    { percent: 30, price: 50 }, { percent: 30, price: 100 }, { percent: 30, price: 200 },
    { percent: 30, price: 300 }, { percent: 30, price: 500 },
    // 40% off
    { percent: 40, price: 50 }, { percent: 40, price: 100 }, { percent: 40, price: 200 },
    { percent: 40, price: 500 }, { percent: 40, price: 1000 },
    // 50% off
    { percent: 50, price: 50 }, { percent: 50, price: 100 }, { percent: 50, price: 200 },
    { percent: 50, price: 500 }, { percent: 50, price: 1000 },
    // 60% off
    { percent: 60, price: 100 }, { percent: 60, price: 200 }, { percent: 60, price: 500 },
    // 70% off
    { percent: 70, price: 100 }, { percent: 70, price: 200 }, { percent: 70, price: 500 },
    // 75% off
    { percent: 75, price: 100 }, { percent: 75, price: 200 },
].map(({ percent, price }) => {
    const savings = (percent / 100) * price;
    const finalPrice = price - savings;
    return {
        slug: `${percent}-percent-off-${price}`,
        percent,
        price,
        savings,
        finalPrice,
        title: `${percent}% Off $${price}`,
        description: `${percent}% off $${price} is $${finalPrice.toFixed(2)} (you save $${savings.toFixed(2)}). Free discount calculator with tax and coupon stacking.`,
    };
});

// ─── "How old am I if born in YEAR?" pages ───────────────────────────
const currentYear = 2026;
export const agePages = Array.from({ length: 61 }, (_, i) => {
    const year = 1950 + i; // Every year from 1950–2010
    if (year > 2010) return null;
    const age = currentYear - year;
    return {
        slug: `born-in-${year}-age`,
        year,
        age,
        title: `How Old Am I If Born in ${year}?`,
        description: `If you were born in ${year}, you are ${age - 1} or ${age} years old in ${currentYear}, depending on whether your birthday has passed. Free age calculator.`,
    };
}).filter(Boolean) as { slug: string; year: number; age: number; title: string; description: string }[];

// ─── "Salary to hourly" pages ────────────────────────────────────────
export const salaryPages = [
    20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000, 65000,
    70000, 75000, 80000, 85000, 90000, 95000, 100000, 110000, 120000, 130000,
    140000, 150000, 175000, 200000, 250000,
].map((salary) => {
    const hourly = salary / 2080; // 40 hrs/week × 52 weeks
    const monthly = salary / 12;
    const biweekly = salary / 26;
    const weekly = salary / 52;
    return {
        slug: `${(salary / 1000).toFixed(0)}k-salary-to-hourly`,
        salary,
        hourly,
        monthly,
        biweekly,
        weekly,
        title: `$${(salary / 1000).toFixed(0)}k Salary to Hourly Rate`,
        description: `A $${salary.toLocaleString()} annual salary equals $${hourly.toFixed(2)}/hour (based on 2,080 work hours/year). See monthly, biweekly, and weekly breakdowns.`,
    };
});

// ─── "Mortgage payment on $X at Y%" pages ────────────────────────────
const mortgageCombos = [
    // Popular home prices × common rates
    { price: 150000, rate: 6 }, { price: 150000, rate: 7 },
    { price: 200000, rate: 6 }, { price: 200000, rate: 6.5 }, { price: 200000, rate: 7 },
    { price: 250000, rate: 6 }, { price: 250000, rate: 6.5 }, { price: 250000, rate: 7 },
    { price: 300000, rate: 5.5 }, { price: 300000, rate: 6 }, { price: 300000, rate: 6.5 }, { price: 300000, rate: 7 },
    { price: 350000, rate: 6 }, { price: 350000, rate: 6.5 }, { price: 350000, rate: 7 },
    { price: 400000, rate: 6 }, { price: 400000, rate: 6.5 }, { price: 400000, rate: 7 },
    { price: 450000, rate: 6 }, { price: 450000, rate: 7 },
    { price: 500000, rate: 6 }, { price: 500000, rate: 6.5 }, { price: 500000, rate: 7 },
    { price: 600000, rate: 6 }, { price: 600000, rate: 7 },
    { price: 700000, rate: 6 }, { price: 700000, rate: 7 },
    { price: 800000, rate: 6.5 }, { price: 800000, rate: 7 },
    { price: 1000000, rate: 6 }, { price: 1000000, rate: 7 },
];

export const mortgagePages = mortgageCombos.map(({ price, rate }) => {
    const downPayment = price * 0.20; // Assume 20% down
    const loanAmount = price - downPayment;
    const monthlyRate = rate / 100 / 12;
    const numPayments = 30 * 12; // 30-year fixed
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - loanAmount;
    const priceLabel = price >= 1000000 ? `${(price / 1000000).toFixed(0)}m` : `${(price / 1000).toFixed(0)}k`;

    return {
        slug: `mortgage-on-${priceLabel}-at-${rate.toString().replace('.', '-')}-percent`,
        price,
        rate,
        downPayment,
        loanAmount,
        monthlyPayment,
        totalInterest,
        totalPaid,
        title: `Mortgage on $${price.toLocaleString()} at ${rate}%`,
        description: `Monthly payment on a $${price.toLocaleString()} home at ${rate}% interest (20% down, 30-year fixed) is $${monthlyPayment.toFixed(2)}. Total interest: $${totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.`,
    };
});

// ─── "BMI for height/weight" pages ───────────────────────────────────
const bmiCombos = [
    // height in inches, weight in lbs — popular combos
    { ft: 5, inches: 0, lbs: 120 }, { ft: 5, inches: 0, lbs: 140 }, { ft: 5, inches: 0, lbs: 160 },
    { ft: 5, inches: 4, lbs: 120 }, { ft: 5, inches: 4, lbs: 140 }, { ft: 5, inches: 4, lbs: 160 }, { ft: 5, inches: 4, lbs: 180 },
    { ft: 5, inches: 6, lbs: 140 }, { ft: 5, inches: 6, lbs: 160 }, { ft: 5, inches: 6, lbs: 180 }, { ft: 5, inches: 6, lbs: 200 },
    { ft: 5, inches: 8, lbs: 150 }, { ft: 5, inches: 8, lbs: 170 }, { ft: 5, inches: 8, lbs: 190 }, { ft: 5, inches: 8, lbs: 210 },
    { ft: 5, inches: 10, lbs: 160 }, { ft: 5, inches: 10, lbs: 180 }, { ft: 5, inches: 10, lbs: 200 }, { ft: 5, inches: 10, lbs: 220 },
    { ft: 6, inches: 0, lbs: 170 }, { ft: 6, inches: 0, lbs: 190 }, { ft: 6, inches: 0, lbs: 210 }, { ft: 6, inches: 0, lbs: 230 },
    { ft: 6, inches: 2, lbs: 180 }, { ft: 6, inches: 2, lbs: 200 }, { ft: 6, inches: 2, lbs: 220 },
];

function getBmiCategory(bmi: number): string {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal Weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
}

export const bmiPages = bmiCombos.map(({ ft, inches, lbs }) => {
    const totalInches = ft * 12 + inches;
    const bmi = (lbs / (totalInches * totalInches)) * 703;
    const category = getBmiCategory(bmi);
    const heightLabel = inches === 0 ? `${ft}-foot` : `${ft}-foot-${inches}`;

    return {
        slug: `bmi-for-${heightLabel}-${lbs}-lbs`,
        ft,
        inches,
        lbs,
        bmi,
        category,
        title: `BMI for ${ft}'${inches}" and ${lbs} lbs`,
        description: `The BMI for someone ${ft}'${inches}" tall weighing ${lbs} lbs is ${bmi.toFixed(1)} (${category}). Free BMI calculator with health category breakdown.`,
    };
});

// ─── "X to Y" unit conversion pages ─────────────────────────────────
interface ConvertDef {
    value: number;
    fromUnit: string;
    fromLabel: string;
    toUnit: string;
    toLabel: string;
    category: string;
    factor: number; // result = value * factor (except temperature)
    isTemp?: boolean;
}

const convertCombos: ConvertDef[] = [
    // Weight
    { value: 1, fromUnit: 'kg', fromLabel: 'Kilogram', toUnit: 'lbs', toLabel: 'Pounds', category: 'weight', factor: 2.20462 },
    { value: 10, fromUnit: 'kg', fromLabel: 'Kilograms', toUnit: 'lbs', toLabel: 'Pounds', category: 'weight', factor: 2.20462 },
    { value: 100, fromUnit: 'kg', fromLabel: 'Kilograms', toUnit: 'lbs', toLabel: 'Pounds', category: 'weight', factor: 2.20462 },
    { value: 1, fromUnit: 'lb', fromLabel: 'Pound', toUnit: 'kg', toLabel: 'Kilograms', category: 'weight', factor: 0.453592 },
    { value: 100, fromUnit: 'lbs', fromLabel: 'Pounds', toUnit: 'kg', toLabel: 'Kilograms', category: 'weight', factor: 0.453592 },
    { value: 150, fromUnit: 'lbs', fromLabel: 'Pounds', toUnit: 'kg', toLabel: 'Kilograms', category: 'weight', factor: 0.453592 },
    { value: 200, fromUnit: 'lbs', fromLabel: 'Pounds', toUnit: 'kg', toLabel: 'Kilograms', category: 'weight', factor: 0.453592 },
    { value: 1, fromUnit: 'oz', fromLabel: 'Ounce', toUnit: 'grams', toLabel: 'Grams', category: 'weight', factor: 28.3495 },
    { value: 100, fromUnit: 'grams', fromLabel: 'Grams', toUnit: 'oz', toLabel: 'Ounces', category: 'weight', factor: 0.035274 },
    // Length
    { value: 1, fromUnit: 'mile', fromLabel: 'Mile', toUnit: 'km', toLabel: 'Kilometers', category: 'length', factor: 1.60934 },
    { value: 5, fromUnit: 'miles', fromLabel: 'Miles', toUnit: 'km', toLabel: 'Kilometers', category: 'length', factor: 1.60934 },
    { value: 10, fromUnit: 'miles', fromLabel: 'Miles', toUnit: 'km', toLabel: 'Kilometers', category: 'length', factor: 1.60934 },
    { value: 1, fromUnit: 'km', fromLabel: 'Kilometer', toUnit: 'miles', toLabel: 'Miles', category: 'length', factor: 0.621371 },
    { value: 100, fromUnit: 'km', fromLabel: 'Kilometers', toUnit: 'miles', toLabel: 'Miles', category: 'length', factor: 0.621371 },
    { value: 1, fromUnit: 'ft', fromLabel: 'Foot', toUnit: 'm', toLabel: 'Meters', category: 'length', factor: 0.3048 },
    { value: 1, fromUnit: 'inch', fromLabel: 'Inch', toUnit: 'cm', toLabel: 'Centimeters', category: 'length', factor: 2.54 },
    { value: 12, fromUnit: 'inches', fromLabel: 'Inches', toUnit: 'cm', toLabel: 'Centimeters', category: 'length', factor: 2.54 },
    { value: 100, fromUnit: 'cm', fromLabel: 'Centimeters', toUnit: 'inches', toLabel: 'Inches', category: 'length', factor: 0.393701 },
    { value: 100, fromUnit: 'm', fromLabel: 'Meters', toUnit: 'ft', toLabel: 'Feet', category: 'length', factor: 3.28084 },
    // Temperature (special handling)
    { value: 0, fromUnit: 'celsius', fromLabel: 'Celsius', toUnit: 'fahrenheit', toLabel: 'Fahrenheit', category: 'temperature', factor: 0, isTemp: true },
    { value: 100, fromUnit: 'celsius', fromLabel: 'Celsius', toUnit: 'fahrenheit', toLabel: 'Fahrenheit', category: 'temperature', factor: 0, isTemp: true },
    { value: 37, fromUnit: 'celsius', fromLabel: 'Celsius', toUnit: 'fahrenheit', toLabel: 'Fahrenheit', category: 'temperature', factor: 0, isTemp: true },
    { value: 180, fromUnit: 'celsius', fromLabel: 'Celsius', toUnit: 'fahrenheit', toLabel: 'Fahrenheit', category: 'temperature', factor: 0, isTemp: true },
    { value: 200, fromUnit: 'celsius', fromLabel: 'Celsius', toUnit: 'fahrenheit', toLabel: 'Fahrenheit', category: 'temperature', factor: 0, isTemp: true },
    { value: 32, fromUnit: 'fahrenheit', fromLabel: 'Fahrenheit', toUnit: 'celsius', toLabel: 'Celsius', category: 'temperature', factor: 0, isTemp: true },
    { value: 72, fromUnit: 'fahrenheit', fromLabel: 'Fahrenheit', toUnit: 'celsius', toLabel: 'Celsius', category: 'temperature', factor: 0, isTemp: true },
    { value: 98.6, fromUnit: 'fahrenheit', fromLabel: 'Fahrenheit', toUnit: 'celsius', toLabel: 'Celsius', category: 'temperature', factor: 0, isTemp: true },
    { value: 350, fromUnit: 'fahrenheit', fromLabel: 'Fahrenheit', toUnit: 'celsius', toLabel: 'Celsius', category: 'temperature', factor: 0, isTemp: true },
    // Volume
    { value: 1, fromUnit: 'gallon', fromLabel: 'US Gallon', toUnit: 'liters', toLabel: 'Liters', category: 'volume', factor: 3.78541 },
    { value: 1, fromUnit: 'liter', fromLabel: 'Liter', toUnit: 'gallons', toLabel: 'US Gallons', category: 'volume', factor: 0.264172 },
    { value: 1, fromUnit: 'cup', fromLabel: 'US Cup', toUnit: 'ml', toLabel: 'Milliliters', category: 'volume', factor: 236.588 },
    { value: 500, fromUnit: 'ml', fromLabel: 'Milliliters', toUnit: 'cups', toLabel: 'US Cups', category: 'volume', factor: 0.00422675 },
    // Speed
    { value: 60, fromUnit: 'mph', fromLabel: 'Miles/hr', toUnit: 'kmh', toLabel: 'Km/hr', category: 'speed', factor: 1.60934 },
    { value: 100, fromUnit: 'kmh', fromLabel: 'Km/hr', toUnit: 'mph', toLabel: 'Miles/hr', category: 'speed', factor: 0.621371 },
    // Area
    { value: 1, fromUnit: 'acre', fromLabel: 'Acre', toUnit: 'sqm', toLabel: 'Square Meters', category: 'area', factor: 4046.86 },
    { value: 1, fromUnit: 'hectare', fromLabel: 'Hectare', toUnit: 'acres', toLabel: 'Acres', category: 'area', factor: 2.47105 },
    { value: 1000, fromUnit: 'sqft', fromLabel: 'Square Feet', toUnit: 'sqm', toLabel: 'Square Meters', category: 'area', factor: 0.092903 },
];

function convertTemp(value: number, from: string): number {
    if (from === 'celsius') return value * 9 / 5 + 32;
    return (value - 32) * 5 / 9;
}

export const convertPages = convertCombos.map((c) => {
    const result = c.isTemp ? convertTemp(c.value, c.fromUnit) : c.value * c.factor;
    const resultStr = result.toLocaleString('en-US', { maximumFractionDigits: 4 });
    const fromSym = c.fromUnit === 'celsius' ? '°C' : c.fromUnit === 'fahrenheit' ? '°F' : c.fromUnit;
    const toSym = c.toUnit === 'celsius' ? '°C' : c.toUnit === 'fahrenheit' ? '°F' : c.toUnit;

    return {
        slug: `${c.value}-${c.fromUnit}-to-${c.toUnit}`,
        value: c.value,
        fromUnit: c.fromUnit,
        fromLabel: c.fromLabel,
        toUnit: c.toUnit,
        toLabel: c.toLabel,
        category: c.category,
        result,
        resultStr,
        fromSym,
        toSym,
        isTemp: c.isTemp || false,
        factor: c.factor,
        title: `${c.value} ${c.fromLabel} to ${c.toLabel}`,
        description: `${c.value} ${fromSym} = ${resultStr} ${toSym}. Free instant unit converter with formula, step-by-step solution, and related conversions.`,
    };
});
