import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Emergency Calculator | SmartCalc',
  description: 'Free online emergency calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Emergency Calculator | SmartCalc',
    description: 'Free online emergency calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/emergency',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Emergency Calculator | SmartCalc',
    description: 'Free online emergency calculator.',
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
            name: 'Emergency Calculator',
            url: 'https://dailysmartcalc.com/finance/emergency',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online emergency calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
