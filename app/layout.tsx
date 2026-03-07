import type { Metadata } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';
import './globals.css';
import { Providers } from '@/components/Providers';
import { ClientLayout } from '@/components/ClientLayout';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export const metadata: Metadata = {
  metadataBase: new URL('https://dailysmartcalc.com'),
  title: {
    default: 'SmartCalc — Free Finance & Health Calculators',
    template: '%s | SmartCalc',
  },
  description:
    'Free online calculators for mortgage, investment, retirement, BMI, calories, and more. Make smarter financial and health decisions with SmartCalc.',
  openGraph: {
    siteName: 'SmartCalc',
    title: 'SmartCalc — Free Finance & Health Calculators',
    description:
      'Free online calculators for mortgage, investment, retirement, BMI, calories, and more.',
    type: 'website',
    url: 'https://dailysmartcalc.com/',
    images: [{ url: '/og-image.png' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartCalc — Free Finance & Health Calculators',
    description:
      'Free online calculators for mortgage, investment, retirement, BMI, calories, and more.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'fEpeczPxriM3Atvnhr1gFjwaJE-d8agZuguG3PpVssY',
  },
  icons: {
    icon: '/favicon.svg',
  },
  manifest: '/manifest.json',
  other: {
    'google-adsense-account': 'ca-pub-3166995085202346',
    'theme-color': '#1e40af',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3166995085202346"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'DailySmartCalc',
              url: 'https://dailysmartcalc.com',
              description:
                'Free online calculators for mortgage, investment, retirement, BMI, calories, and more.',
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'DailySmartCalc',
              url: 'https://dailysmartcalc.com',
              logo: 'https://dailysmartcalc.com/vite.svg',
              description:
                'Free finance and health calculators — mortgage, compound interest, BMI, calorie tracking, and more.',
            }),
          }}
        />
      </head>
      <body>
        <Suspense fallback={<LoadingSpinner />}>
          <Providers>
            <ClientLayout>{children}</ClientLayout>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
