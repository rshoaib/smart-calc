import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Date Difference Calculator | SmartCalc',
  description: 'Calculate your date difference instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
