'use client';

import { useEffect } from 'react';
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
      <AnalyticsTracker />
      {children}
    </>
  );
}
