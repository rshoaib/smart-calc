import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Tip Calculator Calculator | SmartCalc',
  description: 'Calculate your tip calculator instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
