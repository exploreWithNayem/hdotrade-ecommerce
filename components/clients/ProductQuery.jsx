import { getProducts } from "@/database/queries";
import ShopProducts from "../shop/ShopProducts";

export default async function ProductQuery({
  search,
  filCat,
  fillPrice,
  fillSize,
}) {
  const products = await getProducts(filCat, search, fillPrice, fillSize);

  return (
    <>
      <ShopProducts products={products}  />
    </>
  );
}
