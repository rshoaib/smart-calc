// Inline SVG icon registry for blog hero banners.
// Each icon is hand-drawn against a 200x200 logical viewport and rendered in
// pure white with varying opacity so it reads cleanly on top of any of the
// three category gradients (indigo→violet, emerald→cyan, pink→orange).
//
// No external dependencies. Same input → same output.

export type IconKey =
    | 'house' | 'car' | 'coins-stack' | 'snowball' | 'shield'
    | 'hourglass' | 'rocket' | 'document-pct' | 'bars-up'
    | 'gauge' | 'clock-dollar' | 'trophy' | 'percent'
    | 'scale-bath' | 'apple' | 'plate-divided' | 'moon'
    | 'heart-ekg' | 'barbell' | 'calendar-heart' | 'tomato'
    | 'graduation-cap' | 'magnifier-house' | 'flame-coins'
    | 'scales-keys' | 'calculator';

// Direct slug → icon mapping for the 34 current posts.
// New posts not in this map fall through to the regex heuristics below.
const SLUG_TO_ICON: Record<string, IconKey> = {
    // Finance — housing
    'how-to-calculate-mortgage-payment': 'house',
    'mortgage-calculator-with-amortization': 'house',
    'hidden-costs-buying-home-2026': 'magnifier-house',
    'renting-vs-buying-2026-analysis': 'scales-keys',
    // Finance — auto
    'how-to-calculate-auto-loan-payment': 'car',
    'auto-loan-calculator-sales-tax-trade-in': 'car',
    // Finance — investing & compounding
    'how-does-compound-interest-work': 'coins-stack',
    'compound-interest-inflation-monster': 'flame-coins',
    // Finance — debt
    'debt-payoff-calculator-snowball-avalanche': 'snowball',
    'debt-snowball-vs-avalanche': 'snowball',
    // Finance — savings & retirement
    'emergency-fund-guide': 'shield',
    'how-much-to-save-for-retirement-2026': 'hourglass',
    'fire-calculator-financial-independence-retire-early': 'rocket',
    'financial-independence-fire-math': 'rocket',
    'how-long-to-become-a-millionaire': 'trophy',
    // Finance — taxes & marketing
    'how-to-calculate-2025-federal-income-tax': 'document-pct',
    'roi-vs-roas-calculator-marketing-profitability': 'bars-up',
    // Finance — credit & income
    'how-to-improve-credit-score-fast': 'gauge',
    'salary-hourly-conversion-guide': 'clock-dollar',
    'freelance-hourly-rate-calculator-guide': 'clock-dollar',
    'true-cost-of-meetings': 'clock-dollar',
    // Finance — small calculators
    'how-much-to-tip-2026-guide': 'percent',
    'how-to-calculate-percentage-change': 'percent',
    // Health
    'what-is-a-healthy-bmi-range': 'scale-bath',
    'bmi-calculator-adults-2026': 'scale-bath',
    'bmi-what-your-number-really-means': 'scale-bath',
    'calories-in-calories-out-guide': 'apple',
    'macro-split-calculator-guide': 'plate-divided',
    'sleep-productivity-science': 'moon',
    'zone-2-training-heart-rate-guide': 'heart-ekg',
    'one-rep-max-calculator-formulas-guide': 'barbell',
    'pregnancy-due-date-calculator-guide': 'calendar-heart',
    // Productivity
    'pomodoro-technique-deep-focus-guide': 'tomato',
    'gpa-calculator-guide': 'graduation-cap',
};

