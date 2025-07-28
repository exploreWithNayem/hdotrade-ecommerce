import { auth } from "@/auth";
import Breadcrumb from "@/components/shop/Breadcrumb";
import { getUserByMail } from "@/database/queries";
import Image from "next/image";
import Link from "next/link";
import profileImg from "@/public/default.png";
import { redirect } from "next/navigation";
import { getLang } from "@/languages/dynamicLangSwitch";
import OrderList from "@/components/auth/OrderList";

export default async function page(props) {
  const params = await props.params;

  const {
    lang
  } = params;

  const lan = await getLang(lang);

  const session = await auth();

  if (!session) {
    redirect(`/${lang}/login`);
  }

  const user = await getUserByMail(session?.user?.email);
  const shipingAdd = user?.shipingAddress;
  const billAdd = user?.billingAddress;

  return (
    <>
      <Breadcrumb pageName={lan?.account?.page} />
      <div className="container  items-start gap-6 pt-4 pb-16">
        <div className=" grid grid-cols-3 gap-4 mx-auto max-w-5xl">
          <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 text-lg">
                {lan?.account?.personal}
              </h3>
              <Link href={`/${lang}/account/update`} className="text-primary">
                {lan?.account?.edit}
              </Link>
            </div>

            <div className="space-y-1">
              <Image
                width={50}
                height={50}
                className="w-14 h-14 rounded-full"
                alt="l"
                src={user?.image ? user.image : profileImg}
              />
              <h4 className="text-gray-700 font-medium">{user?.name}</h4>
              <p className="text-gray-800">{user?.email}</p>
              <p className="text-gray-800">{user?.contact}</p>
            </div>
          </div>

          <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 text-lg">
                {lan?.account?.shipping}
              </h3>
              <Link
                href={`/${lang}/account/updateShipping`}
                className="text-primary"
              >
                {lan?.account?.edit}
              </Link>
            </div>
            <div className="space-y-1">
              <h4 className="text-gray-700 font-medium">{shipingAdd?.city}</h4>
              <p className="text-gray-800">{shipingAdd?.houseName}</p>
              <p className="text-gray-800">{shipingAdd?.postcode}</p>
              <p className="text-gray-800">{shipingAdd?.phone}</p>
            </div>
          </div>

          <div className="shadow rounded bg-white px-4 pt-6 pb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 text-lg">
                {lan?.account?.bill}
              </h3>
              <Link
                href={`/${lang}/account/update-billing`}
                className="text-primary"
              >
                {lan?.account?.edit}
              </Link>
            </div>
            <div className="space-y-1">
              <h4 className="text-gray-700 font-medium">{billAdd?.city}</h4>
              <p className="text-gray-800">{billAdd?.houseName}</p>
              <p className="text-gray-800">{billAdd?.postcode}</p>
              <p className="text-gray-800">{billAdd?.phone}</p>
            </div>
          </div>
        </div>
        <OrderList userId={user?.id} />
      </div>
    </>
  );
}
