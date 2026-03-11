import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Sleep Calculator | SmartCalc',
  description: 'Free online sleep calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Sleep Calculator | SmartCalc',
    description: 'Free online sleep calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/health/sleep',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Sleep Calculator | SmartCalc',
    description: 'Free online sleep calculator.',
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
            name: 'Sleep Calculator',
            url: 'https://dailysmartcalc.com/health/sleep',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online sleep calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
