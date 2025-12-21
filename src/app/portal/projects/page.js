// src/app/admin/projects/page.jsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import PortalProjectsClient from './PortalProjectsClient';

export default async function PortalProjects() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('user_role')?.value;

  if (userRole !== 'admin') {
    redirect('/login');
  }

  return <PortalProjectsClient />;
}