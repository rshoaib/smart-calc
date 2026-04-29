import type { Metadata } from 'next';
import ClientComponent from './ClientComponent';
import {
    buildCalculatorMetadata,
    buildCalculatorJsonLd,
    buildBreadcrumbJsonLd,
    buildFaqJsonLd,
} from '@/lib/calculatorMeta';
import { getFaqsForPath } from '@/lib/calculatorFaqs';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const meta = {
    path: '/finance/inflation',
    name: 'Inflation Calculator',
    title: 'Inflation Calculator (Official US CPI Data, 1913-2026)',
    description:
        'Calculate the real-dollar value of money between any two years using official Consumer Price Index data going back to 1913. Free, no signup.',
};

export const metadata: Metadata = buildCalculatorMetadata(meta);

export default function Page() {
    const faqs = getFaqsForPath(meta.path);
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: buildCalculatorJsonLd(meta) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: buildBreadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: 'Finance', path: '/finance' },
                        { name: meta.name, path: meta.path },
                    ]),
                }}
            />
            {faqs.length > 0 && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: buildFaqJsonLd(faqs) }}
                />
            )}
            <Breadcrumbs
                items={[
                    { name: 'Home', path: '/' },
                    { name: 'Finance', path: '/finance' },
                    { name: 'Inflation' },
                ]}
            />
            <ClientComponent />
        </>
    );
}
