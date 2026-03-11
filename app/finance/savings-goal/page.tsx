import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Savings Goal Calculator | SmartCalc',
  description: 'Free online savings goal calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Savings Goal Calculator | SmartCalc',
    description: 'Free online savings goal calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/savings-goal',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Savings Goal Calculator | SmartCalc',
    description: 'Free online savings goal calculator.',
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
            name: 'Savings Goal Calculator',
            url: 'https://dailysmartcalc.com/finance/savings-goal',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online savings goal calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
