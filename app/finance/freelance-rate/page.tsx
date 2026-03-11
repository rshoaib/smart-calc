import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Freelance Rate Calculator | SmartCalc',
  description: 'Calculate your freelance rate instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
