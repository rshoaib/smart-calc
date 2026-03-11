import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Freedom Guide Calculator | SmartCalc',
  description: 'Free online freedom guide calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Freedom Guide Calculator | SmartCalc',
    description: 'Free online freedom guide calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/freedom-guide',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Freedom Guide Calculator | SmartCalc',
    description: 'Free online freedom guide calculator.',
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
            name: 'Freedom Guide Calculator',
            url: 'https://dailysmartcalc.com/finance/freedom-guide',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online freedom guide calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
