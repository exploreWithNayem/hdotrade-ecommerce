import { auth } from "@/auth";
import Breadcrumb from "@/components/shop/Breadcrumb";
import { redirect } from "next/navigation";
import { getUserByMail, getWishListData } from "@/database/queries";
import WishList from "@/components/wishlist/WishList";
import NoWish from "@/components/wishlist/NoWish";
import { getLang } from "@/languages/dynamicLangSwitch";

export default async function page(props) {
  const params = await props.params;

  const {
    lang
  } = params;

  const session = await auth();
  const lan = await getLang(lang);
  if (!session) {
    redirect(`/${lang}/login`);
  }
  const user = await getUserByMail(session?.user?.email);
  const wishedList = await getWishListData(user?.id);

  return (
    <>
      <Breadcrumb pageName={"Wishlist"} />
      <div className="container gap-6 pt-4 pb-16">
        {/* <!-- wishlist --> */}
        <div className="mx-auto space-y-4 max-w-6xl">
          {wishedList.length > 0 ? (
            wishedList?.map((list, index) => (
              <WishList
                userId={user?.id}
                langCode={lang}
                list={list}
                key={index}
              />
            ))
          ) : (
            <NoWish lan={lan?.shop} />
          )}
        </div>
      </div>
    </>
  );
}
