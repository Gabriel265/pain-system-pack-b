
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PortalDashboardClient from './PortalDashboardClient';

export default async function PortalDashboard() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('user_role')?.value;

  if (userRole !== 'admin') {
    redirect('/login');
  }

  return <PortalDashboardClient />;
}