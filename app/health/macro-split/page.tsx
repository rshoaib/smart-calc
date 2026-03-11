import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Macro Split Calculator | SmartCalc',
  description: 'Calculate your macro split instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
