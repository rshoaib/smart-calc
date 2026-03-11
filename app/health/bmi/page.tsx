import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'BMI Calculator | SmartCalc',
  description: 'Free online bmi calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'BMI Calculator | SmartCalc',
    description: 'Free online bmi calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/health/bmi',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'BMI Calculator | SmartCalc',
    description: 'Free online bmi calculator.',
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
            name: 'BMI Calculator',
            url: 'https://dailysmartcalc.com/health/bmi',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online bmi calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
