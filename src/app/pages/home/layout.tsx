// src/app/pages/home/layout.tsx
import type { ReactNode } from 'react';
import Header from '@home/header';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* 헤더: 오버레이 */}
      <div className="absolute top-3 left-0 right-0 z-30">
        <Header />
      </div>
      {children}
    </>
  );
}
