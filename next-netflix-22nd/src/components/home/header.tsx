// src/components/home/header.tsx
export default function Header() {
  const items = [
    { key: 'tv', label: 'TV Shows', href: '#' },
    { key: 'movies', label: 'Movies', href: '#' },
    { key: 'my-list', label: 'My List', href: '#' },
  ];

  return (
    <header className="mx-auto w-[338px] h-[57px]">
      <div className="h-full flex items-center justify-between px-1">
        <img src="/icons/netflix-logo.svg" alt="Netflix" />

        <nav aria-label="primary">
          <ul className="flex items-center gap-7 text-caption-01 leading-none text-white/90">
            {items.map((it) => (
              <li key={it.key} className="shrink-0">
                <a
                  href={it.href}
                  className="hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
                >
                  {it.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
