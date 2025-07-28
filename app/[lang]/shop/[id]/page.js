import { auth } from "@/auth";
import ProductPage from "@/components/clients/ProductCartC";
import RelatedProduct from "@/components/detailProduct/RelatedProduct";
import { getProductById, getUserByMail } from "@/database/queries";
import { getLang } from "@/languages/dynamicLangSwitch";

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
  const session = await auth();
  const user = await getUserByMail(session?.user?.email);
  const lan = await getLang(lang);

  return (
    <>
      <div>
        <ProductPage product={product} />
        <RelatedProduct
          category={product?.category}
          lan={lan?.detail?.related}
          langCode={lang}
        />
      </div>
    </>
  );
}
