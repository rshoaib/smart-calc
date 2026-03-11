import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Rent Vs Buy Calculator | SmartCalc',
  description: 'Free online rent vs buy calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Rent Vs Buy Calculator | SmartCalc',
    description: 'Free online rent vs buy calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/rent-vs-buy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Rent Vs Buy Calculator | SmartCalc',
    description: 'Free online rent vs buy calculator.',
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
            name: 'Rent Vs Buy Calculator',
            url: 'https://dailysmartcalc.com/finance/rent-vs-buy',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online rent vs buy calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
