import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Pregnancy Due Date Calculator & Milestone Timeline (2026)',
  description: 'Free pregnancy due date calculator. Calculate your estimated delivery date (EDD), see how many weeks pregnant you are, and view your custom milestone timeline.',
  openGraph: {
    title: 'Pregnancy Due Date Calculator & Milestone Timeline',
    description: 'Calculate your estimated delivery date (EDD), see how many weeks pregnant you are, and view your custom milestone timeline.',
    url: 'https://dailysmartcalc.com/health/pregnancy-due-date',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Pregnancy Due Date Calculator',
    description: 'Calculate your exact EDD and view your custom pregnancy milestone timeline.',
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
            name: 'Pregnancy Due Date Calculator',
            url: 'https://dailysmartcalc.com/health/pregnancy-due-date',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            description: 'Free pregnancy due date calculator. Calculate your estimated delivery date (EDD), see how many weeks pregnant you are, and view your custom milestone timeline.'
          })
        }}
      />
      <ClientComponent />
    </>
  );
}
