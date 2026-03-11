import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Retirement Calculator | SmartCalc',
  description: 'Free online retirement calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Retirement Calculator | SmartCalc',
    description: 'Free online retirement calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/retirement',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Retirement Calculator | SmartCalc',
    description: 'Free online retirement calculator.',
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
            name: 'Retirement Calculator',
            url: 'https://dailysmartcalc.com/finance/retirement',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online retirement calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
