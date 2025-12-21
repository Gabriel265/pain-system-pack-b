
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PortalBuilderClient from './PortalBuilderClient';

export default async function PortalBuilder() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('user_role')?.value;

  if (userRole !== 'admin') {
    redirect('/login');
  }

  return <PortalBuilderClient />;
}