// Heuristic fallback for slugs not in the explicit map (future posts).
const REGEX_FALLBACKS: Array<[RegExp, IconKey]> = [
    [/mortgage|home-buying|hidden-cost.*home/, 'house'],
    [/auto-loan|car-loan|vehicle/, 'car'],
    [/compound-interest|investing|coin/, 'coins-stack'],
    [/debt|snowball|avalanche/, 'snowball'],
    [/emergency-fund/, 'shield'],
    [/retirement|retire/, 'hourglass'],
    [/fire|financial-independence/, 'rocket'],
    [/millionaire|wealth/, 'trophy'],
    [/tax/, 'document-pct'],
    [/roi|roas|marketing/, 'bars-up'],
    [/credit-score/, 'gauge'],
    [/salary|hourly|freelance|meetings?/, 'clock-dollar'],
    [/percentage|tip/, 'percent'],
    [/rent.*buy|buy.*rent/, 'scales-keys'],
    [/bmi|body-mass/, 'scale-bath'],
    [/calorie/, 'apple'],
    [/macro/, 'plate-divided'],
    [/sleep/, 'moon'],
    [/heart-rate|zone-\d|cardio/, 'heart-ekg'],
    [/one-rep-max|1rm|strength|lift/, 'barbell'],
    [/pregnan|due-date/, 'calendar-heart'],
    [/pomodoro|focus|productivity/, 'tomato'],
    [/gpa|grade/, 'graduation-cap'],
];

export function pickIconKey(slug: string): IconKey {
    if (slug in SLUG_TO_ICON) return SLUG_TO_ICON[slug];
    for (const [re, key] of REGEX_FALLBACKS) {
        if (re.test(slug)) return key;
    }
    return 'calculator';
}

