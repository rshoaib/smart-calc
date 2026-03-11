import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Gpa Calculator | SmartCalc',
  description: 'Calculate your gpa instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
