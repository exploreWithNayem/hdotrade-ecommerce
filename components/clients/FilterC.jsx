"use client";

import { useEffect, useState } from "react";
import {
  getCategories,
  getManufacturers,
  getSubcategoriesByCategory,
} from "@/database/queries";

export default function FilterCWrapper() {
  const [manufacturers, setManufacturers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const manufacturersData = await getManufacturers();
      const categoriesData = await getCategories();
      setManufacturers(manufacturersData);
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (selectedCategory) {
        const data = await getSubcategoriesByCategory(selectedCategory);
        setSubcategories(data || []);
      } else {
        setSubcategories([]);
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

  return (
    <div className="w-full max-w-[1279px] mx-auto flex justify-center items-center py-[50px] bg-[#ffffff]">
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 border border-[#00000033] rounded-[15px] lg:rounded-[35px] p-4 bg-white">
        {/* Manufacturer Select */}
        <select
          name="manufacturer"
          className="border border-[#00000033] px-4 lg:px-6 py-2 text-[14px] rounded-[72px] focus:outline-none focus:border-gray-500 w-full lg:flex-1"
        >
          <option value="">SELECT MANUFACTURER</option>
          {manufacturers.map((manufacturer) => (
            <option key={manufacturer?.id} value={manufacturer._id}>
              {manufacturer.name}
            </option>
          ))}
        </select>

        {/* Category Select */}
        <select
          name="category"
          className="border border-[#00000033] px-4 lg:px-6 py-2 text-[14px] rounded-[35px] focus:outline-none focus:border-gray-500 w-full lg:flex-1"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">SELECT CATEGORY</option>
          {categories.map((category) => (
            <option key={category?.id} value={category?.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Subcategory Select */}
        <select
          name="subcategory"
          className="border border-[#00000033] px-4 lg:px-6 py-2 text-[14px] rounded-[35px] focus:outline-none focus:border-gray-500 w-full lg:flex-1"
          disabled={!subcategories.length}
        >
          <option value="">
            {subcategories.length ? "SELECT SUBCATEGORY" : "NO SUBCATEGORY"}
          </option>
          {subcategories.map((sub) => (
            <option key={sub?.id} value={sub?.id}>
              {sub?.name}
            </option>
          ))}
        </select>

        {/* Search Button */}
        <button
          type="button"
          className="bg-transparent border border-red-500 px-4 py-2 text-base lg:text-lg rounded-[35px] hover:bg-red-500 text-red-500 hover:text-white transition-colors w-full lg:w-28"
        >
          Search
        </button>
      </div>
    </div>
  );
}
