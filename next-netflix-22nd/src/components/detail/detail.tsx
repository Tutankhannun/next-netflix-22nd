// src/components/detail/detail.tsx

import Hero from '@components/home/hero';
import PlayIcon from '@/public/icons/PlayIcon';

type DetailItem = {
  backdrop_path?: string | null;
  poster_path?: string | null;
  title?: string | null;
  name?: string | null;
  overview?: string | null;
};

export default function Detail({ item }: { item: DetailItem }) {
  const title = item?.title || item?.name || 'Previews';
  const desc = item?.overview || '';

  return (
    <div className="text-white">
      {/* Reuse hero image */}
      <Hero item={item} />
      <div className="-mt-12 px-6 relative">
        <div
          className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-gradient-to-b from-transparent via-black/40 to-black"
          aria-hidden
        />
      </div>
      {/* Reuse overlay for gradient/spacing; place our big Play button above it */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-white/70 px-30 py-2 text-black font-semibold text-lg shadow"
          aria-label="Play"
        >
          <PlayIcon />
          <span>Play</span>
        </button>
      </div>

      {/* Title and placeholder description */}
      <div className="relative px-6 pt-12 pb-10 z-100">
        <h2 className="text-headline-01 mb-3 ">{title}</h2>
        <p className="text-sm text-white/80 leading-5">{desc}</p>
      </div>
    </div>
  );
}
