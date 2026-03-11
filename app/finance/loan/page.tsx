import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Loan Calculator | SmartCalc',
  description: 'Calculate your loan instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
