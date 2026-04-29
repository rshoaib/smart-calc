import type { Metadata } from 'next';
import ClientComponent from './ClientComponent';
import {
    buildCalculatorMetadata,
    buildCalculatorJsonLd,
    buildBreadcrumbJsonLd,
} from '@/lib/calculatorMeta';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const meta = {
    path: '/productivity/salary-hourly',
    name: 'Salary to Hourly Calculator',
    title: 'Salary to Hourly Calculator (and Reverse)',
    description:
        'Convert annual salary to hourly, monthly, biweekly, or weekly rate - and back. Accounts for paid time off and standard work weeks.',
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
                        { name: 'Productivity', path: '/productivity' },
                        { name: meta.name, path: meta.path },
                    ]),
                }}
            />
            <Breadcrumbs
                items={[
                    { name: 'Home', path: '/' },
                    { name: 'Productivity', path: '/productivity' },
                    { name: 'Salary to Hourly' },
                ]}
            />
            <ClientComponent />
        </>
    );
}
