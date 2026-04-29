import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enCommon from '@/locales/en/common.json';
import esCommon from '@/locales/es/common.json';

// IMPORTANT: do not register `i18next-browser-languagedetector` here.
//
// The browser language detector reads `window`, `navigator`, `document.cookie`,
// and `localStorage` synchronously during init. When that runs inside a React
// Server Component / SSR pass it throws, which makes React unwind the
// surrounding Suspense boundary and bail out to client-side rendering.
//
// The visible symptom was that the homepage and most calculator pages served
// nothing but a `<div class="...spinner...">` to crawlers — confirmed via raw
// `curl` of the live HTML in the SEO audit.
//
// Instead, we initialise i18next with a fixed language ("en") on both server
// and client. After hydration in the browser we read the user's stored choice
// from localStorage and switch via `i18n.changeLanguage`. The manual EN/ES
// toggle in `ClientLayout` continues to work and now also persists the choice.

const STORAGE_KEY = 'i18nextLng';

i18n.use(initReactI18next).init({
    debug: false,
    fallbackLng: 'en',
    lng: 'en',
    supportedLngs: ['en', 'es'],
    interpolation: {
        escapeValue: false,
    },
    resources: {
        en: { translation: enCommon },
        es: { translation: esCommon },
    },
});

if (typeof window !== 'undefined') {
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored === 'es' || stored === 'en') {
            if (i18n.language !== stored) {
                i18n.changeLanguage(stored);
            }
        }
    } catch {
        // localStorage may be blocked (private mode, embedded contexts) — fall
        // back to the default 'en' silently.
    }

    // Persist subsequent language changes so the toggle in ClientLayout sticks
    // across reloads.
    i18n.on('languageChanged', (lng) => {
        try {
            window.localStorage.setItem(STORAGE_KEY, lng);
        } catch {
            /* storage quota / blocked — ignore */
        }
    });
}

export default i18n;
