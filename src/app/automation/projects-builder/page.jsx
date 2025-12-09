// src/app/admin/projects/page.jsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProjectsBuilder from './ProjectsBuilder';

export default async function AdminProjects() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('user_role')?.value;

  if (userRole !== 'admin') {
    redirect('/login');
  }

  return <ProjectsBuilder />;
}