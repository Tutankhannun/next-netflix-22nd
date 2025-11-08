// app/(frame)/detail/[media]/[id]/page.tsx
import Detail from '@components/detail/detail';

type Params = {
  params: Promise<{ media: 'movie' | 'tv'; id: string }>;
};

async function fetchTmdbDetail(media: 'movie' | 'tv', id: string) {
  const token =
    process.env.TMDB_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN ||
    '';
  const url = `https://api.themoviedb.org/3/${media}/${id}?language=eng-US`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`TMDB detail ${media}/${id} ${res.status}`);
  }
  return res.json();
}

export default async function Page({ params }: Params) {
  const { media: mediaParam, id } = await params;
  const media = mediaParam === 'tv' ? 'tv' : 'movie';
  try {
    const item = await fetchTmdbDetail(media, id);
    return (
      <main>
        <Detail item={item} />
      </main>
    );
  } catch (err) {
    return (
      <main className="text-white p-6">
        <h1 className="text-xl font-semibold">
          상세 정보를 불러올 수 없습니다.
        </h1>
        <p className="mt-2 text-white/80 text-sm">
          잠시 후 다시 시도해 주세요.
        </p>
      </main>
    );
  }
}
