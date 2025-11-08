// src/components/home/previews.tsx
import Image from 'next/image';
import { tmdbImage } from '@/lib/tmdb';

type Item = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
};

export default function Previews({ items = [] as Item[] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-6 px-3">
      <ul className="flex gap-4 snap-x snap-mandatory">
        {items.slice(0, 10).map((it, idx) => {
          const img = tmdbImage(it.poster_path || it.backdrop_path, 'w300');
          return (
            <li key={`${it.id}-${idx}`} className="snap-start shrink-0">
              {img ? (
                <Image
                  src={img}
                  alt={it.title || it.name || ''}
                  width={84}
                  height={84}
                  className="h-[102px] w-[102px] rounded-full object-cover"
                  draggable={false}
                />
              ) : (
                <div className="h-[102px] w-[102px] rounded-full bg-neutral-800" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
