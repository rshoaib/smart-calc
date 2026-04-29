import type { Metadata } from 'next';
import ClientComponent from './ClientComponent';
import {
    buildCalculatorMetadata,
    buildCalculatorJsonLd,
    buildBreadcrumbJsonLd,
} from '@/lib/calculatorMeta';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const meta = {
    path: '/health/sleep',
    name: 'Sleep Cycle Calculator',
    title: 'Sleep Cycle Calculator: Best Bedtimes & Wake Times',
    description:
        'Find optimal bedtime or wake time using 90-minute sleep cycles. Avoid grogginess by waking at the end of a cycle.',
};

export const metadata: Metadata = buildCalculatorMetadata(meta);

export default function Page() {
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
            <Breadcrumbs
                items={[
                    { name: 'Home', path: '/' },
                    { name: 'Health', path: '/health' },
                    { name: 'Sleep Cycle' },
                ]}
            />
            <ClientComponent />
        </>
    );
}
