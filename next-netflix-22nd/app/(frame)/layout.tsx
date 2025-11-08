import Menu from '@home/menu';

export default function FrameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-dvh bg-[gray] flex items-start justify-center">
      <div className="relative w-[375px] h-dvh max-w-[100vh] text-white bg-black">
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

        <div className="absolute left-0 right-0 bottom-[24px] z-20 flex justify-center">
          <Menu />
        </div>

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
