// src/components/search/searchresults.tsx
'use client';

import { useState } from 'react';
import SearchBox from '@components/search/searchbox';
import SearchItem from '@components/search/searchitem';
import type { Movie } from '@/lib/tmdb';
import ScrollMovies from '@components/scroll/scroll';

interface SearchResultsProps {
  initialMovies: Movie[];
}

export default function SearchResults({ initialMovies }: SearchResultsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMovies = initialMovies.filter((movie) => {
    const title = (movie.title || movie.name || '').toLowerCase();
    return title.includes(searchQuery.toLowerCase());
  });

  return (
    <>
      {/* 검색박스 */}
      <SearchBox onSearchChange={setSearchQuery} />

      {/* Top Searches 타이틀 */}
      <div className="pt-[21px] pl-[10px] pb-[21px]">
        <h2
          className="text-white text-headline-01"
          style={{ textAlign: 'left' }}
        >
          Top Searches
        </h2>
      </div>

      {/* 검색 결과 */}
      <div className="flex flex-col gap-[3px]">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <SearchItem key={movie.id} movie={movie} />
          ))
        ) : (
          <div className="text-white text-center py-10">No results found</div>
        )}
      </div>
      <ScrollMovies />
    </>
  );
}
