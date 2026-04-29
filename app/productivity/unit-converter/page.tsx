import type { Metadata } from 'next';
import ClientComponent from './ClientComponent';
import {
    buildCalculatorMetadata,
    buildCalculatorJsonLd,
    buildBreadcrumbJsonLd,
} from '@/lib/calculatorMeta';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const meta = {
    path: '/productivity/unit-converter',
    name: 'Unit Converter',
    title: 'Unit Converter - Length, Weight, Temperature, Volume',
    description:
        'Convert between imperial and metric units for length, weight, temperature, speed, volume, and area. Fast, accurate, and free.',
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
                    { name: 'Unit Converter' },
                ]}
            />
            <ClientComponent />
        </>
    );
}
