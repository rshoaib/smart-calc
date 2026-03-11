import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Date Difference Calculator | SmartCalc',
  description: 'Free online date difference calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Date Difference Calculator | SmartCalc',
    description: 'Free online date difference calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/productivity/date-difference',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Date Difference Calculator | SmartCalc',
    description: 'Free online date difference calculator.',
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
            name: 'Date Difference Calculator',
            url: 'https://dailysmartcalc.com/productivity/date-difference',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online date difference calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
