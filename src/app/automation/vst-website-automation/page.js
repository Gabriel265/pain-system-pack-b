import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import VstHomeClient from './VstHomeClient';

export default async function VstHome() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('user_role')?.value;

  if (userRole !== 'admin') {
    redirect('/login');
  }

  return <VstHomeClient/>;
}