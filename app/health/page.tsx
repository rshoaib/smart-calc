import type { Metadata } from 'next';
import Landing from './Landing';
import {
    buildCalculatorMetadata,
    buildBreadcrumbJsonLd,
} from '@/lib/calculatorMeta';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const meta = {
    path: '/health',
    name: 'Health Calculators',
    title: 'Free Health Calculators: BMI, Calories, Macros, Heart Rate, Sleep',
    description:
        'A library of free, no-signup health and fitness calculators - BMI, calorie/TDEE, macro split, heart rate zones, sleep cycles, and 1-rep max.',
};

export const metadata: Metadata = buildCalculatorMetadata(meta);

export default function HealthHubPage() {
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
                        { name: 'Health', path: '/health' },
                    ]),
                }}
            />
            <Breadcrumbs
                items={[
                    { name: 'Home', path: '/' },
                    { name: 'Health' },
                ]}
            />
            <Landing />
        </>
    );
}
