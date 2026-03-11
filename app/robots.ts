import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/dashboard/', '/api/', '/*?q=*'],
        },
        sitemap: 'https://dailysmartcalc.com/sitemap.xml',
    };
}
