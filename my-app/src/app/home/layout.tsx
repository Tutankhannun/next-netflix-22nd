// my-app/src/app/home/layout.tsx
import type { ReactNode } from 'react';
import Menu from './components/menu';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-white flex items-start justify-center">
      <div className="w-[375px] text-white">
        {/* 1) 메인 화면: 732px */}
        <section
          className="w-[375px] h-[732px] bg-black overflow-hidden"
          aria-label="메인 화면"
        >
          {children}
        </section>

        {/* 2) 메뉴: 48px */}
        <Menu />

        {/* 3) 하단바: SVG 원본 그대로 출력 */}
        <div className="w-[375px]" aria-hidden>
          <img src="/home-indicator.svg" alt="" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
