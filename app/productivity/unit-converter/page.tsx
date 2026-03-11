import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Unit Converter Calculator | SmartCalc',
  description: 'Free online unit converter calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Unit Converter Calculator | SmartCalc',
    description: 'Free online unit converter calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/productivity/unit-converter',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Unit Converter Calculator | SmartCalc',
    description: 'Free online unit converter calculator.',
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
            name: 'Unit Converter Calculator',
            url: 'https://dailysmartcalc.com/productivity/unit-converter',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online unit converter calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
