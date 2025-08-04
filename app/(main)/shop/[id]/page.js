import ProductPage from "@/components/clients/ProductCartC";
import RelatedProduct from "@/components/detailProduct/RelatedProduct";
import { getProductById } from "@/database/queries";

export async function generateMetadata(props) {
  const params = await props.params;

  const { id } = params;

  const product = await getProductById(id);

  return {
    title: product?.name,
    description: product?.description,
    openGraph: {
      images: [
        {
          url: product?.image[0],
          alt: "Detail About The Food",
        },
      ],
    },
  };
}

export default async function page(props) {
  const params = await props.params;

  const { id, lang } = params;

  const product = await getProductById(id);


  return (
    <>
      <div>
        
        <ProductPage product={product} />
        <RelatedProduct
          category={product?.category}
          langCode={lang}
        />
      </div>
    </>
  );
}
