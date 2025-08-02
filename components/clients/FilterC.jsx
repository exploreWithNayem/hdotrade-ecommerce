import { getCategories, getManufacturers } from "@/database/queries";

export default async function FilterC() {
  const manufacturers = await getManufacturers();
  const categories = await getCategories();

  console.log("categories.....", manufacturers);

  return (
    <div className="w-full max-w-[1279px] mx-auto flex justify-center items-center py-[50px] bg-[#ffffff]">
      {/* parent container */}
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 border border-[#00000033] rounded-[15px] lg:rounded-[35px] p-4 bg-white">
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

        <select
          name="category"
          className="border border-[#00000033] px-4 lg:px-6 py-2 text-[14px] rounded-[35px] focus:outline-none focus:border-gray-500 w-full lg:flex-1"
        >
          <option value="">SELECT CATEGORY</option>
          {categories.map((category) => (
            <option key={category?.id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Selector 3 */}
        <select
          name="model"
          className="border border-[#00000033] px-4 lg:px-6 py-2 text-[14px] rounded-[35px] focus:outline-none focus:border-gray-500 w-full lg:flex-1"
        >
          <option value="">SELECT SUBCATEGORY</option>
        </select>

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
