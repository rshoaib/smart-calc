import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Debt Payoff Calculator | SmartCalc',
  description: 'Calculate your debt payoff instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
