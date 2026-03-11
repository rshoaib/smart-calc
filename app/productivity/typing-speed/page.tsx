import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Typing Speed Calculator | SmartCalc',
  description: 'Calculate your typing speed instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
