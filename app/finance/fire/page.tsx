import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Fire Calculator | SmartCalc',
  description: 'Calculate your fire instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
