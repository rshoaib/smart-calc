import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Investment Calculator | SmartCalc',
  description: 'Free online investment calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Investment Calculator | SmartCalc',
    description: 'Free online investment calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/investment',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Investment Calculator | SmartCalc',
    description: 'Free online investment calculator.',
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
            name: 'Investment Calculator',
            url: 'https://dailysmartcalc.com/finance/investment',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online investment calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
