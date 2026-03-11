import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Roi Calculator | SmartCalc',
  description: 'Calculate your roi instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
