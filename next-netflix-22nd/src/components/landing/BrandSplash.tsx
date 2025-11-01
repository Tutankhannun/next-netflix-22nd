'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function BrandSplash() {
  const playerRef = useRef<any>(null);
  const router = useRouter();
  const navigatedRef = useRef(false);

  const goHome = useCallback(() => {
    if (navigatedRef.current) return;
    navigatedRef.current = true;
    router.push('/pages/home');
  }, [router]);

  // Load lottie-player web component once (no-op if already defined)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!customElements.get('lottie-player')) {
      const s = document.createElement('script');
      s.src =
        'https://unpkg.com/@lottiefiles/lottie-player@2.0.3/dist/lottie-player.js';
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

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

  // Navigate on animation complete
  useEffect(() => {
    const el = playerRef.current as any | null;
    if (!el || typeof el.addEventListener !== 'function') return;
    const onComplete = () => goHome();
    el.addEventListener('complete', onComplete, { once: true });
    return () => el.removeEventListener('complete', onComplete);
  }, [goHome]);

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
      <lottie-player
        ref={playerRef}
        autoplay
        mode="normal"
        speed="1"
        style={{ width: '400px', height: '400px' }}
        src={lottieUrl}
      ></lottie-player>
    </section>
  );
}
