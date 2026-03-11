import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Unit Converter Calculator | SmartCalc',
  description: 'Calculate your unit converter instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