// Each fragment is positioned within a 200×200 box. The host SVG places it
// via `transform="translate(...) scale(...)"`. All shapes use white with
// modulated opacity for cross-gradient legibility; deeper recesses use
// black at low alpha to give a sense of depth without introducing color.
//
// IMPORTANT: keep these as raw strings (no XML namespaces) — they are
// inlined into a parent <svg> element, not standalone documents.
export const ICONS: Record<IconKey, string> = {
    house: `<g stroke="white" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
        <rect x="138" y="38" width="18" height="32" fill="white" fill-opacity="0.92"/>
        <path d="M18 102 L100 30 L182 102 Z" fill="white" fill-opacity="0.95"/>
        <rect x="36" y="100" width="128" height="80" fill="white" fill-opacity="0.90"/>
        <rect x="86" y="124" width="28" height="56" fill="rgba(0,0,0,0.22)" stroke="none"/>
        <rect x="50" y="114" width="22" height="22" fill="rgba(0,0,0,0.22)" stroke="none"/>
        <rect x="128" y="114" width="22" height="22" fill="rgba(0,0,0,0.22)" stroke="none"/>
    </g>`,

    car: `<g stroke="white" stroke-width="3" stroke-linejoin="round">
        <path d="M16 138 Q16 110 44 108 L62 76 Q70 58 92 58 L138 58 Q156 58 166 76 L184 108 Q192 108 192 138 L192 156 L16 156 Z" fill="white" fill-opacity="0.93"/>
        <path d="M68 80 L88 64 L122 64 L138 80 L100 80 Z" fill="rgba(0,0,0,0.25)" stroke="none"/>
        <circle cx="58" cy="160" r="22" fill="rgba(0,0,0,0.35)" stroke="none"/>
        <circle cx="148" cy="160" r="22" fill="rgba(0,0,0,0.35)" stroke="none"/>
        <circle cx="58" cy="160" r="9" fill="white" stroke="none"/>
        <circle cx="148" cy="160" r="9" fill="white" stroke="none"/>
    </g>`,

    'coins-stack': `<g fill="white" fill-opacity="0.93" stroke="white" stroke-width="2.5">
        <ellipse cx="100" cy="158" rx="62" ry="14"/>
        <path d="M38 158 V134 Q38 148 100 148 Q162 148 162 134 V158" fill="rgba(0,0,0,0.18)"/>
        <ellipse cx="100" cy="134" rx="62" ry="14" fill="white" fill-opacity="0.95"/>
        <path d="M48 134 V112 Q48 124 100 124 Q152 124 152 112 V134" fill="rgba(0,0,0,0.14)"/>
        <ellipse cx="100" cy="112" rx="52" ry="12" fill="white"/>
        <path d="M58 112 V92 Q58 102 100 102 Q142 102 142 92 V112" fill="rgba(0,0,0,0.10)"/>
        <ellipse cx="100" cy="92" rx="42" ry="10" fill="white"/>
        <text x="100" y="98" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="14" font-weight="700" fill="rgba(0,0,0,0.55)" stroke="none">$</text>
    </g>`,

    snowball: `<g>
        <circle cx="100" cy="110" r="68" fill="white" fill-opacity="0.95"/>
        <circle cx="78" cy="92" r="10" fill="rgba(0,0,0,0.10)"/>
        <circle cx="120" cy="100" r="6" fill="rgba(0,0,0,0.10)"/>
        <circle cx="92" cy="130" r="8" fill="rgba(0,0,0,0.10)"/>
        <circle cx="130" cy="138" r="5" fill="rgba(0,0,0,0.10)"/>
        <path d="M30 184 Q90 178 168 184" stroke="white" stroke-width="4" fill="none" stroke-linecap="round" stroke-opacity="0.7"/>
        <circle cx="42" cy="174" r="3.5" fill="white" stroke="none"/>
        <circle cx="58" cy="170" r="3" fill="white" stroke="none"/>
        <circle cx="166" cy="174" r="3.5" fill="white" stroke="none"/>
    </g>`,

    shield: `<g stroke="white" stroke-width="3" stroke-linejoin="round">
        <path d="M100 24 Q100 24 36 50 L36 110 Q36 156 100 184 Q164 156 164 110 L164 50 Q164 50 100 24 Z" fill="white" fill-opacity="0.95"/>
        <path d="M68 104 L92 128 L138 78" stroke="rgba(0,0,0,0.45)" stroke-width="10" fill="none" stroke-linecap="round"/>
    </g>`,

    hourglass: `<g stroke="white" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
        <rect x="46" y="22" width="108" height="10" fill="white" fill-opacity="0.95"/>
        <rect x="46" y="168" width="108" height="10" fill="white" fill-opacity="0.95"/>
        <path d="M52 32 L148 32 L106 96 L148 168 L52 168 L94 96 Z" fill="white" fill-opacity="0.92"/>
        <path d="M62 40 L138 40 L100 96 L62 40 Z" fill="rgba(255,200,80,0.55)" stroke="none"/>
        <path d="M88 110 L112 110 L138 162 L62 162 L88 110 Z" fill="rgba(255,200,80,0.55)" stroke="none"/>
        <line x1="100" y1="96" x2="100" y2="118" stroke="rgba(255,200,80,0.85)" stroke-width="2"/>
    </g>`,

    rocket: `<g stroke="white" stroke-width="3" stroke-linejoin="round">
        <path d="M100 18 Q138 60 138 110 L138 142 L62 142 L62 110 Q62 60 100 18 Z" fill="white" fill-opacity="0.95"/>
        <circle cx="100" cy="86" r="14" fill="rgba(0,0,0,0.30)" stroke="none"/>
        <circle cx="100" cy="86" r="6" fill="white" stroke="none"/>
        <path d="M62 110 L36 138 L36 166 L62 142 Z" fill="white" fill-opacity="0.85"/>
        <path d="M138 110 L164 138 L164 166 L138 142 Z" fill="white" fill-opacity="0.85"/>
        <path d="M84 142 L100 186 L116 142 Z" fill="rgba(255,180,40,0.85)" stroke="none"/>
        <path d="M92 142 L100 168 L108 142 Z" fill="rgba(255,255,255,0.95)" stroke="none"/>
    </g>`,

    'document-pct': `<g stroke="white" stroke-width="3" stroke-linejoin="round">
        <path d="M40 20 L132 20 L172 60 L172 184 L40 184 Z" fill="white" fill-opacity="0.95"/>
        <path d="M132 20 L132 60 L172 60" fill="rgba(0,0,0,0.10)" stroke="white" stroke-width="3"/>
        <text x="100" y="138" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="64" font-weight="800" fill="rgba(0,0,0,0.55)" stroke="none">%</text>
    </g>`,

    'bars-up': `<g stroke="white" stroke-width="2.5" stroke-linejoin="round">
        <rect x="32" y="124" width="34" height="60" fill="white" fill-opacity="0.85"/>
        <rect x="82" y="86" width="34" height="98" fill="white" fill-opacity="0.92"/>
        <rect x="132" y="48" width="34" height="136" fill="white" fill-opacity="0.98"/>
        <path d="M28 80 L96 50 L132 70 L180 22" stroke="rgba(255,200,80,0.95)" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M168 22 L184 22 L184 38" stroke="rgba(255,200,80,0.95)" stroke-width="5" fill="none" stroke-linecap="round"/>
    </g>`,

    gauge: `<g stroke="white" stroke-width="3" stroke-linecap="round">
        <path d="M28 138 A72 72 0 0 1 172 138" fill="none" stroke="white" stroke-width="14" stroke-opacity="0.40"/>
        <path d="M28 138 A72 72 0 0 1 110 70" fill="none" stroke="rgba(255,220,100,0.95)" stroke-width="14"/>
        <line x1="100" y1="138" x2="138" y2="78" stroke="white" stroke-width="6"/>
        <circle cx="100" cy="138" r="10" fill="white" stroke="none"/>
        <text x="100" y="176" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="22" font-weight="700" fill="white" stroke="none">800</text>
    </g>`,

    'clock-dollar': `<g stroke="white" stroke-width="3" stroke-linecap="round">
        <circle cx="100" cy="100" r="76" fill="white" fill-opacity="0.95"/>
        <circle cx="100" cy="100" r="76" fill="none" stroke="white" stroke-width="3"/>
        <line x1="100" y1="40" x2="100" y2="48" stroke="rgba(0,0,0,0.55)" stroke-width="3"/>
        <line x1="100" y1="152" x2="100" y2="160" stroke="rgba(0,0,0,0.55)" stroke-width="3"/>
        <line x1="40" y1="100" x2="48" y2="100" stroke="rgba(0,0,0,0.55)" stroke-width="3"/>
        <line x1="152" y1="100" x2="160" y2="100" stroke="rgba(0,0,0,0.55)" stroke-width="3"/>
        <text x="100" y="118" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="62" font-weight="800" fill="rgba(0,0,0,0.65)" stroke="none">$</text>
    </g>`,

    trophy: `<g stroke="white" stroke-width="3" stroke-linejoin="round">
        <path d="M58 30 L142 30 L138 88 Q138 122 100 122 Q62 122 62 88 Z" fill="white" fill-opacity="0.95"/>
        <path d="M58 42 Q26 42 26 64 Q26 88 60 92" fill="none" stroke="white" stroke-width="6"/>
        <path d="M142 42 Q174 42 174 64 Q174 88 140 92" fill="none" stroke="white" stroke-width="6"/>
        <rect x="84" y="122" width="32" height="22" fill="white" fill-opacity="0.95"/>
        <rect x="58" y="144" width="84" height="14" rx="3" fill="white" fill-opacity="0.95"/>
        <rect x="46" y="158" width="108" height="20" rx="4" fill="white" fill-opacity="0.95"/>
        <text x="100" y="92" text-anchor="middle" font-family="ui-sans-serif, system-ui, sans-serif" font-size="36" font-weight="800" fill="rgba(0,0,0,0.50)" stroke="none">1</text>
    </g>`,

    percent: `<g fill="white" fill-opacity="0.95" stroke="white" stroke-width="2">
        <circle cx="62" cy="62" r="22"/>
        <circle cx="138" cy="138" r="22"/>
        <circle cx="62" cy="62" r="9" fill="rgba(0,0,0,0.55)" stroke="none"/>
        <circle cx="138" cy="138" r="9" fill="rgba(0,0,0,0.55)" stroke="none"/>
        <line x1="40" y1="160" x2="160" y2="40" stroke="white" stroke-width="14" stroke-linecap="round" stroke-opacity="0.95"/>
    </g>`,

    'scale-bath': `<g stroke="white" stroke-width="3" stroke-linejoin="round">
        <rect x="24" y="60" width="152" height="120" rx="14" fill="white" fill-opacity="0.95"/>
        <circle cx="100" cy="120" r="40" fill="rgba(0,0,0,0.15)" stroke="white" stroke-width="3"/>
        <line x1="100" y1="86" x2="100" y2="92" stroke="white" stroke-width="3"/>
        <line x1="134" y1="120" x2="128" y2="120" stroke="white" stroke-width="3"/>
        <line x1="66" y1="120" x2="72" y2="120" stroke="white" stroke-width="3"/>
        <line x1="100" y1="120" x2="120" y2="106" stroke="rgba(255,200,80,0.95)" stroke-width="5" stroke-linecap="round"/>
        <circle cx="100" cy="120" r="6" fill="white" stroke="none"/>
        <rect x="40" y="50" width="12" height="14" fill="white" fill-opacity="0.7" stroke="none"/>
        <rect x="148" y="50" width="12" height="14" fill="white" fill-opacity="0.7" stroke="none"/>
    </g>`,

    apple: `<g stroke="white" stroke-width="3" stroke-linejoin="round">
        <path d="M104 50 Q120 30 142 28 Q138 50 122 60" fill="rgba(255,255,255,0.55)" stroke="none"/>
        <path d="M100 56 Q78 40 56 56 Q34 76 38 110 Q44 156 76 178 Q92 184 100 168 Q108 184 124 178 Q156 156 162 110 Q166 76 144 56 Q122 40 100 56 Z" fill="white" fill-opacity="0.95"/>
        <line x1="100" y1="56" x2="100" y2="40" stroke="white" stroke-width="6" stroke-linecap="round"/>
        <ellipse cx="76" cy="92" rx="14" ry="20" fill="rgba(255,255,255,0.55)" stroke="none" transform="rotate(-25 76 92)"/>
    </g>`,

    'plate-divided': `<g stroke="white" stroke-width="3">
        <circle cx="100" cy="100" r="84" fill="white" fill-opacity="0.95"/>
        <circle cx="100" cy="100" r="84" fill="none" stroke="white" stroke-width="3"/>
        <path d="M100 16 A84 84 0 0 1 184 100 L100 100 Z" fill="rgba(255,180,40,0.55)" stroke="none"/>
        <path d="M184 100 A84 84 0 0 1 100 184 L100 100 Z" fill="rgba(120,200,120,0.55)" stroke="none"/>
        <path d="M100 184 A84 84 0 0 1 16 100 L100 100 Z" fill="rgba(220,120,160,0.50)" stroke="none"/>
        <path d="M16 100 A84 84 0 0 1 100 16 L100 100 Z" fill="rgba(120,170,230,0.50)" stroke="none"/>
        <line x1="100" y1="16" x2="100" y2="184" stroke="white" stroke-width="3"/>
        <line x1="16" y1="100" x2="184" y2="100" stroke="white" stroke-width="3"/>
    </g>`,

    moon: `<g>
        <path d="M134 22 Q70 30 60 100 Q70 178 142 184 Q98 162 86 100 Q88 46 134 22 Z" fill="white" fill-opacity="0.95"/>
        <circle cx="40" cy="40" r="3" fill="white" stroke="none"/>
        <circle cx="156" cy="50" r="2.5" fill="white" stroke="none"/>
        <circle cx="32" cy="92" r="2" fill="white" stroke="none"/>
        <circle cx="168" cy="120" r="3" fill="white" stroke="none"/>
        <circle cx="48" cy="158" r="2" fill="white" stroke="none"/>
    </g>`,

    'heart-ekg': `<g>
        <path d="M100 178 Q40 138 32 86 Q30 50 60 42 Q86 38 100 64 Q114 38 140 42 Q170 50 168 86 Q160 138 100 178 Z" fill="white" fill-opacity="0.95"/>
        <path d="M30 110 L66 110 L78 84 L92 142 L108 90 L122 110 L170 110" stroke="rgba(0,0,0,0.55)" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`,

    barbell: `<g stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <line x1="14" y1="100" x2="186" y2="100" stroke="white" stroke-width="10"/>
        <rect x="22" y="62" width="22" height="76" rx="3" fill="white" fill-opacity="0.95"/>
        <rect x="50" y="48" width="22" height="104" rx="3" fill="white" fill-opacity="0.95"/>
        <rect x="128" y="48" width="22" height="104" rx="3" fill="white" fill-opacity="0.95"/>
        <rect x="156" y="62" width="22" height="76" rx="3" fill="white" fill-opacity="0.95"/>
    </g>`,

    'calendar-heart': `<g stroke="white" stroke-width="3" stroke-linejoin="round">
        <rect x="22" y="40" width="156" height="140" rx="10" fill="white" fill-opacity="0.95"/>
        <rect x="22" y="40" width="156" height="36" rx="10" fill="rgba(0,0,0,0.18)" stroke="none"/>
        <rect x="40" y="22" width="14" height="32" rx="3" fill="white"/>
        <rect x="146" y="22" width="14" height="32" rx="3" fill="white"/>
        <path d="M100 168 Q60 138 56 112 Q56 96 70 92 Q86 90 100 110 Q114 90 130 92 Q144 96 144 112 Q140 138 100 168 Z" fill="rgba(255,120,150,0.85)" stroke="none"/>
    </g>`,

    tomato: `<g stroke="white" stroke-width="3" stroke-linejoin="round">
        <path d="M70 56 Q80 38 100 38 Q120 38 130 56" fill="rgba(120,180,80,0.85)" stroke="none"/>
        <path d="M100 38 L100 50" stroke="white" stroke-width="6" stroke-linecap="round"/>
        <ellipse cx="100" cy="118" rx="76" ry="68" fill="white" fill-opacity="0.95"/>
        <path d="M62 90 Q80 78 100 78 Q120 78 138 90" stroke="rgba(0,0,0,0.20)" stroke-width="4" fill="none" stroke-linecap="round"/>
        <line x1="100" y1="118" x2="100" y2="78" stroke="rgba(0,0,0,0.55)" stroke-width="5" stroke-linecap="round"/>
        <line x1="100" y1="118" x2="132" y2="118" stroke="rgba(0,0,0,0.55)" stroke-width="5" stroke-linecap="round"/>
        <circle cx="100" cy="118" r="5" fill="rgba(0,0,0,0.55)" stroke="none"/>
    </g>`,

    'graduation-cap': `<g stroke="white" stroke-width="3" stroke-linejoin="round">
        <path d="M100 50 L188 86 L100 122 L12 86 Z" fill="white" fill-opacity="0.95"/>
        <path d="M44 100 L44 138 Q44 156 100 156 Q156 156 156 138 L156 100" fill="white" fill-opacity="0.85" stroke="white" stroke-width="3"/>
        <line x1="178" y1="92" x2="178" y2="148" stroke="white" stroke-width="4" stroke-linecap="round"/>
        <circle cx="178" cy="156" r="8" fill="rgba(255,200,80,0.95)" stroke="none"/>
    </g>`,

    'magnifier-house': `<g stroke="white" stroke-width="3" stroke-linejoin="round">
        <circle cx="86" cy="86" r="64" fill="white" fill-opacity="0.95"/>
        <circle cx="86" cy="86" r="64" fill="none" stroke="white" stroke-width="6"/>
        <line x1="134" y1="134" x2="184" y2="184" stroke="white" stroke-width="14" stroke-linecap="round"/>
        <path d="M52 92 L86 64 L120 92 L120 116 L52 116 Z" fill="rgba(0,0,0,0.20)" stroke="none"/>
        <rect x="78" y="98" width="16" height="18" fill="white" stroke="none"/>
    </g>`,

    'flame-coins': `<g stroke="white" stroke-width="2.5">
        <ellipse cx="100" cy="166" rx="56" ry="12" fill="white" fill-opacity="0.85"/>
        <path d="M44 166 V146 Q44 158 100 158 Q156 158 156 146 V166" fill="rgba(0,0,0,0.18)" stroke="white" stroke-width="2"/>
        <ellipse cx="100" cy="146" rx="56" ry="12" fill="white" fill-opacity="0.92"/>
        <path d="M52 146 V126 Q52 138 100 138 Q148 138 148 126 V146" fill="rgba(0,0,0,0.14)" stroke="white" stroke-width="2"/>
        <ellipse cx="100" cy="126" rx="48" ry="10" fill="white"/>
        <path d="M100 30 Q72 56 76 86 Q80 110 100 116 Q120 110 124 86 Q128 56 100 30 Z" fill="rgba(255,160,40,0.95)" stroke="none"/>
        <path d="M100 56 Q90 70 92 86 Q96 102 100 108 Q104 102 108 86 Q110 70 100 56 Z" fill="rgba(255,230,120,0.95)" stroke="none"/>
    </g>`,

    'scales-keys': `<g stroke="white" stroke-width="3" stroke-linecap="round">
        <line x1="100" y1="38" x2="100" y2="170" stroke="white" stroke-width="5"/>
        <line x1="48" y1="58" x2="152" y2="58" stroke="white" stroke-width="5"/>
        <path d="M22 102 L48 58 L74 102 Q74 120 48 120 Q22 120 22 102 Z" fill="white" fill-opacity="0.85"/>
        <path d="M126 102 L152 58 L178 102 Q178 120 152 120 Q126 120 126 102 Z" fill="white" fill-opacity="0.85"/>
        <rect x="76" y="166" width="48" height="14" rx="4" fill="white" fill-opacity="0.95"/>
        <circle cx="100" cy="38" r="8" fill="white"/>
    </g>`,

    calculator: `<g stroke="white" stroke-width="3" stroke-linejoin="round">
        <rect x="32" y="20" width="136" height="160" rx="12" fill="white" fill-opacity="0.95"/>
        <rect x="46" y="34" width="108" height="34" rx="4" fill="rgba(0,0,0,0.30)" stroke="none"/>
        <rect x="50" y="84" width="22" height="22" rx="3" fill="rgba(0,0,0,0.18)" stroke="none"/>
        <rect x="80" y="84" width="22" height="22" rx="3" fill="rgba(0,0,0,0.18)" stroke="none"/>
        <rect x="110" y="84" width="22" height="22" rx="3" fill="rgba(0,0,0,0.18)" stroke="none"/>
        <rect x="140" y="84" width="14" height="22" rx="3" fill="rgba(255,180,40,0.85)" stroke="none"/>
        <rect x="50" y="114" width="22" height="22" rx="3" fill="rgba(0,0,0,0.18)" stroke="none"/>
        <rect x="80" y="114" width="22" height="22" rx="3" fill="rgba(0,0,0,0.18)" stroke="none"/>
        <rect x="110" y="114" width="22" height="22" rx="3" fill="rgba(0,0,0,0.18)" stroke="none"/>
        <rect x="140" y="114" width="14" height="22" rx="3" fill="rgba(255,180,40,0.85)" stroke="none"/>
        <rect x="50" y="144" width="52" height="22" rx="3" fill="rgba(0,0,0,0.18)" stroke="none"/>
        <rect x="110" y="144" width="22" height="22" rx="3" fill="rgba(0,0,0,0.18)" stroke="none"/>
        <rect x="140" y="144" width="14" height="22" rx="3" fill="rgba(255,180,40,0.85)" stroke="none"/>
    </g>`,
};

/** Render an icon at a given position/scale within a host SVG. */
export function renderIconGroup(key: IconKey, opts: { x: number; y: number; scale: number }): string {
    const { x, y, scale } = opts;
    return `<g transform="translate(${x},${y}) scale(${scale})">${ICONS[key]}</g>`;
}
