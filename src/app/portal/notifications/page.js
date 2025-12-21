
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PortalNotificationsClient from './PortalNotificationsClient';

export default async function PortalNotifications() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('user_role')?.value;

  if (userRole !== 'admin') {
    redirect('/login');
  }

  return <PortalNotificationsClient />;
}