// src/components/search/searchitem.tsx
import Image from 'next/image';
import type { Movie } from '@/lib/tmdb';
import Link from 'next/link';

interface SearchItemProps {
  movie: Movie;
}

export default function SearchItem({ movie }: SearchItemProps) {
  const title = movie.title || movie.name || 'Unknown';
  const imageUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    : '/placeholder.png';

  return (
    <Link href="#">
      <div className="w-[375px] h-[76px] bg-[#424242] flex items-center">
        <div className="relative w-[146px] h-[76px]">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="146px"
          />
        </div>

        <div className="flex-1 px-3">
          <h3 className="text-white text-sm font-medium line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
