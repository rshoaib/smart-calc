import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Bmi Calculator | SmartCalc',
  description: 'Calculate your bmi instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
