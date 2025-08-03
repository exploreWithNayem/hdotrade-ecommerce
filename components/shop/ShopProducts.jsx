import NoProduct from "./filter/NoProduct";
import ClientPaginatedProducts from "../clients/Paginate";

export default function ShopProducts({ products }) {
  return (
    <>
      {products.length > 0 ? (
        <ClientPaginatedProducts
          products={products}
 
        />
      ) : (
        <div className="col-span-3">
          <div className="grid md:grid-cols-1 grid-cols-2 gap-6">
            <NoProduct  />
          </div>
        </div>
      )}
    </>
  );
}
