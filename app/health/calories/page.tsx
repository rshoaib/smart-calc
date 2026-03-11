import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Calories Calculator | SmartCalc',
  description: 'Calculate your calories instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
