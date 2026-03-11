import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Fire Calculator | SmartCalc',
  description: 'Free online fire calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Fire Calculator | SmartCalc',
    description: 'Free online fire calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/fire',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Fire Calculator | SmartCalc',
    description: 'Free online fire calculator.',
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
            name: 'Fire Calculator',
            url: 'https://dailysmartcalc.com/finance/fire',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online fire calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
