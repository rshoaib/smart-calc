// Deterministic per-slug SVG hero generator for DailySmartCalc blog posts.
// Same (slug, category) input → same SVG output, every render.
// No external dependencies — pure string output, safe for both server and client.

export type BlogCategory = 'Finance' | 'Health' | 'Productivity';

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

// Build a small reproducible PRNG from a seed so we can derive multiple values.
function mulberry32(seed: number): () => number {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6D2B79F5) >>> 0;
        let t = a;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
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

// Build a "title" line that fits the 1200x630 banner reasonably.
// We don't try to do full text-layout; we just truncate by character count
// at a length that's safe for the chosen font size.
function fitTitle(title: string | undefined, maxChars: number): string {
    if (!title) return '';
    const trimmed = title.trim();
    if (trimmed.length <= maxChars) return trimmed;
    return trimmed.slice(0, Math.max(0, maxChars - 1)).trimEnd() + '…';
}

export interface HeroOptions {
    slug: string;
    category: BlogCategory | string | null | undefined;
    title?: string;
    /** When true, includes xmlns so the SVG is standalone-valid (e.g. for files). Defaults to false (inline within HTML). */
    standalone?: boolean;
}

/**
 * Generate a deterministic 1200x630 SVG banner for a blog post.
 * Returns the SVG markup as a string. Embed via dangerouslySetInnerHTML
 * or by routing through a server component that emits it.
 */
export function buildBlogHeroSvg(opts: HeroOptions): string {
    const { slug, category, title, standalone = false } = opts;

    const theme = isCategory(category) ? THEMES[category as BlogCategory] : FALLBACK_THEME;
    const seed = hashSlug(slug || 'default');
    const rand = mulberry32(seed);

    // Derive a small set of geometric blobs from the slug seed.
    // Each blob is positioned, sized and rotated independently.
    const blobs = Array.from({ length: 5 }, () => ({
        cx: 100 + rand() * 1000,
        cy: 80 + rand() * 470,
        r: 70 + rand() * 160,
        opacity: 0.08 + rand() * 0.12,
        rot: rand() * 360,
    }));

    // A second layer of thinner accent strokes — derived from the same seed.
    const strokes = Array.from({ length: 3 }, () => ({
        x1: rand() * 1200,
        y1: rand() * 630,
        x2: rand() * 1200,
        y2: rand() * 630,
        w: 4 + rand() * 6,
        opacity: 0.18 + rand() * 0.18,
    }));

    const xmlns = standalone ? ' xmlns="http://www.w3.org/2000/svg"' : '';
    const titleId = `t-${(seed >>> 0).toString(36)}`;
    const gradId = `g-${(seed >>> 0).toString(36)}`;
    const accentId = `a-${(seed >>> 0).toString(36)}`;

    const fittedTitle = fitTitle(title, 60);

    // Build the SVG. Indentation kept minimal — this is meant to be embedded.
    return [
        `<svg${xmlns} viewBox="0 0 1200 630" role="img" aria-labelledby="${titleId}" preserveAspectRatio="xMidYMid slice">`,
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
        // Hash-derived blobs
        ...blobs.map(b => `<circle cx="${b.cx.toFixed(1)}" cy="${b.cy.toFixed(1)}" r="${b.r.toFixed(1)}" fill="white" opacity="${b.opacity.toFixed(2)}"/>`),
        // Hash-derived diagonals
        ...strokes.map(s => `<line x1="${s.x1.toFixed(1)}" y1="${s.y1.toFixed(1)}" x2="${s.x2.toFixed(1)}" y2="${s.y2.toFixed(1)}" stroke="white" stroke-width="${s.w.toFixed(1)}" stroke-linecap="round" opacity="${s.opacity.toFixed(2)}"/>`),
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
        // Optional title overlay (one line, large; truncated to ~60 chars)
        fittedTitle
            ? `<text x="64" y="350" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif" font-size="56" font-weight="800" fill="white" style="paint-order: stroke; stroke: rgba(0,0,0,0.20); stroke-width: 2;">${escapeXml(fittedTitle)}</text>`
            : '',
        `</svg>`,
    ].join('');
}

function isCategory(value: unknown): value is BlogCategory {
    return value === 'Finance' || value === 'Health' || value === 'Productivity';
}
