import { getProducts } from "@/database/queries";
import ShopProducts from "../shop/ShopProducts";

export default async function ProductQuery({
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
      <ShopProducts products={products} langCode={langCode} lan={lan} />
    </>
  );
}
