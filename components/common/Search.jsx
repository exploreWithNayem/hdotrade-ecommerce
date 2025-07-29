"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Search({ searchLan, langCode }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const doSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("search", searchValue);
    replace(`/${langCode}/shop?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-xl flex relative">
      {/* "All" part */}
      <div className="flex items-center px-4 bg-gray-100 border border-gray-500 border-r-0 rounded-l-[20px]">
        <span className="text-[#1a1d21] text-base">All</span>
      </div>

      {/* Search input */}
      <input
        type="text"
        name="search"
        id="search"
        value={searchValue}
        onChange={handleSearch}
        // placeholder={searchLan}
        placeholder="Search a product ..."
        className="flex-1 border border-gray-500 rounded-r-[20px] px-4 py-2 pr-12 focus:outline-none focus:border-gray-500 focus:ring-0"
      />

      {/* Search icon button */}
      <button
        onClick={doSearch}
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
}
