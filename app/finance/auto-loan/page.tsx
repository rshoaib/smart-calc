import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Auto Loan Calculator with Sales Tax & Trade-In (2026)',
  description: 'Free auto loan calculator. Generate your exact car payment amortization schedule. Factor in dealership sales tax, trade-in value, and negative equity.',
  openGraph: {
    title: 'Auto Loan Calculator with Sales Tax & Trade-In',
    description: 'Free auto loan calculator. Generate your exact car payment amortization schedule with sales tax and trade-in value.',
    url: 'https://dailysmartcalc.com/finance/auto-loan',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Auto Loan Calculator',
    description: 'Calculate your true car payment with sales tax and trade-in value.',
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
            name: 'Auto Loan Calculator',
            url: 'https://dailysmartcalc.com/finance/auto-loan',
            applicationCategory: 'CalculatorApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free auto loan calculator. Generate your exact car payment amortization schedule. Factor in dealership sales tax, trade-in value, and negative equity.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
