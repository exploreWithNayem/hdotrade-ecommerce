// import { auth } from "@/auth";
import ControllCheckout from "@/components/checkout/ControllCheckout";
import Breadcrumb from "@/components/shop/Breadcrumb";
import { getSummary } from "@/database/queries";
import { getLang } from "@/languages/dynamicLangSwitch";
// import { redirect } from "next/navigation";

export default async function page(props) {
  const params = await props.params;

  const {
    lang
  } = params;

  const lan = await getLang(lang);
  // const session = await auth();



  const summery = await getSummary();

  return (
    <>
      <Breadcrumb pageName={"Checkout"} />
      <div className="container grid grid-cols-12 items-start pb-16 pt-4 gap-6">
        <ControllCheckout lan={lan} langCode={lang} summery={summery} />
      </div>
    </>
  );
}
