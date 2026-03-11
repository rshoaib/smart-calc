import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator | SmartCalc',
  description: 'Free online debt payoff calculator. Get accurate results instantly. No sign-up required.',
  openGraph: {
    title: 'Debt Payoff Calculator | SmartCalc',
    description: 'Free online debt payoff calculator. Get accurate results instantly.',
    url: 'https://dailysmartcalc.com/finance/debt-payoff',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Debt Payoff Calculator | SmartCalc',
    description: 'Free online debt payoff calculator.',
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
            name: 'Debt Payoff Calculator',
            url: 'https://dailysmartcalc.com/finance/debt-payoff',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free online debt payoff calculator.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
