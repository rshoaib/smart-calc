import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';
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

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://dailysmartcalc.com';

    // Basic routes
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
        priority: route === '' ? 1 : 0.9,
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

    // Blog posts from data source
    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(), // Could be post.date if parsed correctly
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...routes, ...toolRoutes, ...seoRoutes, ...blogRoutes];
}
