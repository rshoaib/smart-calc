import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Mortgage Calculator | SmartCalc',
  description: 'Calculate your mortgage instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
