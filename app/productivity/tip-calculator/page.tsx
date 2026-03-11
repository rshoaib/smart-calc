import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Tip Calculator Calculator | SmartCalc',
  description: 'Free online tip calculator calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Tip Calculator Calculator | SmartCalc',
    description: 'Free online tip calculator calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/productivity/tip-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Tip Calculator Calculator | SmartCalc',
    description: 'Free online tip calculator calculator.',
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
            name: 'Tip Calculator Calculator',
            url: 'https://dailysmartcalc.com/productivity/tip-calculator',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online tip calculator calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
