// src/app/biab/layout.js
import Sidebar from '@/components/common/Sidebar';

export default function BIABLayout({ children }) {
  return (
    <div className='flex flex-col min-h-screen bg-white'>
      <div className='flex flex-1'>
        <Sidebar type='biab' />
        <main className='flex-1 p-4 sm:p-6 lg:p-10'>{children}</main>
      </div>
    </div>
  );
}