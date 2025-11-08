// src/lib/tmdb.ts
import 'server-only';

const TMDB_BASE = 'https://api.themoviedb.org/3';

// Movie 타입 추가
export interface Movie {
  id: number;
  title?: string;
  name?: string;
  backdrop_path: string | null;
  poster_path: string | null;
  overview: string;
}

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
  const token =
    process.env.TMDB_ACCESS_TOKEN || process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN || '';
  const url = `${TMDB_BASE}${path}?${paramsToQuery(p)}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    // Next.js App Router의 캐시/리밸리데이트 정책은 필요시 조절
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

/*  Korean Movies */

export async function getKoreanMovies(page = 1) {
  return tmdbFetch<{ results: any[] }>('/discover/movie', {
    page,
    with_origin_country: 'KR', // 한국 제작
    watch_region: 'KR',
    include_adult: false,
    sort_by: 'popularity.desc',
  });
}

/* Netflix Originals (TV 기준: network 213) */
export async function getNetflixOriginals(page = 1) {
  return tmdbFetch<{ results: any[] }>('/discover/tv', {
    page,
    with_networks: '213', // Netflix
    watch_region: 'KR',
    include_adult: false,
    sort_by: 'popularity.desc',
  });
}

/*New Releases (최근 90일 영화) */
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

/* Top Searches (트렌딩 주간) */
export async function getTrendingMovies() {
  return tmdbFetch<{ results: Movie[] }>('/trending/all/week', {
    language: 'eng-ENG',
  });
}
