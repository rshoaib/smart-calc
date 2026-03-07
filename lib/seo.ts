import type { Metadata } from 'next';

const BASE_URL = 'https://dailysmartcalc.com';
const SITE_NAME = 'SmartCalc';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

export interface SEOInput {
    title: string;
    description: string;
    path: string;
    type?: 'website' | 'article';
    image?: string;
    noIndex?: boolean;
    publishedTime?: string;
    modifiedTime?: string;
}

export function buildMetadata({
    title,
    description,
    path,
    type = 'website',
    image = DEFAULT_IMAGE,
    noIndex = false,
    publishedTime,
    modifiedTime,
}: SEOInput): Metadata {
    const canonicalUrl = `${BASE_URL}${path}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: canonicalUrl,
                es: canonicalUrl,
                'x-default': canonicalUrl,
            },
        },
        openGraph: {
            siteName: SITE_NAME,
            title,
            description,
            type: type === 'article' ? 'article' : 'website',
            url: canonicalUrl,
            images: [{ url: image }],
            locale: 'en_US',
            ...(publishedTime ? { publishedTime } : {}),
            ...(modifiedTime ? { modifiedTime } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
        ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    };
}

// Helper to build breadcrumb JSON-LD from a pathname
export function buildBreadcrumbJsonLd(pathname: string) {
    const segments = pathname.split('/').filter(Boolean);
    const items = [{ name: 'Home', url: `${BASE_URL}/` }];

    const labelMap: Record<string, string> = {
        finance: 'Finance Calculators',
        health: 'Health & Wellness',
        productivity: 'Productivity Tools',
        blog: 'Blog',
        about: 'About Us',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        mortgage: 'Mortgage Calculator',
        investment: 'Investment Calculator',
        loan: 'Auto Loan Calculator',
        retirement: 'Retirement Calculator',
        'debt-payoff': 'Debt Payoff Planner',
        'time-to-millionaire': 'Time to Millionaire',
        'rent-vs-buy': 'Rent vs Buy',
        fire: 'FIRE Calculator',
        'freelance-rate': 'Freelance Rate',
        roi: 'ROI Calculator',
        'savings-goal': 'Savings Goal',
        emergency: 'Emergency Fund',
        'freedom-guide': 'Financial Freedom Guide',
        bmi: 'BMI Calculator',
        calories: 'Calorie Calculator',
        'macro-split': 'Macro Calculator',
        'heart-rate': 'Heart Rate Zones',
        sleep: 'Sleep Calculator',
        '1rm': 'One Rep Max Calculator',
        'wellness-guide': 'Wellness Guide',
        pomodoro: 'Pomodoro Timer',
        'salary-hourly': 'Salary ↔ Hourly',
        'meeting-cost': 'Meeting Cost',
        percentage: 'Percentage Calculator',
        gpa: 'GPA Calculator',
        'typing-speed': 'Typing Speed Test',
        'date-difference': 'Date Difference',
        'unit-converter': 'Unit Converter',
        'tip-calculator': 'Tip Calculator',
        'word-counter': 'Word Counter',
        age: 'Age Calculator',
    };

    let currentPath = '';
    for (const segment of segments) {
        currentPath += '/' + segment;
        items.push({
            name:
                labelMap[segment] ||
                segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
            url: BASE_URL + currentPath,
        });
    }

    if (items.length <= 1) return null;

    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

// WebApplication JSON-LD helper
export function buildWebAppJsonLd(name: string, description: string, category = 'FinanceApplication') {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name,
        applicationCategory: category,
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        description,
    };
}

// Article JSON-LD helper
export function buildArticleJsonLd(
    title: string,
    description: string,
    image: string = DEFAULT_IMAGE,
    publishedTime?: string,
    modifiedTime?: string
) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image,
        author: { '@type': 'Organization', name: SITE_NAME },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE },
        },
        datePublished: publishedTime || new Date().toISOString(),
        dateModified: modifiedTime || new Date().toISOString(),
    };
}

// FAQ JSON-LD helper
export function buildFaqJsonLd(faq: { question: string; answer: string }[]) {
    if (!faq || faq.length === 0) return null;
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}
