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
import { CalculatorCopy } from '@/components/CalculatorCopy';

const meta = {
    path: '/finance/debt-payoff',
    name: 'Debt Payoff Calculator',
    title: 'Debt Payoff Calculator: Snowball vs Avalanche',
    description:
        'Compare the snowball and avalanche debt payoff methods side by side. See your debt-free date and total interest saved on each strategy.',
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
                    { name: 'Debt Payoff' },
                ]}
            />
            <ClientComponent />
            <CalculatorCopy path={meta.path} />
        </>
    );
}
