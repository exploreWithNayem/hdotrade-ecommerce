import Loading from "@/components/common/Loading";
import Breadcrumb from "@/components/shop/Breadcrumb";
import ProductSidebar from "@/components/shop/ProductSidebar";
import ShopProducts from "@/components/shop/ShopProducts";
import { getLang } from "@/languages/dynamicLangSwitch";
import { Suspense } from "react";

const decordedFilterCat = (filCat) => {
  const decorded = decodeURI(filCat);
  if (decorded === "undefined") {
    return "";
  }
  return decorded;
};

export default async function page(props) {
  const searchParams = await props.searchParams;

  const { search, filterCat, priceFilter, size } = searchParams;

  const params = await props.params;

  const { lang } = params;

  const decodedCat = decordedFilterCat(filterCat);
  const decodedPrice = decordedFilterCat(priceFilter);
  const decodedSize = decordedFilterCat(size);

  const pageName = search ? `Searched By ${search}` : "Shop";

  const lan = await getLang(lang);
  return (
    <div>
      <Breadcrumb pageName={pageName} />
      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <ProductSidebar lan={lan?.shop} />
        <Suspense fallback={<Loading/>}>
          <ShopProducts
            search={search}
            filCat={decodedCat}
            fillPrice={decodedPrice}
            fillSize={decodedSize}
            langCode={lang}
            lan={lan?.shop}
          />
        </Suspense>
      </div>
    </div>
  );
}
