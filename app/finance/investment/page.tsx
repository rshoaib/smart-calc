import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Investment Calculator | SmartCalc',
  description: 'Calculate your investment instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
