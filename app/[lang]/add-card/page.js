
// import { auth } from "@/auth";
import CardList from "@/components/addcard/CardList";
import { getCardListData, getUserByMail } from "@/database/queries";
// import { redirect } from "next/navigation";

export default async function page(props) {
  const params = await props.params;

  const {
    lang
  } = params;

  // const session = await auth();
  // if (!session) {
  //   redirect(`/${lang}/login`);
  // }

  // const user = await getUserByMail(session?.user?.email);

  const listedProducts = await getCardListData(user?.id);

  return (
    <>
      <div className="container gap-6 pt-4 pb-16">
        <div className="mx-auto space-y-4 max-w-6xl">
          {/* <CardList /> */}

          <CardList
            userId={user?.id}
            langCode={lang}
            products={listedProducts}
          />
        </div>
      </div>
    </>
  );
}
