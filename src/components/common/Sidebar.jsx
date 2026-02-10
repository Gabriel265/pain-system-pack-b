// src/components/common/Sidebar.jsx
import Link from 'next/link';

export default function Sidebar({ type }) {
  return (
    <nav className='bg-gray-800 text-white w-64 min-h-screen'>
      <ul>
        <li><Link href='/admin'>Admin</Link></li>
        <li><Link href='/ai-lab'>AI Lab</Link></li>
        <li><Link href='/biab'>BIAB</Link></li>
      </ul>
    </nav>
  );
}