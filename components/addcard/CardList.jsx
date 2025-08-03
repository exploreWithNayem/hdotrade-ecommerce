import Link from "next/link";
import List from "./List";
import NoCard from "./NoCard";

const CardList = ({ langCode, products }) => {
  // Calculate subtotal
  const subtotal = products
    .reduce((total, p) => total + p.price * p.quantity, 0)
    .toFixed(2);

  return (
    <div className="flex justify-center items-center  py-10 px-4">
      <div className="bg-white rounded-2xl shadow-md max-w-xl w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          {products.length > 0 && (
            <button className="text-xs text-red-500 hover:underline">
              Remove all
            </button>
          )}
        </div>

        {/* Product list */}
        <div className="space-y-4">
          {products.length > 0 ? (
            products.map((product, index) => (
              <List product={product} langCode={langCode} key={index} />
            ))
          ) : (
            <div className="flex justify-center">
              <div className="grid md:grid-cols-1 grid-cols-2 gap-6">
                <NoCard />
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <hr className="my-4" />

        {/* Subtotal */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs text-gray-500">Sub-Total</p>
            <p className="text-xs text-gray-500">{products.length} items</p>
          </div>
          <p className="text-xl font-semibold">${subtotal}</p>
        </div>

        {/* Checkout button */}
        <div className="flex justify-center mt-2">
          {products.length > 0 ? (
            <Link
              href={`/${langCode}/checkout`}
              className="w-full py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold text-sm text-center hover:from-blue-500 hover:to-blue-700 transition duration-300"
            >
              Checkout
            </Link>
          ) : (
            <button
              disabled
              className="w-full py-2 rounded-full bg-gray-400 text-white font-semibold text-sm cursor-not-allowed"
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardList;
