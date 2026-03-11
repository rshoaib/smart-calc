import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Age Calculator | SmartCalc',
  description: 'Free online age calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Age Calculator | SmartCalc',
    description: 'Free online age calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/productivity/age',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Age Calculator | SmartCalc',
    description: 'Free online age calculator.',
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
            name: 'Age Calculator',
            url: 'https://dailysmartcalc.com/productivity/age',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online age calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
