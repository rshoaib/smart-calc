import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Meeting Cost Calculator | SmartCalc',
  description: 'Free online meeting cost calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Meeting Cost Calculator | SmartCalc',
    description: 'Free online meeting cost calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/productivity/meeting-cost',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Meeting Cost Calculator | SmartCalc',
    description: 'Free online meeting cost calculator.',
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
            name: 'Meeting Cost Calculator',
            url: 'https://dailysmartcalc.com/productivity/meeting-cost',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online meeting cost calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
