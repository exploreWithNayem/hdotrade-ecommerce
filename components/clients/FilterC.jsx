import React from "react";

export default function FilterC() {
  return (
    <div className="w-full max-w-[1279px] mx-auto flex justify-center items-center py-[50px] bg-[#f7f7f7]">
      {/* parent container */}
      <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-4 border border-[#00000033] rounded-[35px] p-4 bg-white">
        {/* Selector 1 */}
        <select
          name="manufacturer"
          className="border border-[#00000033] px-4 lg:px-6 py-2 text-[14px] rounded-[72px] focus:outline-none focus:border-gray-500 w-full lg:flex-1"
        >
          <option value="">SELECT MANUFACTURER</option>
        </select>
        {/* Selector 2 */}
        <select
          name="category"
          className="border border-[#00000033] px-4 lg:px-6 py-2 text-[14px] rounded-[35px] focus:outline-none focus:border-gray-500 w-full lg:flex-1"
        >
          <option value="">SELECT CATEGORY</option>
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

// import React from "react";

// export default function FilterC() {
//   return (
//     <div className=" w-[800px] xl:w-[1279px] mx-auto flex justify-center items-center py-[50px]  bg-[#f7f7f7]">
//       {/* parent container */}
//       <div className="w-[100%] h-[81px] bg-[#ffffff] flex flex-col md:flex-row justify-center gap-4 border border-[#00000033 rounded-[35px] p-4 ">
//         {/* Selector 1 */}
//         <select
//           name="manufacturer"
//           className="border border-[#00000033] px-4 md:px-6 py-1 text-[14px] md:text-[14px] rounded-[72px] focus:outline-none focus:border-gray-500 flex-1"
//         >
//           <option value="">SELECT MANUFACTURER</option>
//         </select>
//         {/* Selector 2 */}
//         <select
//           name="category"
//           className="border border-[#00000033] px-4 md:px-6 py-1 text-[14px] md:text-[14px] rounded-[35px] focus:outline-none focus:border-gray-500 flex-1"
//         >
//           <option value="">SELECT CATEGORY</option>
//         </select>
//         {/* Selector 3 */}
//         <select
//           name="model"
//           className="border border-[#00000033] px-4 md:px-6 py-1 text-[14px] md:text-[14px] rounded-[35px] focus:outline-none focus:border-gray-500 flex-1"
//         >
//           <option value="">SELECT SUBCATEGORY</option>
//         </select>

//         <button
//           type="button"
//           className="bg-transparent border border-red-500 px-4 py-1 text-base md:text-lg rounded-[35px] hover:bg-red-500 text-red-500  hover:text-white transition-colors w-24 md:w-28"
//         >
//           Search
//         </button>
//       </div>
//     </div>
//   );
// }
