import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Heart Rate Calculator | SmartCalc',
  description: 'Free online heart rate calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Heart Rate Calculator | SmartCalc',
    description: 'Free online heart rate calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/health/heart-rate',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Heart Rate Calculator | SmartCalc',
    description: 'Free online heart rate calculator.',
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
            name: 'Heart Rate Calculator',
            url: 'https://dailysmartcalc.com/health/heart-rate',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online heart rate calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
