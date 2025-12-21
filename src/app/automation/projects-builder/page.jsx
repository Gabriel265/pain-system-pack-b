// src/app/admin/projects/page.jsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AutomationProjectsBuilder from './AutomationProjectsBuilder';

export default async function AutomationProjects() {
  const cookieStore = await cookies();
  const userRole = cookieStore.get('user_role')?.value;

  if (userRole !== 'admin') {
    redirect('/login');
  }

  return <AutomationProjectsBuilder />;
}