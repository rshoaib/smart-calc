import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Time To Millionaire Calculator | SmartCalc',
  description: 'Calculate your time to millionaire instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
