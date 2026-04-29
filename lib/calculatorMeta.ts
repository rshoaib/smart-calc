import type { Metadata } from 'next';

/**
 * Centralised SEO metadata + JSON-LD helpers for calculator pages.
 *
 * The single source of truth ensures:
 *   - Titles never collide with the layout `title.template` ("%s | SmartCalc"),
 *     so we never end up with "Mortgage Calculator | SmartCalc | SmartCalc".
 *   - Every page gets a canonical, OG image, and large twitter card.
 *   - WebApplication JSON-LD stays in lockstep with the meta description.
 */

export interface CalculatorMetaInput {
    /** Absolute pathname, e.g. `/finance/mortgage`. Must start with `/`. */
    path: string;
    /** Schema.org `name` (the human label of the tool, no brand). */
    name: string;
    /** SEO title — the layout template appends ` | SmartCalc` automatically. */
    title: string;
    /** 140–160 character meta description with a feature differentiator. */
    description: string;
}

const SITE = 'https://dailysmartcalc.com';

export function buildCalculatorMetadata(opts: CalculatorMetaInput): Metadata {
    const { path, title, description } = opts;
    const url = `${SITE}${path}`;
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/og-image.png'],
        },
    };
}

export function buildCalculatorJsonLd(opts: CalculatorMetaInput): string {
    const { path, name, description } = opts;
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name,
        url: `${SITE}${path}`,
        applicationCategory: 'CalculatorApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description,
    });
}

/**
 * Build a BreadcrumbList JSON-LD for any nested page.
 * Pass crumbs in order from root → current page.
 */
export interface Breadcrumb {
    name: string;
    path: string; // pathname starting with `/`
}

export function buildBreadcrumbJsonLd(crumbs: Breadcrumb[]): string {
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            item: `${SITE}${c.path}`,
        })),
    });
}

/** Build FAQPage JSON-LD from a list of question/answer pairs. */
export function buildFaqJsonLd(faqs: { question: string; answer: string }[]): string {
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
    });
}
