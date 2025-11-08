// src/app/pages/search/page.tsx
import SearchResults from '@components/search/searchresults';
import { getTrendingMovies } from '@/lib/tmdb';

export default async function SearchPage() {
  let movies: any[] = [];
  try {
    const data = await getTrendingMovies();
    movies = data.results || [];
  } catch (err) {
    console.error('Failed to load trending movies:', err);
    movies = [];
  }

  return (
    <div className="w-[375px] min-h-screen bg-black">
      {/* 상단 여백 */}
      <div className="w-[375px] h-[44px] bg-black" />

      <SearchResults initialMovies={movies} />
    </div>
  );
}
