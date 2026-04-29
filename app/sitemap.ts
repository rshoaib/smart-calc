import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blogService';
import {
    percentagePages,
    tipPages,
    discountPages,
    agePages,
    salaryPages,
    mortgagePages,
    bmiPages,
    convertPages,
} from '@/data/seoTemplates';
import * as fs from 'fs';
import * as path from 'path';

// Stable build-time fallback. Evaluated once at module load — NOT on every
// request — so we don't lie to Google about every URL being modified
// continuously, which causes crawl-budget waste and de-prioritisation.
const BUILD_TIME = new Date();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://dailysmartcalc.com';

    // Basic routes
    const getPriority = (route: string): number => {
        if (route === '') return 1;
        if (['/finance', '/health', '/productivity', '/blog'].includes(route)) return 0.9;
        if (['/about', '/contact'].includes(route)) return 0.5;
        return 0.3; // /privacy, /terms
    };

    const routes = [
        '',
        '/finance',
        '/health',
        '/productivity',
        '/blog',
        '/about',
        '/contact',
        '/privacy',
        '/terms',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: BUILD_TIME,
        changeFrequency: 'weekly' as const,
        priority: getPriority(route),
    }));

    // Generate tool routes dynamically from the app directory at build time
    const getToolRoutes = () => {
        try {
            const categories = ['finance', 'health', 'productivity'];
            const appDir = path.join(process.cwd(), 'app');
            const foundRoutes: string[] = [];

            categories.forEach((category) => {
                const categoryPath = path.join(appDir, category);
                if (fs.existsSync(categoryPath)) {
                    const tools = fs.readdirSync(categoryPath);
                    tools.forEach((tool) => {
                        const toolPath = path.join(categoryPath, tool);
                        if (
                            fs.statSync(toolPath).isDirectory() &&
                            fs.existsSync(path.join(toolPath, 'page.tsx'))
                        ) {
                            foundRoutes.push(`/${category}/${tool}`);
                        }
                    });
                }
            });
            return foundRoutes;
        } catch (e) {
            console.error(e);
            return [];
        }
    };

    const toolRoutes = getToolRoutes().map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: BUILD_TIME,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Programmatic SEO long-tail pages.
    // Now that /calculate/[slug] is a server component with unique per-slug
    // metadata (see app/calculate/[slug]/page.tsx), it's safe to include these
    // in the sitemap — each URL has a unique title and description.
    const allSeoPages = [
        ...percentagePages,
        ...tipPages,
        ...discountPages,
        ...agePages,
        ...salaryPages,
        ...mortgagePages,
        ...bmiPages,
        ...convertPages,
    ];

    const seoRoutes = allSeoPages.map((template) => ({
        url: `${baseUrl}/calculate/${template.slug}`,
        lastModified: BUILD_TIME,
        changeFrequency: 'yearly' as const,
        priority: 0.5,
    }));

    // Blog posts — use the post's own date so Google sees real freshness signals
    const blogPosts = await getAllPosts();
    const blogRoutes = blogPosts.map((post) => {
        const stamp = post.updatedAt || post.date;
        const lastModified = stamp ? new Date(stamp) : BUILD_TIME;
        return {
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        };
    });

    return [...routes, ...toolRoutes, ...seoRoutes, ...blogRoutes];
}
