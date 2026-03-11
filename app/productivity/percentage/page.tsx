import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Percentage Calculator | SmartCalc',
  description: 'Calculate your percentage instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
