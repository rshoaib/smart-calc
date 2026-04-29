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
    glyph: string; // single emoji-free glyph rendered as decorative element (text shape)
}

const THEMES: Record<BlogCategory, CategoryTheme> = {
    Finance: {
        primary: '#4f46e5', // indigo-600
        secondary: '#7c3aed', // violet-600
        accent: '#fbbf24', // amber-400
        label: 'Finance',
        glyph: '$',
    },
    Health: {
        primary: '#059669', // emerald-600
        secondary: '#0891b2', // cyan-600
        accent: '#fde68a', // amber-200
        label: 'Health',
        glyph: '+',
    },
    Productivity: {
        primary: '#db2777', // pink-600
        secondary: '#ea580c', // orange-600
        accent: '#fef3c7', // amber-100
        label: 'Productivity',
        glyph: '⚡',
    },
};

const FALLBACK_THEME: CategoryTheme = {
    primary: '#475569',
    secondary: '#1e293b',
    accent: '#fbbf24',
    label: 'Article',
    glyph: '•',
};

// 32-bit FNV-1a hash — small, fast, deterministic.
function hashSlug(slug: string): number {
    let h = 0x811c9dc5;
    for (let i = 0; i < slug.length; i++) {
        h ^= slug.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
}

// XML-safe text — for the category label and any embedded title.
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
    /** When true, includes xmlns so the SVG is standalone-valid (e.g. for files). Defaults to false (inline within HTML). */
    standalone?: boolean;
}

// Module-scope cache. Outputs are deterministic, so repeated renders of the
// same listing/detail page within a process never recompute the SVG.
const SVG_CACHE = new Map<string, string>();
const MAX_CACHE = 200;

/**
 * Generate a deterministic 1200x630 SVG banner for a blog post.
 * Returns the SVG markup as a string. Embed via dangerouslySetInnerHTML
 * or by routing through a server component that emits it.
 */
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

    // Pick a topic-relevant icon for this slug. Icons are 200×200 logical;
    // we render at 1.7× scale, vertically centered on the canvas, on the
    // right side so the category pill (top-left) and brand mark
    // (bottom-left) stay legible. translate places the icon's top-left
    // corner; an icon at scale 1.7 is 340×340 visually.
    const iconKey = pickIconKey(slug || 'default');
    const iconSvg = ICONS[iconKey];
    const iconScale = 1.7;
    const iconBoxSize = 200 * iconScale; // 340
    // Center of right band: x ≈ 850 (visible after 'xMidYMid slice' crop)
    const iconX = 850 - iconBoxSize / 2; // 680
    const iconY = 315 - iconBoxSize / 2; // 145

    // Build the SVG. Indentation kept minimal — this is meant to be embedded.
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
        // Base gradient
        `<rect width="1200" height="630" fill="url(#${gradId})"/>`,
        // Soft warm highlight in upper-right
        `<rect width="1200" height="630" fill="url(#${accentId})"/>`,
        // Topic icon (replaces the previous random blobs + title text)
        `<g transform="translate(${iconX},${iconY}) scale(${iconScale})">${iconSvg}</g>`,
        // Bottom-left brand mark
        `<g transform="translate(64, 540)">`,
        `<circle cx="0" cy="0" r="22" fill="white" opacity="0.95"/>`,
        `<text x="0" y="7" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif" font-size="26" font-weight="700" text-anchor="middle" fill="${theme.primary}">${escapeXml(theme.glyph)}</text>`,
        `<text x="44" y="6" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif" font-size="22" font-weight="700" fill="white" letter-spacing="0.5">DailySmartCalc</text>`,
        `</g>`,
        // Top-left category label
        `<g transform="translate(64, 80)">`,
        `<rect x="0" y="0" width="${20 + theme.label.length * 12}" height="36" rx="18" fill="white" fill-opacity="0.18" stroke="white" stroke-opacity="0.45" stroke-width="1.5"/>`,
        `<text x="${10 + theme.label.length * 6}" y="24" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif" font-size="16" font-weight="600" text-anchor="middle" fill="white" letter-spacing="1.2">${escapeXml(theme.label.toUpperCase())}</text>`,
        `</g>`,
        `</svg>`,
    ].join('');

    if (SVG_CACHE.size >= MAX_CACHE) {
        SVG_CACHE.clear();
    }
    SVG_CACHE.set(cacheKey, svg);
    return svg;
}

/**
 * Convenience for the common case: pull `slug`, `category`, `title` off a
 * BlogPost-shaped object and pass through. Lets call sites skip the
 * `as BlogCategory` cast.
 */
export function buildHeroForPost(
    post: { slug: string; category: string; title: string },
