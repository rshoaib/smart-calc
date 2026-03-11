import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'ROI Calculator | SmartCalc',
  description: 'Free online roi calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'ROI Calculator | SmartCalc',
    description: 'Free online roi calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/roi',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'ROI Calculator | SmartCalc',
    description: 'Free online roi calculator.',
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
            name: 'ROI Calculator',
            url: 'https://dailysmartcalc.com/finance/roi',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online roi calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
