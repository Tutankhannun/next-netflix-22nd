// src/app/pages/search/page.tsx
import SearchResults from '@components/search/searchresults';
import { getTrendingMovies } from '@/lib/tmdb';

export default async function SearchPage() {
  const data = await getTrendingMovies();
  const movies = data.results || [];

  return (
    <div className="w-[375px] min-h-screen bg-black">
      {/* 상단 여백 */}
      <div className="w-[375px] h-[44px] bg-black" />

      <SearchResults initialMovies={movies} />
    </div>
  );
}
