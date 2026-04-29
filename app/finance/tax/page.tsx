import type { Metadata } from 'next';
import ClientComponent from './ClientComponent';
import { getPostByRelatedTool } from '@/lib/blogService';
import { MarkdownContent } from '@/components/MarkdownContent';
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
    path: '/finance/tax',
    name: 'Federal Income Tax Calculator',
    title: '2025/2026 Federal Income Tax Calculator',
    description:
        'Estimate your US federal income tax liability, marginal bracket, and effective tax rate for the 2025/2026 tax year. Supports Single and Married Jointly filing statuses.',
};

export const metadata: Metadata = buildCalculatorMetadata(meta);

export default async function TaxCalculatorPage() {
    const post = await getPostByRelatedTool('/finance/tax');
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
                        { name: 'Finance', path: '/finance' },
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
                    { name: 'Finance', path: '/finance' },
                    { name: 'Federal Income Tax' },
                ]}
            />
            <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl tracking-tight">
                            2025 / 2026 Federal Income Tax Calculator
                        </h1>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                            Calculate your estimated tax liability, marginal bracket, and effective tax rate based on the latest IRS rules.
                        </p>
                    </div>

                    <ClientComponent />

                    <CalculatorCopy path={meta.path} />

                    {post && (
                        <div className="max-w-4xl mx-auto mt-16 prose prose-lg dark:prose-invert">
                            <MarkdownContent content={post.content} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
