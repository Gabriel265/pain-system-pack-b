import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import VstSafetyClient from './VstSafetyClient';

export default async function VstSafety() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('user_role')?.value;

  if (userRole !== 'admin') {
    redirect('/login');
  }

  return <VstSafetyClient/>;
}