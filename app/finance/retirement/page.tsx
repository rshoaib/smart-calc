import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Retirement Calculator | SmartCalc',
  description: 'Calculate your retirement instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
