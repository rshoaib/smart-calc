import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Wellness Guide Calculator | SmartCalc',
  description: 'Calculate your wellness guide instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
