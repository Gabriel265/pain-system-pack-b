// src/app/admin/projects/page.jsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PortalProjects from './PortalProjects';

export default async function AdminProjects() {
  // AWAIT cookies() — THIS IS THE KEY FOR NEXT.JS 15+
  const cookieStore = await cookies();
  const userRole = cookieStore.get('user_role')?.value;

  if (userRole !== 'admin') {
    redirect('/login');
  }

  return <PortalProjects />;
}