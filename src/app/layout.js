// src/app/layout.js
import { SkinProvider } from '@/context/SkinContext';

export default function AppLayout({ children }) {
  return (
    <SkinProvider>
      <div className="app-layout">
        {children}
      </div>
    </SkinProvider>
  );
}
