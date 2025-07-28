"use client";

import ReactPaginate from "react-paginate";
import ProductCard from "../shop/ProductCard";
import { useState } from "react";


const itemsPerPage = 9; // change to what fits your grid

export default function ClientPaginatedProducts({ products, langCode }) {
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Get current items
  const offset = currentPage * itemsPerPage;
  const currentItems = products.slice(offset, offset + itemsPerPage);

  return (
    <div className="col-span-3">
      <div className="grid md:grid-cols-3 grid-cols-2 gap-6 mb-6">
        {currentItems.map((product) => (
          <ProductCard
            // lan={lan?.addCard}
            langCode={langCode}
            key={product?.id}
            product={product}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <ReactPaginate
          previousLabel="‹"
          nextLabel="›"
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName="flex items-center space-x-2"
          pageClassName="border border-gray-300 rounded w-10 h-10 flex items-center justify-center text-gray-500"
          activeClassName="bg-red-600 text-white border-red-600"
          previousClassName="border border-gray-300 rounded w-10 h-10 flex items-center justify-center text-gray-500"
          nextClassName="border border-gray-300 rounded w-10 h-10 flex items-center justify-center text-gray-500"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
    </div>
  );
}
