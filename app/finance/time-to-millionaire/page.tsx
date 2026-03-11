import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Time To Millionaire Calculator | SmartCalc',
  description: 'Free online time to millionaire calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Time To Millionaire Calculator | SmartCalc',
    description: 'Free online time to millionaire calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/time-to-millionaire',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Time To Millionaire Calculator | SmartCalc',
    description: 'Free online time to millionaire calculator.',
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
            name: 'Time To Millionaire Calculator',
            url: 'https://dailysmartcalc.com/finance/time-to-millionaire',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online time to millionaire calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
