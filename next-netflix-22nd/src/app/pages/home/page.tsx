// src/app/pages/home/page.tsx
import Section from '@home/section';
import Hero from '@home/hero';
import CardRow from '@home/cardrow';
import HeroOverlay from '@home/herooverlay';
import Previews from '@home/previews';

import {
  getPopularOnNetflix,
  getTrendingNow,
  getTop10InKoreaToday,
  getKoreanMovies,
  getNetflixOriginals,
  getNewReleases,
} from '@/lib/tmdb';

export default async function Page() {
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

  const heroItem =
    trending[0] ??
    popularNetflix[0] ??
    koreanMovies[0] ??
    netflixOriginals[0] ??
    newReleases[0] ??
    top10[0];

  const heroRank = heroItem
    ? (top10.findIndex((x: any) => x.id === (heroItem as any).id) + 1) || undefined
    : undefined;

  return (
    <>
      <Hero item={heroItem} />
      <HeroOverlay rank={heroRank} />

      <div className="mt-14 px-6 space-y-10">
        <Section title="Previews">
          <Previews items={trending.length ? trending : popularNetflix} />
        </Section>

        <Section title="Continue Watching">
          <CardRow items={trending} />
        </Section>

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