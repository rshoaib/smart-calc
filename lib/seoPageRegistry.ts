/**
 * Centralised resolver for the programmatic SEO `/calculate/[slug]` route.
 *
 * Takes a slug and returns the fully-resolved props for `<SeoCalculatorPage>`,
 * or `null` if no template matches. This lets the route be a server component
 * (so per-slug metadata can be exported) while keeping all template-specific
 * shaping in one place.
 */

import {
    percentagePages,
    tipPages,
    discountPages,
    agePages,
    salaryPages,
    mortgagePages,
    bmiPages,
    convertPages,
} from '@/data/seoTemplates';

type PageType = 'percentage' | 'tip' | 'discount' | 'age' | 'salary' | 'mortgage' | 'bmi' | 'convert';

export interface ResolvedSeoPage {
    type: PageType;
    slug: string;
    title: string;
    description: string;
    answer: string;
    formula: string;
    steps: string[];
    parentCalc: { label: string; to: string };
    relatedLinks: { label: string; to: string }[];
    faqs: { question: string; answer: string }[];
}

export function getAllSeoSlugs(): string[] {
    return [
        ...percentagePages.map((p) => p.slug),
        ...tipPages.map((p) => p.slug),
        ...discountPages.map((p) => p.slug),
        ...agePages.map((p) => p.slug),
        ...salaryPages.map((p) => p.slug),
        ...mortgagePages.map((p) => p.slug),
        ...bmiPages.map((p) => p.slug),
        ...convertPages.map((p) => p.slug),
    ];
}

