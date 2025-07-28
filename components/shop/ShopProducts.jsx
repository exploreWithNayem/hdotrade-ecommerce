import NoProduct from "./filter/NoProduct";
import ClientPaginatedProducts from "../clients/Paginate";

export default function ShopProducts({ langCode, lan, products }) {
  return (
    <>
      {products.length > 0 ? (
        <ClientPaginatedProducts
          products={products}
          langCode={langCode}
          lan={lan}
        />
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
