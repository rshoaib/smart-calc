import type { Metadata } from 'next';
import Landing from './Landing';
import {
    buildCalculatorMetadata,
    buildBreadcrumbJsonLd,
} from '@/lib/calculatorMeta';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const meta = {
    path: '/productivity',
    name: 'Productivity Tools',
    title: 'Free Productivity Tools: Pomodoro, Salary, GPA, Percentage',
    description:
        'A library of free, no-signup productivity tools - Pomodoro timer, salary-hourly converter, meeting cost, percentage, GPA, typing speed, tip calculator, and more.',
};

export const metadata: Metadata = buildCalculatorMetadata(meta);

export default function ProductivityHubPage() {
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
                        { name: 'Productivity', path: '/productivity' },
                    ]),
                }}
            />
            <Breadcrumbs
                items={[
                    { name: 'Home', path: '/' },
                    { name: 'Productivity' },
                ]}
            />
            <Landing />
        </>
    );
}