export function resolveSeoPage(slug: string): ResolvedSeoPage | null {
    // Percentage
    const percentPage = percentagePages.find((p) => p.slug === slug);
    if (percentPage) {
        const { x, y, answer } = percentPage;
        const nearby = percentagePages
            .filter((p) => p.slug !== slug)
            .slice(0, 6)
            .map((p) => ({ label: `What is ${p.x}% of ${p.y}?`, to: `/calculate/${p.slug}` }));
        return {
            type: 'percentage',
            slug,
            title: percentPage.title,
            description: percentPage.description,
            answer: answer.toLocaleString('en-US', { maximumFractionDigits: 4 }),
            formula: `${x}% of ${y} = (${x} ÷ 100) × ${y}`,
            steps: [
                `Convert the percentage to a decimal: ${x}% = ${x} ÷ 100 = ${x / 100}`,
                `Multiply by the number: ${x / 100} × ${y} = ${answer}`,
                `Result: ${x}% of ${y} = ${answer}`,
            ],
            parentCalc: { label: 'Percentage Calculator', to: '/productivity/percentage' },
            relatedLinks: nearby,
            faqs: [
                { question: `What is ${x}% of ${y}?`, answer: `${x}% of ${y} is ${answer}. You calculate this by multiplying ${y} by ${x / 100}.` },
                { question: `How do I calculate ${x}% of any number?`, answer: `Divide ${x} by 100 to get ${x / 100}, then multiply by whatever number you need. For example, ${x}% of 1000 = ${(x / 100) * 1000}.` },
                { question: 'What is the formula for percentage?', answer: 'The formula is: Percentage = (Part ÷ Whole) × 100. To find X% of Y, calculate (X ÷ 100) × Y.' },
            ],
        };
    }

    // Tip
    const tipPage = tipPages.find((p) => p.slug === slug);
    if (tipPage) {
        const { amount, tipPercent, tip, total } = tipPage;
        const nearby = tipPages
            .filter((p) => p.slug !== slug)
            .slice(0, 6)
            .map((p) => ({ label: `${p.tipPercent}% tip on $${p.amount}`, to: `/calculate/${p.slug}` }));
        return {
            type: 'tip',
            slug,
            title: tipPage.title,
            description: tipPage.description,
            answer: `$${tip.toFixed(2)} tip / $${total.toFixed(2)} total`,
            formula: `Tip = $${amount} × ${tipPercent}% = $${amount} × ${tipPercent / 100}`,
            steps: [
                `Start with bill amount: $${amount}`,
                `Calculate tip: $${amount} × ${tipPercent / 100} = $${tip.toFixed(2)}`,
                `Add to bill: $${amount} + $${tip.toFixed(2)} = $${total.toFixed(2)}`,
                `Per person (2 people): $${(total / 2).toFixed(2)} each`,
            ],
            parentCalc: { label: 'Percentage Calculator', to: '/productivity/percentage' },
            relatedLinks: nearby,
            faqs: [
                { question: `How much is a ${tipPercent}% tip on $${amount}?`, answer: `A ${tipPercent}% tip on $${amount} is $${tip.toFixed(2)}, making the total $${total.toFixed(2)}.` },
                { question: 'What is a good tip percentage?', answer: '15% is considered standard for adequate service, 18-20% for good service, and 25%+ for excellent service in the US.' },
                { question: 'How do I calculate tip quickly?', answer: 'Quick trick: find 10% by moving the decimal, then adjust. For 15%, add half of 10%. For 20%, double 10%.' },
            ],
        };
    }

    // Discount
    const discountPage = discountPages.find((p) => p.slug === slug);
    if (discountPage) {
        const { percent, price, savings, finalPrice } = discountPage;
        const nearby = discountPages
            .filter((p) => p.slug !== slug)
            .slice(0, 6)
            .map((p) => ({ label: `${p.percent}% off $${p.price}`, to: `/calculate/${p.slug}` }));
        return {
            type: 'discount',
            slug,
            title: discountPage.title,
            description: discountPage.description,
            answer: `$${finalPrice.toFixed(2)} (save $${savings.toFixed(2)})`,
            formula: `$${price} − (${percent}% × $${price}) = $${price} − $${savings.toFixed(2)}`,
            steps: [
                `Original price: $${price}`,
                `Calculate discount: ${percent}% of $${price} = $${savings.toFixed(2)}`,
                `Subtract from price: $${price} - $${savings.toFixed(2)} = $${finalPrice.toFixed(2)}`,
                `You save: $${savings.toFixed(2)}`,
            ],
            parentCalc: { label: 'Percentage Calculator', to: '/productivity/percentage' },
            relatedLinks: nearby,
            faqs: [
                { question: `What is ${percent}% off $${price}?`, answer: `${percent}% off $${price} is $${finalPrice.toFixed(2)}. You save $${savings.toFixed(2)}.` },
                { question: 'How do I calculate a discount?', answer: 'Multiply the original price by the discount percentage (as a decimal), then subtract from the original price.' },
                { question: 'How do I stack multiple discounts?', answer: 'Apply each discount sequentially. A 20% discount then a 10% discount on $100: $100 × 0.80 = $80, then $80 × 0.90 = $72. This is NOT 30% off — it\'s 28% off.' },
            ],
        };
    }

    // Age
    const agePage = agePages.find((p) => p.slug === slug);
    if (agePage) {
        const { year, age } = agePage;
        const nearby = agePages
            .filter((p) => p.slug !== slug)
            .slice(0, 6)
            .map((p) => ({ label: `Born in ${p.year}`, to: `/calculate/${p.slug}` }));
        return {
            type: 'age',
            slug,
            title: agePage.title,
            description: agePage.description,
            answer: `${age - 1} or ${age} years old`,
            formula: `Age = Current Year − Birth Year = 2026 − ${year}`,
            steps: [
                `Your birth year: ${year}`,
                `Current year: 2026`,
                `If your birthday has passed this year: 2026 − ${year} = ${age}`,
                `If your birthday hasn't passed yet: ${age} − 1 = ${age - 1}`,
            ],
            parentCalc: { label: 'Productivity Tools', to: '/productivity' },
            relatedLinks: nearby,
            faqs: [
                { question: `How old am I if I was born in ${year}?`, answer: `If you were born in ${year}, you are ${age - 1} or ${age} years old in 2026, depending on whether your birthday has already occurred.` },
                { question: 'How do I calculate my exact age?', answer: 'Subtract your birth year from the current year. If your birthday hasn\'t occurred yet this year, subtract one more.' },
                { question: `What generation is someone born in ${year}?`, answer: year < 1965 ? 'Baby Boomers (1946–1964)' : year < 1981 ? 'Generation X (1965–1980)' : year < 1997 ? 'Millennials (1981–1996)' : 'Generation Z (1997–2012)' },
            ],
        };
    }

    // Salary
    const salaryPage = salaryPages.find((p) => p.slug === slug);
    if (salaryPage) {
        const { salary, hourly, monthly, biweekly, weekly } = salaryPage;
        const nearby = salaryPages
            .filter((p) => p.slug !== slug)
            .slice(0, 6)
            .map((p) => ({ label: `$${(p.salary / 1000).toFixed(0)}k salary`, to: `/calculate/${p.slug}` }));
        return {
            type: 'salary',
            slug,
            title: salaryPage.title,
            description: salaryPage.description,
            answer: `$${hourly.toFixed(2)}/hour`,
            formula: `Hourly = $${salary.toLocaleString()} ÷ 2,080 hours/year`,
            steps: [
                `Annual salary: $${salary.toLocaleString()}`,
                `Work hours per year: 40 hrs/week × 52 weeks = 2,080`,
                `Hourly rate: $${salary.toLocaleString()} ÷ 2,080 = $${hourly.toFixed(2)}/hr`,
                `Monthly: $${monthly.toFixed(2)} | Biweekly: $${biweekly.toFixed(2)} | Weekly: $${weekly.toFixed(2)}`,
            ],
            parentCalc: { label: 'Salary ↔ Hourly Converter', to: '/productivity/salary-hourly' },
            relatedLinks: nearby,
            faqs: [
                { question: `What is $${(salary / 1000).toFixed(0)}k a year hourly?`, answer: `$${salary.toLocaleString()} per year is $${hourly.toFixed(2)} per hour, assuming a standard 40-hour work week (2,080 hours/year).` },
                { question: `How much is $${(salary / 1000).toFixed(0)}k a year monthly?`, answer: `$${salary.toLocaleString()} divided by 12 months is $${monthly.toFixed(2)} per month before taxes.` },
                { question: 'How do I calculate hourly rate from salary?', answer: 'Divide your annual salary by 2,080 (40 hours × 52 weeks). For part-time, divide by your actual annual hours worked.' },
            ],
        };
    }

    // Mortgage
    const mortgagePage = mortgagePages.find((p) => p.slug === slug);
    if (mortgagePage) {
        const { price, rate, downPayment, loanAmount, monthlyPayment, totalInterest, totalPaid } = mortgagePage;
        const nearby = mortgagePages
            .filter((p) => p.slug !== slug)
            .slice(0, 6)
            .map((p) => ({ label: `$${p.price.toLocaleString()} at ${p.rate}%`, to: `/calculate/${p.slug}` }));
        return {
            type: 'mortgage',
            slug,
            title: mortgagePage.title,
            description: mortgagePage.description,
            answer: `$${monthlyPayment.toFixed(2)}/month`,
            formula: `M = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1]`,
            steps: [
                `Home price: $${price.toLocaleString()} | Down payment (20%): $${downPayment.toLocaleString()}`,
                `Loan amount: $${loanAmount.toLocaleString()} | Interest rate: ${rate}% | Term: 30 years`,
                `Monthly rate: ${rate}% ÷ 12 = ${(rate / 12).toFixed(4)}%`,
                `Monthly payment: $${monthlyPayment.toFixed(2)}`,
                `Total paid over 30 years: $${totalPaid.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
                `Total interest: $${totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
            ],
            parentCalc: { label: 'Mortgage Calculator', to: '/finance/mortgage' },
            relatedLinks: nearby,
            faqs: [
                { question: `What is the monthly payment on a $${price.toLocaleString()} mortgage at ${rate}%?`, answer: `With 20% down ($${downPayment.toLocaleString()}), a 30-year fixed mortgage at ${rate}% has a monthly payment of $${monthlyPayment.toFixed(2)}.` },
                { question: `How much interest on a $${price.toLocaleString()} home?`, answer: `Over 30 years at ${rate}%, you'll pay approximately $${totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} in total interest.` },
                { question: 'How is mortgage payment calculated?', answer: 'The formula is M = P × [r(1+r)ⁿ] / [(1+r)ⁿ − 1], where P is loan amount, r is monthly interest rate, and n is total number of payments.' },
            ],
        };
    }

    // BMI
    const bmiPage = bmiPages.find((p) => p.slug === slug);
    if (bmiPage) {
        const { ft, inches, lbs, bmi, category } = bmiPage;
        const nearby = bmiPages
            .filter((p) => p.slug !== slug)
            .slice(0, 6)
            .map((p) => ({ label: `${p.ft}'${p.inches}" / ${p.lbs} lbs`, to: `/calculate/${p.slug}` }));
        const totalInches = ft * 12 + inches;
        return {
            type: 'bmi',
            slug,
            title: bmiPage.title,
            description: bmiPage.description,
            answer: `${bmi.toFixed(1)} — ${category}`,
            formula: `BMI = (Weight in lbs ÷ Height in inches²) × 703`,
            steps: [
                `Height: ${ft}'${inches}" = ${totalInches} inches`,
                `Weight: ${lbs} lbs`,
                `BMI = (${lbs} ÷ ${totalInches}²) × 703`,
                `BMI = (${lbs} ÷ ${totalInches * totalInches}) × 703 = ${bmi.toFixed(1)}`,
                `Category: ${category}`,
            ],
            parentCalc: { label: 'BMI Calculator', to: '/health/bmi' },
            relatedLinks: nearby,
            faqs: [
                { question: `What is the BMI for ${ft}'${inches}" and ${lbs} lbs?`, answer: `The BMI is ${bmi.toFixed(1)}, which falls in the "${category}" category.` },
                { question: 'What is a healthy BMI range?', answer: 'A BMI between 18.5 and 24.9 is considered "Normal Weight." Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is obese.' },
                { question: 'How accurate is BMI?', answer: 'BMI is a useful screening tool but doesn\'t account for muscle mass, bone density, or body composition. Athletes may have a high BMI but low body fat.' },
            ],
        };
    }

    // Convert
    const convertPage = convertPages.find((p) => p.slug === slug);
    if (convertPage) {
        const { value, fromLabel, toLabel, fromSym, toSym, resultStr, category, isTemp, factor } = convertPage;
        const nearby = convertPages
            .filter((p) => p.slug !== slug && p.category === category)
            .slice(0, 6)
            .map((p) => ({ label: `${p.value} ${p.fromLabel} to ${p.toLabel}`, to: `/calculate/${p.slug}` }));

        const steps = isTemp
            ? fromSym === '°C'
                ? [
                    `Start with ${value}${fromSym}`,
                    `Apply formula: (°C × 9/5) + 32 = °F`,
                    `(${value} × 9/5) + 32 = ${resultStr}${toSym}`,
                ]
                : [
                    `Start with ${value}${fromSym}`,
                    `Apply formula: (°F − 32) × 5/9 = °C`,
                    `(${value} − 32) × 5/9 = ${resultStr}${toSym}`,
                ]
            : [
                `Start with ${value} ${fromSym}`,
                `Multiply by conversion factor: ${factor}`,
                `${value} × ${factor} = ${resultStr} ${toSym}`,
            ];

        const formula = isTemp
            ? fromSym === '°C' ? `(${value}°C × 9/5) + 32 = ${resultStr}°F` : `(${value}°F − 32) × 5/9 = ${resultStr}°C`
            : `${value} ${fromSym} × ${factor} = ${resultStr} ${toSym}`;

        return {
            type: 'convert',
            slug,
            title: convertPage.title,
            description: convertPage.description,
            answer: `${resultStr} ${toSym}`,
            formula,
            steps,
            parentCalc: { label: 'Unit Converter', to: '/productivity/unit-converter' },
            relatedLinks: nearby,
            faqs: [
                { question: `How much is ${value} ${fromLabel.toLowerCase()} in ${toLabel.toLowerCase()}?`, answer: `${value} ${fromSym} equals ${resultStr} ${toSym}.` },
                { question: `How do I convert ${fromLabel.toLowerCase()} to ${toLabel.toLowerCase()}?`, answer: isTemp ? `Use the formula: ${fromSym === '°C' ? '(°C × 9/5) + 32' : '(°F − 32) × 5/9'}. Or use our free Unit Converter for instant results.` : `Multiply the value in ${fromSym} by ${factor}. For example, ${value} ${fromSym} × ${factor} = ${resultStr} ${toSym}.` },
                { question: 'Where can I convert more units?', answer: 'Use our free Unit Converter at dailysmartcalc.com/productivity/unit-converter — it supports length, weight, temperature, speed, volume, and area conversions.' },
            ],
        };
    }

    return null;
}
