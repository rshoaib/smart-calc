import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Loan Calculator | SmartCalc',
  description: 'Free online loan calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Loan Calculator | SmartCalc',
    description: 'Free online loan calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/loan',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Loan Calculator | SmartCalc',
    description: 'Free online loan calculator.',
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
            name: 'Loan Calculator',
            url: 'https://dailysmartcalc.com/finance/loan',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online loan calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
