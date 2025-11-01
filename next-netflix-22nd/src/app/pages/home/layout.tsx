// src/app/pages/home/layout.tsx

import type { ReactNode } from 'react';
import Menu from '../../../components/home/menu';
import Header from '../../../components/home/header';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh w-full bg-white flex items-start justify-center">
      <div className="relative w-[375px] h-[732px] text-white bg-black">
        {/* 헤더: 오버레이 1회만 */}
        <div className="absolute top-0 left-0 right-0 z-30">
          <Header />
        </div>
        {/* 스크롤 영역: 상단 패딩 0 (맨 윗부분부터 Hero 시작) */}
        <section
          aria-label="메인 화면"
          className="
            absolute inset-0
            overflow-y-auto overscroll-y-contain
            [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            pt-0
            pb-[calc(48px+24px+env(safe-area-inset-bottom))]
          "
        >
          {children}
        </section>
        {/* 하단 메뉴/인디케이터 오버레이 */}
        <div className="absolute left-0 right-0 bottom-[24px] z-20 flex justify-center">
          <Menu />
        </div>
        {/* 홈 인디케이터: 좌우 검정 배경 */}
        <div
          className="absolute left-0 right-0 bottom-0 h-6 z-10 bg-black"
          aria-hidden
        >
          <img
            src="/home-indicator.svg"
            alt=""
            className="h-full w-auto mx-auto select-none pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
