// src/lib/tmdb.ts
import 'server-only';

const TMDB_BASE = 'https://api.themoviedb.org/3';

function paramsToQuery(p: Record<string, any> = {}) {
  const q = new URLSearchParams();
  Object.entries(p).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    q.set(k, String(v));
  });
  return q.toString();
}

async function tmdbFetch<T>(
  path: string,
  p: Record<string, any> = {},
  init?: RequestInit,
): Promise<T> {
  const v4 = process.env.TMDB_ACCESS_TOKEN;
  const v3 = process.env.TMDB_API_KEY;

  // If no credentials, return a small demo so the UI can render
  if (!v4 && !v3) {
    const demo = { results: [
      { id: 763215, media_type: 'movie', title: 'Damsel', poster_path: '/AgHbB9DCE9aE57zkHjSmseszh6e.jpg', backdrop_path: '/1jS5ucPZ8f0S0Zs5Y9KJ3aG2Wz3.jpg' },
      { id: 66732, media_type: 'tv', name: 'Stranger Things', poster_path: '/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg', backdrop_path: '/56v2KjBlU4XaOv9rVYEQypROD7P.jpg' },
    ] } as unknown as T;
    return demo;
  }

  const q: Record<string, any> = { ...p };
  if (!v4 && v3) q.api_key = v3; // fallback to v3 key

  const url = `${TMDB_BASE}${path}?${paramsToQuery(q)}`;
  const headers: Record<string, string> = { 'Content-Type': 'application/json;charset=utf-8' };
  if (v4) headers.Authorization = `Bearer ${v4}`;

  const res = await fetch(url, {
    ...init,
    headers,
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`TMDB ${path} ${res.status}`);
  }
  return res.json();
}

export function tmdbImage(
  path?: string | null,
  size: 'w300' | 'original' = 'w300',
) {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export async function getTrendingNow() {
  return tmdbFetch<{ results: any[] }>('/trending/all/day');
}
export async function getPopularOnNetflix(
  media: 'movie' | 'tv' = 'movie',
  page = 1,
) {
  const base = media === 'tv' ? '/discover/tv' : '/discover/movie';
  return tmdbFetch<{ results: any[] }>(base, {
    page,
    sort_by: 'popularity.desc',
    with_watch_providers: '8', // Netflix
    watch_region: 'KR',
    include_adult: false,
  });
}
export async function getTop10InKoreaToday() {
  const all = await tmdbFetch<{ results: any[] }>('/trending/all/day');
  return { results: all.results.slice(0, 10) };
}

export async function getKoreanMovies(page = 1) {
  return tmdbFetch<{ results: any[] }>('/discover/movie', {
    page,
    with_origin_country: 'KR',
    watch_region: 'KR',
    include_adult: false,
    sort_by: 'popularity.desc',
  });
}

export async function getNetflixOriginals(page = 1) {
  return tmdbFetch<{ results: any[] }>('/discover/tv', {
    page,
    with_networks: '213', // Netflix
    watch_region: 'KR',
    include_adult: false,
    sort_by: 'popularity.desc',
  });
}

export async function getNewReleases(page = 1) {
  const today = new Date();
  const past = new Date();
  past.setDate(today.getDate() - 90);
  const gte = past.toISOString().slice(0, 10); // YYYY-MM-DD
  return tmdbFetch<{ results: any[] }>('/discover/movie', {
    page,
    'primary_release_date.gte': gte,
    watch_region: 'KR',
    include_adult: false,
    sort_by: 'primary_release_date.desc',
  });
}