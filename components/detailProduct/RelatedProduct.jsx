import { getProductByCategory } from "@/database/queries";
import ProductCard from "../shop/ProductCard";

export default async function RelatedProduct({ category, lan, langCode }) {
  const relatedProduct = await getProductByCategory(category);
  const newRelatedProduct = relatedProduct.slice(0, 4);
  return (
    <>
      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          {lan}
        </h2>

        <div className="grid grid-cols-4 gap-6">
          {newRelatedProduct.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
              langCode={langCode}
            />
          ))}
        </div>
      </div>
    </>
  );
}
