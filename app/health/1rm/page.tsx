import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: '1RM Calculator | SmartCalc',
  description: 'Free online 1rm calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: '1RM Calculator | SmartCalc',
    description: 'Free online 1rm calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/health/1rm',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '1RM Calculator | SmartCalc',
    description: 'Free online 1rm calculator.',
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
            name: '1RM Calculator',
            url: 'https://dailysmartcalc.com/health/1rm',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online 1rm calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
