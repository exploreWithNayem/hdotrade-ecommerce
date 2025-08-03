import Link from "next/link";
import List from "./List";
import NoCard from "./NoCard";

const CardList =  ({ langCode, products }) => {

  return (
    <div className="flex justify-center items-center h-[600px] bg-[#ffffff]">
      <div className="bg-[#ffffff] p-6">
        {products.length > 0 ? (
          products.map((product, index) => (
            <List product={product} langCode={langCode} key={index} />
          ))
        ) : (
          <div className="col-span-3">
            <div className="grid md:grid-cols-1 grid-cols-2 gap-6">
              <NoCard />
            </div>
          </div>
        )}

        <div className="flex justify-center mt-6">
          {products.length > 0 ? (
            <Link
              href={`/${langCode}/checkout`}
              className="px-8 py-2 bg-green-500 text-white text-md  rounded-full hover:bg-green-600"
            >
              Proceed
            </Link>
          ) : (
            <button
              disabled
              className="px-6 py-3 bg-gray-400 text-white text-lg rounded-full cursor-not-allowed"
            >
              Proceed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardList;
