import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Inflation Calculator | SmartCalc',
  description: 'Free online inflation calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Inflation Calculator | SmartCalc',
    description: 'Free online inflation calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/inflation',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Inflation Calculator | SmartCalc',
    description: 'Free online inflation calculator.',
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
            name: 'Inflation Calculator',
            url: 'https://dailysmartcalc.com/finance/inflation',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online inflation calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
