import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Inflation Calculator | Historical & Future Value | SmartCalc',
  description: 'Calculate the changing value of the US dollar over time. See how inflation impacts purchasing power from 1913 to today using historical CPI data.',
  openGraph: {
    title: 'Inflation Calculator | Historical & Future Value | SmartCalc',
    description: 'Calculate the changing value of the US dollar over time.',
    url: 'https://dailysmartcalc.com/finance/inflation',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Inflation Calculator | Historical & Future Value',
    description: 'Calculate the changing value of the US dollar.',
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
            name: 'Inflation Calculator',
            url: 'https://dailysmartcalc.com/finance/inflation',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online calculator to measure the changing purchasing power of the US dollar over time using official historical CPI data.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
