import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Mortgage Calculator | SmartCalc',
  description: 'Free online mortgage calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Mortgage Calculator | SmartCalc',
    description: 'Free online mortgage calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/mortgage',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Mortgage Calculator | SmartCalc',
    description: 'Free online mortgage calculator.',
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
            name: 'Mortgage Calculator',
            url: 'https://dailysmartcalc.com/finance/mortgage',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online mortgage calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
