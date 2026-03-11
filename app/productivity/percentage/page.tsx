import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Percentage Calculator | SmartCalc',
  description: 'Free online percentage calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Percentage Calculator | SmartCalc',
    description: 'Free online percentage calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/productivity/percentage',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Percentage Calculator | SmartCalc',
    description: 'Free online percentage calculator.',
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
            name: 'Percentage Calculator',
            url: 'https://dailysmartcalc.com/productivity/percentage',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online percentage calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
