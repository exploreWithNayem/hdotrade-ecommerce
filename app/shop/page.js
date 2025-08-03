import FilterC from "@/components/clients/FilterC";
import ProductQuery from "@/components/clients/ProductQuery";
import Loading from "@/components/common/Loading";

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

  const decodedCat = decordedFilterCat(filterCat);
  const decodedPrice = decordedFilterCat(priceFilter);
  const decodedSize = decordedFilterCat(size);

  return (
    <div className="w-full max-w-[1440px] mx-auto bg-[#ffffff] ">
      <div className="container pt-4 pb-16 items-start">
        <FilterC />
        <Suspense fallback={<Loading />}>
          <ProductQuery
            search={search}
            filCat={decodedCat}
            fillPrice={decodedPrice}
            fillSize={decodedSize}
          />
        </Suspense>
      </div>
    </div>
  );
}
