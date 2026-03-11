import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Typing Speed Calculator | SmartCalc',
  description: 'Free online typing speed calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Typing Speed Calculator | SmartCalc',
    description: 'Free online typing speed calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/productivity/typing-speed',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Typing Speed Calculator | SmartCalc',
    description: 'Free online typing speed calculator.',
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
            name: 'Typing Speed Calculator',
            url: 'https://dailysmartcalc.com/productivity/typing-speed',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online typing speed calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
