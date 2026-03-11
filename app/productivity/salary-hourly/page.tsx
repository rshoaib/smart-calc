import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Salary Hourly Calculator | SmartCalc',
  description: 'Calculate your salary hourly instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
