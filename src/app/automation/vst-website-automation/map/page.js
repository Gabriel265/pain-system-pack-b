import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import VstMapClient from './VstMapClient';

export default async function VstMap() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('user_role')?.value;

  if (userRole !== 'admin') {
    redirect('/login');
  }

  return <VstMapClient />;
}