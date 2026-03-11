import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Freedom Guide Calculator | SmartCalc',
  description: 'Calculate your freedom guide instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
