import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // Allow Supabase storage images
    images: {
          remotePatterns: [
            {
                      protocol: 'https',
                      hostname: '*.supabase.co',
                      pathname: '/storage/v1/object/public/**',
            },
                ],
    },

    // Security headers (migrated from vercel.json)
    async headers() {
          return [
            {
                      source: '/(.*)',
                      headers: [
                        { key: 'X-Content-Type-Options', value: 'nosniff' },
                        { key: 'X-Frame-Options', value: 'DENY' },
                        { key: 'X-XSS-Protection', value: '1; mode=block' },
                        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
                                ],
            },
                ];
    },

    // Redirects for SEO — preserve old slugs after blog migration (2026-04)
    async redirects() {
          return [
            {
                      source: '/blog/tipping-guide-how-much-to-tip-2026',
                      destination: '/blog/how-much-to-tip-2026-guide',
                      permanent: true,
            },
            {
                      source: '/blog/time-to-millionaire-wealth-building-math',
                      destination: '/blog/how-long-to-become-a-millionaire',
                      permanent: true,
            },
            {
                      source: '/blog/salary-vs-hourly-real-comparison',
                      destination: '/blog/salary-hourly-conversion-guide',
                      permanent: true,
            },
            {
                      source: '/blog/gpa-guide-good-gpa-colleges-employers-2026',
                      destination: '/blog/gpa-calculator-guide',
                      permanent: true,
            },
                ];
    },
};

export default nextConfig;
