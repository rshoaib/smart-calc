import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Calories Calculator | SmartCalc',
  description: 'Free online calories calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Calories Calculator | SmartCalc',
    description: 'Free online calories calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/health/calories',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Calories Calculator | SmartCalc',
    description: 'Free online calories calculator.',
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
            name: 'Calories Calculator',
            url: 'https://dailysmartcalc.com/health/calories',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online calories calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
