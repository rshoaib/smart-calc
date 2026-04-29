import type { Metadata } from 'next';
import ClientComponent from './ClientComponent';
import {
    buildCalculatorMetadata,
    buildCalculatorJsonLd,
    buildBreadcrumbJsonLd,
} from '@/lib/calculatorMeta';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const meta = {
    path: '/productivity/gpa',
    name: 'GPA Calculator',
    title: 'GPA Calculator (4.0 and 4.5 Scale)',
    description:
        'Calculate your cumulative GPA with weighted and unweighted credit hours. Supports 4.0 and 4.5 scales for high school and college.',
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
                    { name: 'GPA' },
                ]}
            />
            <ClientComponent />
        </>
    );
}
