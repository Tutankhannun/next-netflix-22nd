// src/components/home/menu.tsx
import HomeIcon from '@/public/icons/HomeIcon';
import SearchIcon from '@/public/icons/SearchIcon';
import ComingSoonIcon from '@/public/icons/ComingSoonIcon';
import DownloadIcon from '@/public/icons/DownloadIcon';
import MoreIcon from '@/public/icons/MoreIcon';

export default function Menu() {
  const items = [
    { key: 'home', label: 'Home', Icon: HomeIcon },
    { key: 'search', label: 'Search', Icon: SearchIcon },
    { key: 'coming-soon', label: 'Coming Soon', Icon: ComingSoonIcon },
    { key: 'download', label: 'Download', Icon: DownloadIcon },
    { key: 'more', label: 'More', Icon: MoreIcon },
  ];

  return (
    <nav
      aria-label="home-menu"
      className="w-[375px] h-12 bg-[#121212] border-t border-white/10 "
    >
      <ul className="h-full flex items-center justify-between px-3 text-white">
        {items.map(({ key, label, Icon }) => (
          <li
            key={key}
            className="flex-1 min-w-0 flex flex-col items-center text-menu-gray hover:text-white"
          >
            <Icon className="w-6 h-6 block" aria-hidden />
            <span className="mt-0.5 text-[10px] leading-[12px] whitespace-nowrap">{label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
