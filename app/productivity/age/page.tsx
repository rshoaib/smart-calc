import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Age Calculator | SmartCalc',
  description: 'Calculate your age instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
