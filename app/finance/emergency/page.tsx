import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Emergency Calculator | SmartCalc',
  description: 'Calculate your emergency instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
