import ControllCheckout from "@/components/checkout/ControllCheckout";
import Breadcrumb from "@/components/shop/Breadcrumb";
import { getSummary } from "@/database/queries";

export default async function page() {
  const summery = await getSummary();

  return (
    <>
      <Breadcrumb pageName={"Checkout"} />
      <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
        <ControllCheckout summery={summery} />
      </div>
    </>
  );
}
