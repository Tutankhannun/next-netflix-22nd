// src/components/home/menu.tsx
export default function Menu() {
  const items = [
    { key: 'home', label: 'Home', src: '/icon/home.svg' },
    { key: 'search', label: 'Search', src: '/icon/search.svg' },
    { key: 'coming-soon', label: 'Coming Soon', src: '/icon/coming-soon.svg' },
    { key: 'download', label: 'Download', src: '/icon/download.svg' },
    { key: 'more', label: 'More', src: '/icon/more.svg' },
  ];

  return (
    <nav
      aria-label="home-menu"
      className="w-[375px] h-12 bg-[#121212] border-t border-white/10 text-white"
    >
      <ul className="h-full flex items-center justify-between px-3">
        {items.map((it) => (
          <li key={it.key} className="w-[60px] flex flex-col items-center">
            <img
              src={it.src}
              alt={it.label}
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="mt-0.5 text-[10px] leading-[12px] opacity-80">
              {it.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
