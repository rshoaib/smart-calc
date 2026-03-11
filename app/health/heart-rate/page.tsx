import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Heart Rate Calculator | SmartCalc',
  description: 'Calculate your heart rate instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
