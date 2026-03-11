import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Macro Split Calculator | SmartCalc',
  description: 'Free online macro split calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Macro Split Calculator | SmartCalc',
    description: 'Free online macro split calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/health/macro-split',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Macro Split Calculator | SmartCalc',
    description: 'Free online macro split calculator.',
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Macro Split Calculator',
            url: 'https://dailysmartcalc.com/health/macro-split',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online macro split calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
