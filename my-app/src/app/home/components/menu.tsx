// my-app/src/app/home/components/menu.tsx
export default function Menu() {
  const items = [
    { key: 'home', label: 'Home', src: '/icon/home.svg' },
    { key: 'search', label: 'Search', src: '/icon/search.svg' },
    { key: 'coming-soon', label: 'Coming Soon', src: '/icon/coming-soon.svg' },
    { key: 'download', label: 'Download', src: '/icon/download.svg' },
    { key: 'more', label: 'More', src: '/icon/more.svg' },
  ];

  return (
    // 절대 위치(absolute) 아님! 레이아웃에서 자연스럽게 아래로 이어지도록 고정 높이 48px
    <nav aria-label="home-menu" className="w-[375px] h-[48px] bg-[#121212]">
      <ul className="h-full flex items-center justify-between px-3">
        {items.map((it) => (
          <li
            key={it.key}
            className="w-[60px] flex flex-col items-center text-center"
          >
            <img
              src={it.src}
              alt={it.label}
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <span className="text-caption-02 -mt-0.5">{it.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
