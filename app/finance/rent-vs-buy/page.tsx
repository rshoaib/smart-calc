import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Rent Vs Buy Calculator | SmartCalc',
  description: 'Calculate your rent vs buy instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
