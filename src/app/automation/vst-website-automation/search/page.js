import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import VstSearchClient from './VstSearchClient';

export default async function VstSearch() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('user_role')?.value;

  if (userRole !== 'admin') {
    redirect('/login');
  }

  return <VstSearchClient/>;
}