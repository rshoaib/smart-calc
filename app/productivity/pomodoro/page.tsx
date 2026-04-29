import type { Metadata } from 'next';
import ClientComponent from './ClientComponent';
import {
    buildCalculatorMetadata,
    buildCalculatorJsonLd,
    buildBreadcrumbJsonLd,
} from '@/lib/calculatorMeta';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const meta = {
    path: '/productivity/pomodoro',
    name: 'Pomodoro Timer',
    title: 'Pomodoro Timer with Custom Intervals',
    description:
        'Customizable Pomodoro timer with adjustable focus and break intervals, daily session counts, and audio cues. Built for deep work.',
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
                    { name: 'Pomodoro Timer' },
                ]}
            />
            <ClientComponent />
        </>
    );
}
