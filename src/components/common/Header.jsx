// src/components/common/Header.jsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className='bg-gray-900 text-white p-4 flex justify-between'>
      <div className='text-lg'>Website Name</div>
      <nav>
        <ul className='flex space-x-4'>
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/biab'>BIAB</Link></li>
        </ul>
      </nav>
    </header>
  );
}