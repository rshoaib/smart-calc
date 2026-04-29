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
import { CalculatorCopy } from '@/components/CalculatorCopy';

const meta = {
    path: '/productivity/pomodoro',
    name: 'Pomodoro Timer',
    title: 'Pomodoro Timer with Custom Intervals',
    description:
        'Customizable Pomodoro timer with adjustable focus and break intervals, daily session counts, and audio cues. Built for deep work.',
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
                        { name: 'Productivity', path: '/productivity' },
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
                    { name: 'Productivity', path: '/productivity' },
                    { name: 'Pomodoro Timer' },
                ]}
            />
            <ClientComponent />
            <CalculatorCopy path={meta.path} />
        </>
    );
}
