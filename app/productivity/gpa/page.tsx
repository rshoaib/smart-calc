import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'GPA Calculator | SmartCalc',
  description: 'Free online gpa calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'GPA Calculator | SmartCalc',
    description: 'Free online gpa calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/productivity/gpa',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'GPA Calculator | SmartCalc',
    description: 'Free online gpa calculator.',
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
            name: 'GPA Calculator',
            url: 'https://dailysmartcalc.com/productivity/gpa',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online gpa calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
