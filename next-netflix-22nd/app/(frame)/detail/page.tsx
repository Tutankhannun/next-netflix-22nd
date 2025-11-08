// app/(frame)/detail/page.tsx
// Connects to Detail component via query params: /detail?media=movie|tv&id=123
import Detail from '@components/detail/detail';

type Search = { media?: 'movie' | 'tv' | string; id?: string };

async function fetchTmdbDetail(media: 'movie' | 'tv', id: string) {
  const token =
    process.env.TMDB_ACCESS_TOKEN || process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN || '';
  const url = `https://api.themoviedb.org/3/${media}/${id}?language=ko-KR`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`TMDB detail ${media}/${id} ${res.status}`);
  }
  return res.json();
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Search;
}) {
  const mediaParam = searchParams?.media === 'tv' ? 'tv' : 'movie';
  const id = searchParams?.id;

  if (id) {
    try {
      const item = await fetchTmdbDetail(mediaParam, id);
      return (
        <main>
          <Detail item={item} />
        </main>
      );
    } catch (err) {
      console.error('Failed to load detail:', err);
      // Fallback render to prove page-component wiring even if TMDB fails
      return (
        <main className="text-white">
          <Detail
            item={{
              title: 'Unavailable',
              overview: 'Failed to load data from TMDB. Please check API token.',
            }}
          />
        </main>
      );
    }
  }

  return (
    <main className="text-white p-6">
      <h1 className="text-xl font-semibold">상세 페이지</h1>
      <p className="mt-2 text-white/80 text-sm">유효한 쿼리로 접근하세요. 예: /detail?media=movie&id=278</p>
    </main>
  );
}
