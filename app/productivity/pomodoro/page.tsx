import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Pomodoro Calculator | SmartCalc',
  description: 'Free online pomodoro calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Pomodoro Calculator | SmartCalc',
    description: 'Free online pomodoro calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/productivity/pomodoro',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Pomodoro Calculator | SmartCalc',
    description: 'Free online pomodoro calculator.',
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
            name: 'Pomodoro Calculator',
            url: 'https://dailysmartcalc.com/productivity/pomodoro',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online pomodoro calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
