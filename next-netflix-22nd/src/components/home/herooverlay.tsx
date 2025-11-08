// src/components/home/herooverlay.tsx
import MyListIcon from '@/public/icons/MyList';
import PlayIcon from '@/public/icons/PlayIcon';
import InfoIcon from '@/public/icons/InfoIcon';

export default function HeroOverlay({ rank }: { rank?: number }) {
  return (
    <div className="-mt-12 px-6 relative">
      {/* Bottom fade overlay into black */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-gradient-to-b from-transparent via-black/40 to-black"
        aria-hidden
      />
      {/* Rank badge */}
      {rank && rank > 0 ? (
        <div className="relative z-10 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold">
            <span className="inline-block border border-white px-1 leading-none">
              <p className="text-[6px]">TOP</p>
              <p className="text-[10px]">10</p>
            </span>
            <span>#{rank} in Korea Today</span>
          </div>
        </div>
      ) : null}
      {/* Actions */}
      <div className="relative z-10 mt-3 flex items-center justify-around ">
        {/* My List */}
        <button
          type="button"
          className="flex flex-col items-center text-white/90 hover:text-white z-10"
          aria-label="My List"
        >
          <MyListIcon />
          <span className="mt-1 text-[11px]">My List</span>
        </button>

        {/* Play */}
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-neutral-200 px-4 py-2 text-black font-semibold z-10"
          aria-label="Play"
        >
          <PlayIcon />
          <span>Play</span>
        </button>

        {/* Info */}
        <button
          type="button"
          className="flex flex-col items-center text-white/90 hover:text-white z-10"
          aria-label="Info"
        >
          <InfoIcon />
          <span className="mt-1 text-[11px]">Info</span>
        </button>
      </div>
    </div>
  );
}
