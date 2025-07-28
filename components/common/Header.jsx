import Link from "next/link";
import LanguageSwitcher from "./LnagSwither";
import Search from "./Search";
import { auth } from "@/auth";
import { getUserByMail } from "@/database/queries";
import Account from "./Account";
import Image from "next/image";
import logo from "@/public/client/logo.png";
export default async function Header({ language, langCode }) {
  const header = language?.headers;
  const session = await auth();
  let user = await getUserByMail(session?.user?.email);
  const count = user?.wishlist?.length;
  const cardCount = user?.cardlist?.length;

  if (user) {
    user = {
      ...user,
      cardlist: user.cardlist.map((card) => ({
        ...card,
        _id: card._id.toString(), // Convert ObjectId to string
        addedAt: card.addedAt.toISOString(), // Convert Date to ISO string
      })),
      wishlist: user.wishlist.map((id) => id.toString()), // Convert ObjectId to string
    };
  }

  return (
    <header className=" shadow-sm bg-[#061E3E]">
      <div className="container flex items-center justify-between h-[105px]">
        <Link href={`/${langCode}`}>
          {/* <h1 className="text-3xl font-bold text-red-500">
            N<span className="text-gray-800">KART</span>
          </h1> */}

          <Image width={80} height={80} src={logo} alt="logo" />
        </Link>

        <Search searchLan={header?.search} langCode={langCode} />
        <Link
          href={`/${langCode}`}
          className="text-gray-200 hover:text-white transition"
        >
          Home
        </Link>
        <Link
          href={`/${langCode}/shop`}
          className="text-gray-200 hover:text-white transition"
        >
          {/* {nav?.shop} */}
          Store
        </Link>

        <Link
          href={`/${langCode}/about`}
          className="text-gray-200 hover:text-white transition"
        >
          {/* {nav?.about} */}
          About Us
        </Link>
        <Link
          href={`/${langCode}/contact`}
          className="text-gray-200 hover:text-white transition"
        >
          {/* {nav?.contact} */}
          Contact Us
        </Link>

        <div className="flex items-center space-x-4 gap-7">
          <LanguageSwitcher />

          {/* <Link
            href={`/${langCode}/wishlist`}
            className="text-center text-gray-700 hover:text-primary transition relative"
          >
            <div className="text-2xl">
              <i className="fa-regular fa-heart"></i>
            </div>
            <div className="text-xs leading-3">{header?.wishlist}</div>
            {user?.wishlist && (
              <div className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                {count}
              </div>
            )}
          </Link> */}
          <Link
            href={`/${langCode}/add-card`}
            className="text-center text-white hover:text-primary transition relative flex items-center gap-1"
          >
            <div className="">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
            <div className=" leading-3">Cart</div>
            {user?.cardlist && (
              <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                {cardCount}
              </div>
            )}
            <div className="">
              <i className="fa-solid fa-angle-down"></i>
            </div>
          </Link>
          {/* <div className="text-center text-gray-700 hover:text-primary   transition relative">
            <Account
              user={user}
              session={session}
              header={header}
              lan={langCode}
            />
          </div> */}
        </div>
      </div>
    </header>
  );
}
