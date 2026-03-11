import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Word Counter Calculator | SmartCalc',
  description: 'Free online word counter calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Word Counter Calculator | SmartCalc',
    description: 'Free online word counter calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/productivity/word-counter',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Word Counter Calculator | SmartCalc',
    description: 'Free online word counter calculator.',
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
            name: 'Word Counter Calculator',
            url: 'https://dailysmartcalc.com/productivity/word-counter',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online word counter calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
