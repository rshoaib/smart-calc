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
    path: '/health/wellness-guide',
    name: 'Total Wellness Optimization Guide',
    title: 'Total Wellness Optimization Guide',
    description:
        'A comprehensive guide to optimizing sleep, nutrition, exercise, and stress. Long-form wellness pillars built on peer-reviewed research.',
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
                    { name: 'Wellness Guide' },
                ]}
            />
            <ClientComponent />
        </>
    );
}
