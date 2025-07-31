import { getProductByCategory } from "@/database/queries";
import ProductCard from "../shop/ProductCard";

const RelatedProduct = async ({ category, langCode }) => {
  const relatedProduct = await getProductByCategory(category);
  const newRelatedProduct = relatedProduct.slice(0, 4);
  return (
    <div className="bg-[#f4f3ef]">
      <div className="max-w-[1280px] mx-auto px-3">
        <div className="p-4 md:p-8 lg:p-20">
          <h1 className="font-bold text-3xl md:text-5xl text-center pt-9 lg:pt-0">
            Related Products
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mt-16 mb-20">
            {newRelatedProduct.map((product) => (
              <ProductCard
                key={product?.id}
                product={product}
                langCode={langCode}
                relatedProduct={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
