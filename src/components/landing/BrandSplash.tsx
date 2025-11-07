'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Lottie from 'react-lottie-player';

export default function BrandSplash() {
  const playerRef = useRef<any>(null);
  const router = useRouter();
  const navigatedRef = useRef(false);

  const goHome = useCallback(() => {
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    router.push('/pages/home');
  }, [router]);

  // Using react-lottie-player – no web component script needed

  // Any key or pointer input triggers navigation (once)
  useEffect(() => {
    const onKey = () => goHome();
    const onPointer = () => goHome();
    window.addEventListener('keydown', onKey, { once: true });
    window.addEventListener('pointerdown', onPointer, { once: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  }, [goHome]);

  const lottieUrl =
    process.env.NEXT_PUBLIC_SPLASH_LOTTIE_URL ?? '/lottie/Landing.json';

  // react-lottie-player provides onComplete prop; no manual listener

  // Compute fallback timeout from Lottie meta (ip/op/fr) when local JSON is used
  useEffect(() => {
    let timeoutId: any;
    const compute = async () => {
      try {
        if (typeof window === 'undefined') return;
        if (!lottieUrl.startsWith('/')) return; // only compute for local JSON
        const res = await fetch(lottieUrl, { cache: 'no-store' });
        const data = await res.json();
        const fr = Number(data?.fr ?? 30);
        const ip = Number(data?.ip ?? 0);
        const op = Number(data?.op ?? 90);
        const durationMs = Math.max(0, ((op - ip) / (fr || 30)) * 1000);
        timeoutId = setTimeout(
          goHome,
          Math.min(8000, Math.max(1200, durationMs)),
        );
      } catch {
        timeoutId = setTimeout(goHome, 3000);
      }
    };
    compute();
    return () => clearTimeout(timeoutId);
  }, [lottieUrl, goHome]);

  return (
    <section
      className="fixed inset-0 grid place-items-center bg-black"
      aria-label="Netflix splash"
    >
      <Lottie
        ref={playerRef}
        play
        speed={1}
        loop={false}
        style={{ width: '400px', height: '400px' }}
        path={lottieUrl}
        onComplete={goHome}
      />
    </section>
  );
}
