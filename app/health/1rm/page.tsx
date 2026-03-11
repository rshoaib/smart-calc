import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free 1rm Calculator | SmartCalc',
  description: 'Calculate your 1rm instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
