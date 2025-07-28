import ProductCard from "./ProductCard";
import { getProducts } from "@/database/queries";
import NoProduct from "./filter/NoProduct";

export default async function ShopProducts({
  search,
  filCat,
  fillPrice,
  fillSize,
  langCode,
  lan,
}) {
  const products = await getProducts(filCat, search, fillPrice, fillSize);
  return (
    <>
      {products.length > 0 ? (
        <div className="col-span-3">
          <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
            {products.map((product) => (
              <ProductCard
                lan={lan?.addCard}
                langCode={langCode}
                key={product?.id}
                product={product}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="col-span-3">
          <div className="grid md:grid-cols-1 grid-cols-2 gap-6">
            <NoProduct lan={lan} />
          </div>
        </div>
      )}
    </>
  );
}
