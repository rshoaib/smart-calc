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
    convertPages
} from '@/data/seoTemplates';
import * as fs from 'fs';
import * as path from 'path';

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
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: getPriority(route),
    }));

    // Generate tool routes dynamically from the app directory at build time
    const getToolRoutes = () => {
        try {
            const categories = ['finance', 'health', 'productivity'];
            const appDir = path.join(process.cwd(), 'app');
            let foundRoutes: string[] = [];

            categories.forEach(category => {
                const categoryPath = path.join(appDir, category);
                if (fs.existsSync(categoryPath)) {
                    const tools = fs.readdirSync(categoryPath);
                    tools.forEach(tool => {
                        const toolPath = path.join(categoryPath, tool);
                        if (fs.statSync(toolPath).isDirectory() && fs.existsSync(path.join(toolPath, 'page.tsx'))) {
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
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    // Combine SEO templates
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

    // SEO Conversion specific routes from template
    const seoRoutes = allSeoPages.map((template) => ({
        url: `${baseUrl}/calculate/${template.slug}`,
        lastModified: new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.5,
    }));

    // Blog posts from Supabase
    const blogPosts = await getAllPosts();
    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: (post as { published_at?: string; date?: string }).published_at
            ? new Date((post as { published_at?: string }).published_at!)
            : (post as { date?: string }).date
                ? new Date((post as { date?: string }).date!)
                : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // Aggressive Sitemap Pruning: Explicitly excluding `...seoRoutes` (335+ programmatic pages)
    // to focus Google crawler on the highest value Tool and Blog pages.
    return [...routes, ...toolRoutes, ...blogRoutes];
}
