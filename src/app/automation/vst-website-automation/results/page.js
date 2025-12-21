import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import VstResultsClient from './VstResultsClient';

export default async function VstResults() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('user_role')?.value;

  if (userRole !== 'admin') {
    redirect('/login');
  }

  return <VstResultsClient />;
}