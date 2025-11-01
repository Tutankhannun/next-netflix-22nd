// src/components/landing/BrandSplash.tsx
'use client';

import { useEffect, useState } from 'react';

export default function BrandSplash() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50); // 살짝 지연 후 애니 시작
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="absolute inset-0 grid place-items-center bg-[white]">
      <div className="relative flex items-center justify-center">
        {/* N 로고 컨테이너 */}
        <div
          className={`n-logo ${ready ? 'n-start' : ''}`}
          aria-label="Netflix"
        >
          <span className="n-col left" />
          <span className="n-ribbon" />
          <span className="n-col right" />
          <span className="n-glow" />
        </div>
      </div>

      {/* 하단 작은 카피 */}
      <p className="absolute bottom-6 w-full text-center text-xs/5 text-neutral-400 tracking-wide">
        Press any key to continue
      </p>
    </section>
  );
}
