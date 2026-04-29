import type { Metadata } from 'next';
import ClientComponent from './ClientComponent';
import {
    buildCalculatorMetadata,
    buildCalculatorJsonLd,
    buildBreadcrumbJsonLd,
} from '@/lib/calculatorMeta';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const meta = {
    path: '/finance/investment',
    name: 'Investment Calculator',
    title: 'Compound Investment Calculator with Inflation & Tax',
    description:
        'Project the future value of your investments with monthly contributions, inflation, and tax drag. See how compounding builds wealth over 10-40 years.',
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
                        { name: 'Finance', path: '/finance' },
                        { name: meta.name, path: meta.path },
                    ]),
                }}
            />
            <Breadcrumbs
                items={[
                    { name: 'Home', path: '/' },
                    { name: 'Finance', path: '/finance' },
                    { name: 'Investment' },
                ]}
            />
            <ClientComponent />
        </>
    );
}
