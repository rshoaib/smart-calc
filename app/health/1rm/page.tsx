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
    path: '/health/1rm',
    name: '1-Rep Max Calculator',
    title: '1-Rep Max Calculator (Epley, Brzycki, Lombardi)',
    description:
        'Estimate your one-rep max from any rep range using six well-known formulas, including Epley, Brzycki, and Lombardi. See training percentages.',
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
                        { name: 'Health', path: '/health' },
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
                    { name: 'Health', path: '/health' },
                    { name: '1-Rep Max' },
                ]}
            />
            <ClientComponent />
        </>
    );
}
