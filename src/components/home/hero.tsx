// src/components/home/hero.tsx
import Image from 'next/image';
import { tmdbImage } from '@/lib/tmdb';

type Item = {
  backdrop_path?: string | null;
  poster_path?: string | null;
};

export default function Hero({ item }: { item: Item }) {
  if (!item) return null;

  const src = tmdbImage(item.backdrop_path || item.poster_path, 'original');
  if (!src) return null;

  return (
    // 화면 최상단부터 세로 415px 영역에 "이미지 만" 표시 (좌우 크롭 허용)
    <section className="relative w-full h-[415px]">
      <Image
        src={src}
        alt=""
        fill
        priority
        className="object-cover object-center select-none pointer-events-none"
      />
    </section>
  );
}
