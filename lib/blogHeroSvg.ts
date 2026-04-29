// Deterministic per-slug SVG hero generator for DailySmartCalc blog posts.
// Same (slug, category) input → same SVG output, every render.
// No external dependencies — pure string output, safe for both server and client.

import { ICONS, pickIconKey } from './blogHeroIcons';

export type BlogCategory = 'Finance' | 'Health' | 'Productivity';

export function isCategory(value: unknown): value is BlogCategory {
    return value === 'Finance' || value === 'Health' || value === 'Productivity';
}

interface CategoryTheme {
    primary: string;
    secondary: string;
    accent: string;
    label: string;
    glyph: string;
}

const THEMES: Record<BlogCategory, CategoryTheme> = {
    Finance: { primary: '#4f46e5', secondary: '#7c3aed', accent: '#fbbf24', label: 'Finance', glyph: '$' },
    Health: { primary: '#059669', secondary: '#0891b2', accent: '#fde68a', label: 'Health', glyph: '+' },
    Productivity: { primary: '#db2777', secondary: '#ea580c', accent: '#fef3c7', label: 'Productivity', glyph: '⚡' },
};

const FALLBACK_THEME: CategoryTheme = {
    primary: '#475569', secondary: '#1e293b', accent: '#fbbf24', label: 'Article', glyph: '•',
};

function hashSlug(slug: string): number {
    let h = 0x811c9dc5;
    for (let i = 0; i < slug.length; i++) {
        h ^= slug.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
}

function escapeXml(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export interface HeroOptions {
    slug: string;
    category: BlogCategory | string | null | undefined;
    title?: string;
    standalone?: boolean;
}

const SVG_CACHE = new Map<string, string>();
const MAX_CACHE = 200;

export function buildBlogHeroSvg(opts: HeroOptions): string {
    const { slug, category, title, standalone = false } = opts;
    const cacheKey = `${standalone ? 's' : 'i'}|${slug}|${category ?? ''}|${title ?? ''}`;
    const cached = SVG_CACHE.get(cacheKey);
    if (cached) return cached;

    const theme = isCategory(category) ? THEMES[category] : FALLBACK_THEME;
    const seed = hashSlug(slug || 'default');

    const xmlns = standalone ? ' xmlns="http://www.w3.org/2000/svg"' : '';
    const titleId = `t-${(seed >>> 0).toString(36)}`;
    const gradId = `g-${(seed >>> 0).toString(36)}`;
    const accentId = `a-${(seed >>> 0).toString(36)}`;

    const iconKey = pickIconKey(slug || 'default');
    const iconSvg = ICONS[iconKey];
    const iconScale = 1.7;
    const iconBoxSize = 200 * iconScale;
    const iconX = 850 - iconBoxSize / 2;
    const iconY = 315 - iconBoxSize / 2;

    const svg = [
        `<svg${xmlns} viewBox="0 0 1200 630" role="img" aria-labelledby="${titleId}" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" style="display:block">`,
        `<title id="${titleId}">${escapeXml(title || theme.label + ' article')}</title>`,
        `<defs>`,
        `<linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="100%">`,
        `<stop offset="0%" stop-color="${theme.primary}"/>`,
        `<stop offset="100%" stop-color="${theme.secondary}"/>`,
        `</linearGradient>`,
        `<radialGradient id="${accentId}" cx="80%" cy="20%" r="70%">`,
        `<stop offset="0%" stop-color="${theme.accent}" stop-opacity="0.55"/>`,
        `<stop offset="100%" stop-color="${theme.accent}" stop-opacity="0"/>`,
        `</radialGradient>`,
        `</defs>`,
        `<rect width="1200" height="630" fill="url(#${gradId})"/>`,
        `<rect width="1200" height="630" fill="url(#${accentId})"/>`,
        `<g transform="translate(${iconX},${iconY}) scale(${iconScale})">${iconSvg}</g>`,
        `<g transform="translate(64, 540)">`,
        `<circle cx="0" cy="0" r="22" fill="white" opacity="0.95"/>`,
        `<text x="0" y="7" font-family="ui-sans-serif, system-ui, sans-serif" font-size="26" font-weight="700" text-anchor="middle" fill="${theme.primary}">${escapeXml(theme.glyph)}</text>`,
        `<text x="44" y="6" font-family="ui-sans-serif, system-ui, sans-serif" font-size="22" font-weight="700" fill="white" letter-spacing="0.5">DailySmartCalc</text>`,
        `</g>`,
        `<g transform="translate(64, 80)">`,
        `<rect x="0" y="0" width="${20 + theme.label.length * 12}" height="36" rx="18" fill="white" fill-opacity="0.18" stroke="white" stroke-opacity="0.45" stroke-width="1.5"/>`,
        `<text x="${10 + theme.label.length * 6}" y="24" font-family="ui-sans-serif, system-ui, sans-serif" font-size="16" font-weight="600" text-anchor="middle" fill="white" letter-spacing="1.2">${escapeXml(theme.label.toUpperCase())}</text>`,
        `</g>`,
        `</svg>`,
    ].join('');

    if (SVG_CACHE.size >= MAX_CACHE) {
        SVG_CACHE.clear();
    }
    SVG_CACHE.set(cacheKey, svg);
    return svg;
}

export function buildHeroForPost(
    post: { slug: string; category: string; title: string },
    opts: { standalone?: boolean } = {},
): string {
    return buildBlogHeroSvg({
        slug: post.slug,
        category: post.category,
        title: post.title,
        standalone: opts.standalone,
    });
}
