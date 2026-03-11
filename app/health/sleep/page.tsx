import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Sleep Calculator | SmartCalc',
  description: 'Calculate your sleep instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
