import type { Metadata } from 'next';
import Landing from './Landing';
import {
    buildCalculatorMetadata,
    buildBreadcrumbJsonLd,
} from '@/lib/calculatorMeta';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const meta = {
    path: '/finance',
    name: 'Finance Calculators',
    title: 'Free Finance Calculators: Mortgage, Investment, Retirement, FIRE',
    description:
        'A library of free, no-signup finance calculators - mortgage, investment, retirement, FIRE, debt payoff, ROI, freelance rate and more. All math runs in your browser.',
};

export const metadata: Metadata = buildCalculatorMetadata(meta);

export default function FinanceHubPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        name: meta.title,
                        url: `https://dailysmartcalc.com${meta.path}`,
                        description: meta.description,
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: buildBreadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Finance', path: '/finance' },
                    ]),
                }}
            />
            <Breadcrumbs
                items={[
                    { name: 'Home', path: '/' },
                    { name: 'Finance' },
                ]}
            />
            <Landing />
        </>
    );
}
