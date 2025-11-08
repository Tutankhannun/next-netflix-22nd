// src/components/home/menu.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import HomeIcon from '@/public/icons/HomeIcon';
import SearchIcon from '@/public/icons/SearchIcon';
import ComingSoonIcon from '@/public/icons/ComingSoonIcon';
import DownloadIcon from '@/public/icons/DownloadIcon';
import MoreIcon from '@/public/icons/MoreIcon';

export default function Menu() {
  const [activeMenu, setActiveMenu] = useState<string>('home');
  const router = useRouter();

  const items = [
    {
      key: 'home',
      label: 'Home',
      Icon: HomeIcon,
      clickable: true,
      path: '/home',
    },
    {
      key: 'search',
      label: 'Search',
      Icon: SearchIcon,
      clickable: true,
      path: '/search',
    },
    {
      key: 'coming-soon',
      label: 'Coming Soon',
      Icon: ComingSoonIcon,
      clickable: false,
    },
    {
      key: 'download',
      label: 'Download',
      Icon: DownloadIcon,
      clickable: false,
    },
    { key: 'more', label: 'More', Icon: MoreIcon, clickable: false },
  ];

  const handleClick = (key: string, clickable: boolean, path?: string) => {
    if (clickable && path) {
      setActiveMenu(key);
      router.push(path);
    }
  };

  return (
    <nav
      aria-label="home-menu"
      className="w-[375px] h-12 max-w-[100vh] bg-[#121212] border-t border-white/10 "
    >
      <ul className="h-full flex items-center justify-between px-3 text-white">
        {items.map(({ key, label, Icon, clickable, path }) => (
          <li
            key={key}
            onClick={() => handleClick(key, clickable, path)}
            className={`flex-1 min-w-0 flex flex-col items-center ${
              activeMenu === key ? 'text-white' : 'text-menu-gray'
            } hover:text-white ${clickable ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Icon className="w-6 h-6 block" aria-hidden />
            <span className="mt-0.5 text-[10px] leading-[12px] whitespace-nowrap">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
