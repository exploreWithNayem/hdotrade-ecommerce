
export default function SearchC() {
  return (
    <section className="search my-6">
      <form
        className="container flex lg:justify-between items-center lg:flex-nowrap flex-wrap gap-5"
        action="/product-search"
      >
        <div className="search_select relative">
          <select
            className="block w-full h-full appearance-none px-4 py-2 border font-medium focus:outline-none"
            id="manufacturer"
            name="parent_category"
            placeholder="Select Manufacturer"
            defaultValue=""
          >
            <option value="" disabled>
              Select Manufacturer
            </option>
            {/* Example options */}
            <option value="samsung">Samsung</option>
            <option value="apple">Apple</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 
               10.586l3.293-3.293a1 1 0 111.414 
               1.414l-4 4a1 1 0 01-1.414 
               0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
          </div>
        </div>

        <div className="search_select relative">
          <select
            className="block w-full h-full appearance-none px-4 py-2 border font-medium focus:outline-none"
            id="product"
            name="subcategory"
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            {/* Example options */}
            <option value="phones">Phones</option>
            <option value="tablets">Tablets</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 
               10.586l3.293-3.293a1 1 0 111.414 
               1.414l-4 4a1 1 0 01-1.414 
               0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
          </div>
        </div>

        <div className="search_select relative">
          <select
            className="block w-full h-full appearance-none px-4 py-2 border font-medium focus:outline-none"
            id="model"
            name="subsubcategory"
            defaultValue=""
          >
            <option value="" disabled>
              Select subcategory
            </option>
            {/* Example options */}
            <option value="pro">Pro</option>
            <option value="air">Air</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 
               10.586l3.293-3.293a1 1 0 111.414 
               1.414l-4 4a1 1 0 01-1.414 
               0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          className="btn items-center justify-center h-full w-full"
          id="filter_search_btn"
        >
          Search
        </button>
      </form>
    </section>
  );
}
