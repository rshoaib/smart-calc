import { Metadata } from 'next';
import ClientComponent from './ClientComponent';

export const metadata: Metadata = {
  title: 'Free Pomodoro Calculator | SmartCalc',
  description: 'Calculate your pomodoro instantly with our free online tool.',
};

export default function Page() {
  return <ClientComponent />;
}
