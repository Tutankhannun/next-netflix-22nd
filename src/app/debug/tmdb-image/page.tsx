// src/app/debug/tmdb-image/page.tsx
import Image from 'next/image';
import { getTrendingNow, tmdbImage } from '@/lib/tmdb';

export const revalidate = 0;

async function headStatus(url: string) {
  try {
    const res = await fetch(url, { method: 'HEAD', cache: 'no-store' });
    return `${res.status} ${res.statusText}`;
  } catch (e: any) {
    return `HEAD error: ${String(e?.message || e)}`;
  }
}

export default async function Page() {
  try {
    const data = await getTrendingNow(); // TMDB 호출
    const first = data.results?.[0];

    const path = first?.backdrop_path || first?.poster_path || null;
    const url = tmdbImage(path, 'w300');

    const status = url ? await headStatus(url) : 'no-url';

    return (
      <main className="p-6 space-y-4 text-white">
        <h1 className="text-lg font-semibold">TMDB Image Smoke Test</h1>

        <section className="space-y-2">
          <h2 className="font-medium">① Next/Image로 렌더</h2>
          {url ? (
            <Image
              src={url}
              alt={first?.title || first?.name || 'TMDB item'}
              width={300}
              height={170}
              className="rounded-md object-cover"
              // 아래 두 줄은 ‘이미지가 안 뜨는 원인이 Next/Image 최적화인지’를 가려내는 임시 스위치
              // placeholder="empty"
              // unoptimized
            />
          ) : (
            <p>이미지를 찾지 못했습니다. (no url)</p>
          )}
        </section>

        <section className="space-y-2">
          <h2 className="font-medium">
            ② HTML &lt;img&gt;로 직접 렌더 (우회 테스트)
          </h2>
          {url ? (
            // Next/Image 설정 문제면 여기서는 보이고, 위에서는 안 보일 수 있어요.
            <img
              src={url}
              alt="raw img"
              width={300}
              height={170}
              style={{ objectFit: 'cover', borderRadius: 8 }}
            />
          ) : (
            <p>이미지를 찾지 못했습니다. (no url)</p>
          )}
        </section>

        <section className="space-y-2">
          <h2 className="font-medium">③ 디버그 정보</h2>
          <pre className="text-xs opacity-80 p-3 bg-white/10 rounded">
            {JSON.stringify(
              {
                hasToken: Boolean(process.env.TMDB_ACCESS_TOKEN),
                itemId: first?.id,
                title: first?.title || first?.name,
                backdrop_path: first?.backdrop_path,
                poster_path: first?.poster_path,
                builtUrl: url,
                headStatus: status, // CDN 응답 상태
              },
              null,
              2,
            )}
          </pre>
          {url && (
            <a href={url} target="_blank" className="text-blue-300 underline">
              이미지 원본 열기
            </a>
          )}
        </section>
      </main>
    );
  } catch (err: any) {
    return (
      <main className="p-6 text-red-400">
        <h1 className="text-lg font-semibold">TMDB 요청 실패</h1>
        <pre className="text-xs mt-2 whitespace-pre-wrap">
          {String(err?.message || err)}
        </pre>
      </main>
    );
  }
}
