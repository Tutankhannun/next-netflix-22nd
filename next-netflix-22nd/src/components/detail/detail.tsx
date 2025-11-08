// src/components/detail/detail.tsx

import Hero from '@components/home/hero';
import HeroOverlay from '@components/home/herooverlay';
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
  const desc =
    item?.overview ||
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque bibendum, sapien at viverra luctus, mi orci gravida elit, eget efficitur arcu lorem non arcu.';

  return (
    <div className="text-white">
      {/* Reuse hero image */}
      <Hero item={item} />

      {/* Reuse overlay for gradient/spacing; place our big Play button above it */}
      <div className="relative -mt-12">
        {/* Keep original overlay in the background for the gradient fade */}
        <div className="relative z-10">
          <HeroOverlay />
        </div>
        {/* Single large Play button positioned similarly, above other controls */}
        <div className="absolute inset-x-0 top-0 z-20 flex justify-center pt-12">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-neutral-200 px-20 py-3 text-black font-semibold text-lg shadow"
            aria-label="Play"
          >
            <PlayIcon />
            <span>Play</span>
          </button>
        </div>
      </div>

      {/* Title and placeholder description */}
      <div className="px-6 pt-6 pb-10">
        <h2 className="text-headline-01 mb-3">{title}</h2>
        <p className="text-sm text-white/80 leading-5">{desc}</p>
      </div>
    </div>
  );
}
