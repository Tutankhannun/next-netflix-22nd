'use client';

import React, { useEffect, useState, useRef } from 'react';
import type { Movie } from '@/lib/tmdb';
import SearchItem from '@components/search/searchitem';

const ScrollMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [pageParams, setPageParams] = useState<number[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<boolean>(false);
  const hasNextRef = useRef<boolean>(false);
  const seenIdsRef = useRef<Set<number>>(new Set());

  const fetchTopRatedMovies = async (pageNum: number) => {
    if (pageParams.includes(pageNum)) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/tmdb/top-rated?page=${pageNum}`);
      const data = await response.json();
      const incoming: Movie[] = data?.results || [];
      const unique = incoming.filter((m) => {
        if (!m || typeof m.id !== 'number') return false;
        return !seenIdsRef.current.has(m.id);
      });
      unique.forEach((m) => seenIdsRef.current.add(m.id));
      setMovies((prev) => [...prev, ...unique]);
      setPageParams((prev) => [...prev, pageNum]);
      setHasNextPage(data.page < data.total_pages);
      console.log('data', data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  // keep latest flags in refs for observer callback
  useEffect(() => {
    loadingRef.current = loading;
    hasNextRef.current = hasNextPage;
  }, [loading, hasNextPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (
          firstEntry.isIntersecting &&
          hasNextRef.current &&
          !loadingRef.current
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { rootMargin: '200px' },
    );

    const el = observerRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  useEffect(() => {
    fetchTopRatedMovies(page);
  }, [page]);

  return (
    <>
      <div className="flex flex-col gap-[3px]">
        {movies.map((movie) => (
          <SearchItem key={movie.id} movie={movie as Movie} />
        ))}
      </div>

      <div ref={observerRef} className="h-8" />
      {loading && <div className="text-white text-center py-2">Loading...</div>}
    </>
  );
};

export default ScrollMovies;
