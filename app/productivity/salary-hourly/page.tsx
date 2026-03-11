import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Salary Hourly Calculator | SmartCalc',
  description: 'Free online salary hourly calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Salary Hourly Calculator | SmartCalc',
    description: 'Free online salary hourly calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/productivity/salary-hourly',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Salary Hourly Calculator | SmartCalc',
    description: 'Free online salary hourly calculator.',
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
            name: 'Salary Hourly Calculator',
            url: 'https://dailysmartcalc.com/productivity/salary-hourly',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online salary hourly calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
