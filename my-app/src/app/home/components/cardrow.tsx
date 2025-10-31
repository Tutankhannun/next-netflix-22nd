// my-app/src/app/home/components/cardrow.tsx
import Link from 'next/link';
import Image from 'next/image';
import { tmdbImage } from '@/lib/tmdb';

type Item = {
  id: number;
  media_type?: 'movie' | 'tv';
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
};

export default function CardRow({
  items,
  numbered = false,
}: {
  items: Item[];
  numbered?: boolean;
}) {
  if (!items || items.length === 0) {
    return <div className="text-sm opacity-70">표시할 항목이 없습니다.</div>;
  }

  return (
    <div
      className="
        overflow-x-auto
        [-ms-overflow-style:none] [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
        -mx-6 px-6
      "
    >
      <ul className="flex gap-3 snap-x snap-mandatory">
        {items.map((it, idx) => {
          const mediaType = it.media_type ?? (it.name ? 'tv' : 'movie');
          const href = mediaType === 'tv' ? `/tv/${it.id}` : `/movie/${it.id}`;
          const img = tmdbImage(it.poster_path || it.backdrop_path, 'w300');

          return (
            <li
              key={`${mediaType}-${it.id}-${idx}`}
              className="snap-start shrink-0 w-[103px]"
            >
              <Link href={href} className="group relative block">
                {img ? (
                  <Image
                    src={img}
                    alt="" // 장식용 이미지: 텍스트 제거
                    width={103}
                    height={161}
                    className="w-[103px] h-[161px] object-cover transition-transform group-hover:scale-[1.03]"
                    draggable={false}
                  />
                ) : (
                  <div className="w-[103px] h-[161px] bg-neutral-800" />
                )}

                {/* 🔻 제목 텍스트 블록 제거됨 */}

                {numbered && (
                  <div
                    className="absolute -left-1 -top-1 w-7 h-7 rounded-full bg-black/70 backdrop-blur text-white
                                  flex items-center justify-center text-[11px] font-bold"
                  >
                    {idx + 1}
                  </div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
