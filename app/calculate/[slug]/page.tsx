import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SeoCalculatorPage from '@/components/SeoCalculatorPage';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import {
    buildBreadcrumbJsonLd,
    buildFaqJsonLd,
} from '@/lib/calculatorMeta';
import { getAllSeoSlugs, resolveSeoPage } from '@/lib/seoPageRegistry';

const SITE = 'https://dailysmartcalc.com';

/**
 * Pre-render every programmatic SEO slug at build time so each URL is fully
 * static HTML with unique title, description, and body content.
 */
export function generateStaticParams() {
    return getAllSeoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const page = resolveSeoPage(slug);
    if (!page) return {};
    const url = `${SITE}/calculate/${slug}`;
    return {
        title: page.title,
        description: page.description,
        alternates: { canonical: `/calculate/${slug}` },
        openGraph: {
            title: page.title,
            description: page.description,
            url,
            type: 'website',
            images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title: page.title,
            description: page.description,
            images: ['/og-image.png'],
        },
    };
}

export default async function SeoRouteHandler({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const page = resolveSeoPage(slug);
    if (!page) notFound();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: buildFaqJsonLd(page.faqs),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: buildBreadcrumbJsonLd([
                        { name: 'Home', path: '/' },
                        { name: page.parentCalc.label, path: page.parentCalc.to },
                        { name: page.title, path: `/calculate/${slug}` },
                    ]),
                }}
            />
            <Breadcrumbs
                items={[
                    { name: 'Home', path: '/' },
                    { name: page.parentCalc.label, path: page.parentCalc.to },
                    { name: page.title },
                ]}
            />
            <SeoCalculatorPage
                type={page.type}
                title={page.title}
                description={page.description}
                answer={page.answer}
                formula={page.formula}
                steps={page.steps}
                parentCalc={page.parentCalc}
                relatedLinks={page.relatedLinks}
                faqs={page.faqs}
            />
        </>
    );
}
