// src/app/pages/home/page.tsx
import Section from '../../../components/home/section';
import CardRow from '../../../components/home/cardrow';
import Hero from '../../../components/home/hero';

// 기존 섹션들 + 새 섹션들 임포트
import {
  getPopularOnNetflix,
  getTrendingNow,
  getTop10InKoreaToday,
  getKoreanMovies,
  getNetflixOriginals,
  getNewReleases,
} from '@/lib/tmdb';

export default async function Page() {
  // My List는 아직 저장소 연동이 없으니 비워둠(섹션은 보이되, 내용 없으면 표시문구가 나옴)
  const myList: any[] = [];

  const [pPopular, pTrending, pTop10, pKrMovies, pOriginals, pNew] =
    await Promise.allSettled([
      getPopularOnNetflix('movie'),
      getTrendingNow(),
      getTop10InKoreaToday(),
      getKoreanMovies(),
      getNetflixOriginals(),
      getNewReleases(),
    ]);

  const popularNetflix =
    pPopular.status === 'fulfilled' ? (pPopular.value.results ?? []) : [];
  const trending =
    pTrending.status === 'fulfilled' ? (pTrending.value.results ?? []) : [];
  const top10 =
    pTop10.status === 'fulfilled' ? (pTop10.value.results ?? []) : [];
  const koreanMovies =
    pKrMovies.status === 'fulfilled' ? (pKrMovies.value.results ?? []) : [];
  const netflixOriginals =
    pOriginals.status === 'fulfilled' ? (pOriginals.value.results ?? []) : [];
  const newReleases =
    pNew.status === 'fulfilled' ? (pNew.value.results ?? []) : [];

  // Hero 후보: 트렌딩에서 하나, 없으면 다른 섹션에서
  const heroItem =
    trending[0] ??
    popularNetflix[0] ??
    koreanMovies[0] ??
    netflixOriginals[0] ??
    newReleases[0] ??
    top10[0];

  return (
    <>
      {/* Hero는 이미지만 (상단부터 415px) */}
      <Hero item={heroItem} />

      {/* 헤더에 가리지 않도록 Hero 이후부터만 여백 */}
      <div className="mt-14 px-6 space-y-10">
        {/* 기존 섹션 */}
        <Section title="Popular on Netflix">
          <CardRow items={popularNetflix} />
        </Section>

        <Section title="Trending Now">
          <CardRow items={trending} />
        </Section>

        <Section title="Top 10 in Korea Today">
          <CardRow items={top10} numbered />
        </Section>

        <Section title="Korean Movies">
          <CardRow items={koreanMovies} />
        </Section>

        <Section title="Netflix Originals">
          <CardRow items={netflixOriginals} />
        </Section>

        <Section title="New Releases">
          <CardRow items={newReleases} />
        </Section>
      </div>
    </>
  );
}
