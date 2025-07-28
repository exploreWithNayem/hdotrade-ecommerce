import { auth } from "@/auth";
import UpdateBilling from "@/components/auth/UpdateBilling";
import { getUserByMail } from "@/database/queries";
import { getLang } from "@/languages/dynamicLangSwitch";
import { redirect } from "next/navigation";

export default async function page(props) {
  const params = await props.params;

  const {
    lang
  } = params;


  const session = await auth();
  const lan = await getLang(lang);
  if (!session) {
    redirect("/login");
  }

  const user = await getUserByMail(session?.user?.email);

  return (
    <>
      <div className="contain py-16">
        <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
          <h2 className="text-2xl uppercase font-medium mb-1">
            {lan?.billShip?.billTitle}
          </h2>
          {lan?.billShip?.subtitle}
          <p className="text-gray-600 mb-6 text-sm"></p>

          <UpdateBilling lan={lan?.billShip} dbUser={user} langCode={lang} />
        </div>
      </div>
    </>
  );
}
