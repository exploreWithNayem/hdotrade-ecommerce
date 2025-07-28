import Image from "next/image";
import Link from "next/link";
import Addwish from "./Addwish";
import { auth } from "@/auth";
import { getUserByMail } from "@/database/queries";
import Rating from "./Rating";
import AddCard from "./AddCard";
import { getLang } from "@/languages/dynamicLangSwitch";

export default async function ProductCard({ product, langCode }) {
  const lan = await getLang(langCode);
  const session = await auth();

  let user;
  if (session) {
    user = await getUserByMail(session.user?.email);
  }

  return (
    <>
      <div className="bg-white shadow flex flex-col justify-between rounded overflow-hidden group">
        <div className="relative">
          <Image
            src={product?.image[0]}
            alt="product 1"
            className="w-full"
            width={200}
            height={200}
          />
          <div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                        justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
          >
            <Link
              href="#"
              className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
              title="view product"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
            <Addwish productId={product?.id} userId={user?.id} />
          </div>
        </div>
        <div className="pt-4 pb-3 px-4">
          <Link href={`/${langCode}/shop/${product?.id}`}>
            <h4 className=" font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
              {product?.name}
            </h4>
          </Link>
          <div className="flex items-baseline mb-1 space-x-2">
            <p className="text-xl text-primary font-semibold">
              ${product?.discount_price}
            </p>
            <p className="text-sm text-gray-400 line-through">
              ${product?.price}
            </p>
          </div>
          <div className="flex items-center">
            <div className="flex gap-1 text-sm text-yellow-400">
              <Rating rating={product?.ratings} />
            </div>
            <div className="text-xs text-gray-500 ml-3">
              ({product?.reviewsNumber})
            </div>
          </div>
        </div>
        <AddCard
          quantity={product?.quantity}
          lan={lan?.shop?.addCard}
          productId={product?.id}
          userId={user?.id}
        />
      </div>
    </>
  );
}
