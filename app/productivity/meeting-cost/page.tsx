import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Meeting Cost Calculator | SmartCalc',
  description: 'Calculate your meeting cost instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
