// src/components/home/herooverlay.tsx
export default function HeroOverlay({ rank }: { rank?: number }) {
  return (
    <div className="-mt-12 px-6">
      {/* Rank badge */}
      {rank && rank > 0 ? (
        <div className="inline-flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-[11px] font-semibold backdrop-blur">
          <span className="inline-block rounded border border-white/40 px-1 text-[9px] leading-none">TOP 10</span>
          <span>#{rank} in Korea Today</span>
        </div>
      ) : null}

      {/* Actions */}
      <div className="mt-3 flex items-center justify-around">
        {/* My List */}
        <button
          type="button"
          className="flex flex-col items-center text-white/90 hover:text-white"
          aria-label="My List"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="mt-1 text-[11px]">My List</span>
        </button>

        {/* Play */}
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md bg-neutral-200 px-4 py-2 text-black font-semibold"
          aria-label="Play"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7-11-7z" />
          </svg>
          <span>Play</span>
        </button>

        {/* Info */}
        <button
          type="button"
          className="flex flex-col items-center text-white/90 hover:text-white"
          aria-label="Info"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 10v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="7.5" r="1.25" fill="currentColor" />
          </svg>
          <span className="mt-1 text-[11px]">Info</span>
        </button>
      </div>
    </div>
  );
}

