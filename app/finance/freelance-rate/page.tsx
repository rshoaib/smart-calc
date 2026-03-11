import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Freelance Rate Calculator | SmartCalc',
  description: 'Free online freelance rate calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Freelance Rate Calculator | SmartCalc',
    description: 'Free online freelance rate calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/freelance-rate',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Freelance Rate Calculator | SmartCalc',
    description: 'Free online freelance rate calculator.',
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
            name: 'Freelance Rate Calculator',
            url: 'https://dailysmartcalc.com/finance/freelance-rate',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online freelance rate calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
