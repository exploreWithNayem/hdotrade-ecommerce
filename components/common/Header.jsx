"use client";

import Link from "next/link";
import LanguageSwitcher from "./LnagSwither";
import Search from "./Search";
import Image from "next/image";
import { useState } from "react";
import logo from "@/public/client/logo.png";
import { AngelDownIcon, CartIcon, SearchIcon, ThreeDotIcon } from "@/public/icons/icons";

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
              className="text-white hover:text-primary transition relative flex items-center gap-3"
            >
              <CartIcon />
              <div className="leading-3">Cart</div>
              <div className="absolute right-[55px] -top-3 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                4
              </div>
              <AngelDownIcon />
            </Link>
          </div>
        </nav>

        {/* Mobile Icons */}
        <div className="lg:hidden flex items-center gap-4">
          <button className="bg-[#E30613] w-10 h-10 rounded-full flex items-center justify-center text-white">
        
            <SearchIcon/>
          </button>
          <button
            onClick={toggleMobileMenu}
            className="bg-[#E30613] w-10 h-10 rounded-full flex items-center justify-center text-white"
          >
           
            <ThreeDotIcon />
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
