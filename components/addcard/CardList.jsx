import Link from "next/link";
import List from "./List";
import NoCard from "./NoCard";
import { getUserById } from "@/database/queries";
import { getLang } from "@/languages/dynamicLangSwitch";

const CardList = async ({ userId, langCode, products }) => {
  const user = await getUserById(userId);
  const lan = await getLang(langCode);

  return (
    <div className=" bg-gray-100 p-6">
      {products.length > 0 ? (
        products.map((product, index) => (
          <List user={user} product={product} langCode={langCode} key={index} />
        ))
      ) : (
        <div className="col-span-3">
          <div className="grid md:grid-cols-1 grid-cols-2 gap-6">
            <NoCard lan={lan?.shop} />
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        {products.length > 0 ? (
          <Link
            href={`/${langCode}/checkout`}
            className="px-6 py-3 bg-green-500 text-white text-lg rounded-full hover:bg-green-600"
          >
            {lan?.shop?.proceed}
          </Link>
        ) : (
          <button
            disabled
            className="px-6 py-3 bg-gray-400 text-white text-lg rounded-full cursor-not-allowed"
          >
          {lan?.shop?.proceed}
          </button>
        )}
      </div>
    </div>
  );
};

export default CardList;
