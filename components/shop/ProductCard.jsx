import Image from "next/image";
import Link from "next/link";
import AddCard from "./AddCard";
import { InStock } from "@/public/icons/icons";

export default function ProductCard({ product, langCode, lan }) {
  return (
    <div className="bg-white p-3 rounded-2xl border border-red-500 relative">
      {/* Badge */}
      <div className="absolute top-7 left-3 flex items-center text-green-600 font-semibold">
        {product?.quantity > 0 && <InStock />}
      </div>

      <div className="overflow-hidden rounded-xl">
        <Image
          src={product?.image[0]}
          alt={product?.name}
          className="w-full transition-transform duration-300 hover:scale-105"
          width={200}
          height={200}
        />
      </div>

      <p className="font-medium text-2xl mb-2">
        <Link href={`/${langCode}/shop/${product?.id}`}>{product?.name}</Link>
      </p>

      <div className="flex items-center gap-2">
        <p className="font-bold text-xl"> ${product?.discount_price}</p>
        <p className="font-medium text-[14px] text-gray-500 line-through">
          ${product?.price}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-7">
        <button className="font-bold text-[16px] text-red-600 border border-red-600 rounded-full py-3 cursor-pointer transition-all duration-300 hover:bg-red-600 hover:text-white">
          <Link href={`/${langCode}/shop/${product?.id}`}>View Details</Link>
        </button>

        <AddCard
          quantity={product?.quantity}
          lan={lan?.shop?.addCard}
          productId={product?.id}
          userId={"1"}
        />
      </div>
    </div>
  );
}
