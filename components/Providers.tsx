'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ReactGA from 'react-ga4';

// Import i18n to initialize it
import '@/lib/i18n';

// Initialize GA with env variable (falls back to hardcoded ID for backwards compat)
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-TJXN6009WN';
if (GA_ID) {
    ReactGA.initialize(GA_ID);
}

function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        ReactGA.send({ hitType: 'pageview', page: url });
    }, [pathname, searchParams]);

    return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/*
              `useSearchParams` makes this component opt into client-side
              rendering. We wrap it in its own Suspense so the bailout is
              isolated — only the (invisible) tracker bails out, not the
              page content tree. Without this, the entire app's body
              renders as a loading spinner to crawlers (the pre-fix bug).
            */}
            <Suspense fallback={null}>
                <AnalyticsTracker />
            </Suspense>
            {children}
        </>
    );
}
