"use client";

import Link from "next/link";
import LanguageSwitcher from "./LnagSwither";
import Search from "./Search";
import Image from "next/image";
import { useState } from "react";
import logo from "@/public/client/logo.png";

export default function Header({ language, langCode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const header = language?.headers;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="shadow-sm bg-[#061E3E] relative z-50">
      <div className="container flex items-center justify-between lg:justify-evenly h-[105px]">
        {/* Logo */}
        <Link href={`/${langCode}`}>
          <Image width={100} height={100} src={logo} alt="logo" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:block">
          <Search searchLan={header?.search} langCode={langCode} />
        </div>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-gray-200">
          <Link href={`/${langCode}`} className="hover:text-white transition">
            Home
          </Link>
          <Link
            href={`/${langCode}/shop`}
            className="hover:text-white transition"
          >
            Store
          </Link>
          <Link
            href={`/${langCode}/about`}
            className="hover:text-white transition"
          >
            About Us
          </Link>
          <Link
            href={`/${langCode}/contact`}
            className="hover:text-white transition"
          >
            Contact Us
          </Link>

          <div className="flex items-center space-x-4 gap-7">
            <LanguageSwitcher />

            <Link
              href={`/${langCode}/add-card`}
              className="text-white hover:text-primary transition relative flex items-center gap-1"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <div className="leading-3">Cart</div>
              <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                4
              </div>
              <i className="fa-solid fa-angle-down"></i>
            </Link>
          </div>
        </nav>

        {/* Mobile Icons */}
        <div className="lg:hidden flex items-center gap-4">
          <button className="bg-[#E30613] w-10 h-10 rounded-full flex items-center justify-center text-white">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <button
            onClick={toggleMobileMenu}
            className="bg-[#E30613] w-10 h-10 rounded-full flex items-center justify-center text-white"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#061E3E] text-white px-6 py-4 space-y-4 absolute top-[105px] left-0 w-full">
          <Link href={`/${langCode}`} className="block hover:text-primary">
            Home
          </Link>
          <Link href={`/${langCode}/shop`} className="block hover:text-primary">
            Store
          </Link>
          <Link
            href={`/${langCode}/about`}
            className="block hover:text-primary"
          >
            About Us
          </Link>
          <Link
            href={`/${langCode}/contact`}
            className="block hover:text-primary"
          >
            Contact Us
          </Link>
          <Link
            href={`/${langCode}/add-card`}
            className="block hover:text-primary"
          >
            Cart (4)
          </Link>
          <div className="pt-2 border-t border-gray-600">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}


// "use client";

// import Link from "next/link";
// import LanguageSwitcher from "./LnagSwither";
// import Search from "./Search";
// // import { auth } from "@/auth";
// // import { getUserByMail } from "@/database/queries";
// import Image from "next/image";
// import logo from "@/public/client/logo.png";
// import { useState } from "react";
// import { useEffect } from "react";

// export default  function Header({ language, langCode }) {
//   const header = language?.headers;
//   // const session = await auth();
//   // let user = await getUserByMail(session?.user?.email);
//   // const cardCount = user?.cardlist?.length;

//   // if (user) {
//   //   user = {
//   //     ...user,
//   //     cardlist: user.cardlist.map((card) => ({
//   //       ...card,
//   //       _id: card._id.toString(),
//   //       addedAt: card.addedAt.toISOString(),
//   //     })),
//   //     wishlist: user.wishlist.map((id) => id.toString()),
//   //   };
//   // }

//   return (
//     <header className="shadow-sm bg-[#061E3E] text-white">
//       <div className="container flex items-center justify-between h-[105px] relative z-50">
//         <Link href={`/${langCode}`}>
//           <Image width={100} height={100} src={logo} alt="logo" />
//         </Link>

//         <div className="hidden lg:block">
//           <Search searchLan={header?.search} langCode={langCode} />
//         </div>

//         <nav className="hidden lg:flex gap-8 items-center">
//           <Link href={`/${langCode}`} className="hover:text-white transition">
//             Home
//           </Link>
//           <Link
//             href={`/${langCode}/shop`}
//             className="hover:text-white transition"
//           >
//             Store
//           </Link>
//           <Link
//             href={`/${langCode}/about`}
//             className="hover:text-white transition"
//           >
//             About Us
//           </Link>
//           <Link
//             href={`/${langCode}/contact`}
//             className="hover:text-white transition"
//           >
//             Contact Us
//           </Link>
//           <LanguageSwitcher />
//           <Link
//             href={`/${langCode}/add-card`}
//             className="relative flex items-center gap-1 hover:text-primary transition"
//           >
//             <i className="fa-solid fa-cart-shopping"></i>
//             <span>Cart</span>
//             {/* {cardCount > 0 && ( */}
//               <span className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
//                 {/* {cardCount} */}
// 3              </span>
//             {/* )} */}
//           </Link>
//         </nav>

//         {/* Mobile Menu Button */}
//         <MobileMenu
//           // user={user}
//           langCode={langCode}
//           header={header}
//           cardCount={3}
//         />
//       </div>
//     </header>
//   );
// }

// function MobileMenu({ user, langCode, header, cardCount }) {
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (open) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "auto";
//   }, [open]);

//   return (
//     <>
//       <button onClick={() => setOpen(true)} className="lg:hidden text-white">
//         <i className="fas fa-bars text-2xl"></i>
//       </button>

//       {/* Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40"
//           onClick={() => setOpen(false)}
//         ></div>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-[#061E3E] z-50 transform transition-transform duration-300 ${
//           open ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="p-5 flex justify-between items-center border-b border-white/10">
//           <span className="text-lg font-semibold">Menu</span>
//           <button onClick={() => setOpen(false)}>
//             <i className="fas fa-times text-xl"></i>
//           </button>
//         </div>

//         <div className="flex flex-col p-5 space-y-4 text-white">
//           <Link href={`/${langCode}`} onClick={() => setOpen(false)}>
//             Home
//           </Link>
//           <Link href={`/${langCode}/shop`} onClick={() => setOpen(false)}>
//             Store
//           </Link>
//           <Link href={`/${langCode}/about`} onClick={() => setOpen(false)}>
//             About Us
//           </Link>
//           <Link href={`/${langCode}/contact`} onClick={() => setOpen(false)}>
//             Contact Us
//           </Link>
//           <Search searchLan={header?.search} langCode={langCode} />
//           <LanguageSwitcher />
//           <Link
//             href={`/${langCode}/add-card`}
//             onClick={() => setOpen(false)}
//             className="relative flex items-center gap-1 hover:text-primary transition"
//           >
//             <i className="fa-solid fa-cart-shopping"></i>
//             <span>Cart</span>
//             {/* {cardCount > 0 && ( */}
//               <span className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
//                 {cardCount}
//               </span>
//             {/* )} */}
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// }
