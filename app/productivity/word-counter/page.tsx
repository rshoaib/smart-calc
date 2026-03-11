import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Word Counter Calculator | SmartCalc',
  description: 'Calculate your word counter instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
