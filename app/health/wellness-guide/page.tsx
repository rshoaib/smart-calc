import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Wellness Guide Calculator | SmartCalc',
  description: 'Free online wellness guide calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Wellness Guide Calculator | SmartCalc',
    description: 'Free online wellness guide calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/health/wellness-guide',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Wellness Guide Calculator | SmartCalc',
    description: 'Free online wellness guide calculator.',
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
            name: 'Wellness Guide Calculator',
            url: 'https://dailysmartcalc.com/health/wellness-guide',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online wellness guide calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
