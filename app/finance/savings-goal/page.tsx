import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Savings Goal Calculator | SmartCalc',
  description: 'Calculate your savings goal instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
