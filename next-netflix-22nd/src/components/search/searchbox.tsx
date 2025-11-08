// src/components/search/searchbox.tsx
'use client';

import { useState } from 'react';
import SearchIcon from '@/public/icons/SearchIcon';
import DeleteIcon from '@/public/icons/DeleteIcon';
import Image from 'next/image';

interface SearchBoxProps {
  onSearchChange: (value: string) => void;
}

export default function SearchBox({ onSearchChange }: SearchBoxProps) {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    onSearchChange(value);
  };

  const handleClear = () => {
    setSearchText('');
    onSearchChange('');
  };

  return (
    <div className="w-[375px] h-[52px] bg-search-bg relative">
      {/* 왼쪽 검색 아이콘 */}
      <div className="absolute top-[15px] left-3 pointer-events-none z-10">
        <SearchIcon className="w-5 h-5" />
      </div>

      {/* 검색 입력창 */}
      <input
        type="text"
        value={searchText}
        onChange={handleChange}
        placeholder="Search for a show, movie, genre, e.t.c."
        className="absolute top-[10.5px] left-[45px] w-[270px] h-[31px] 
                   bg-transparent text-play-gray text-search-placeholder 
                   placeholder:text-play-gray placeholder:text-center
                   text-left
                   border-none outline-none
                   cursor-text"
      />

      {/* 오른쪽 vector 아이콘 (삭제 버튼) */}
      <button
        onClick={handleClear}
        className="absolute top-[19px] left-[339px] cursor-pointer"
        aria-label="Clear search"
      >
        <DeleteIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
