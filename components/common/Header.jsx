"use client";

import Link from "next/link";
import LanguageSwitcher from "./LnagSwither";
import Search from "./Search";
import Image from "next/image";
import { useState } from "react";
import logo from "@/public/client/logo.png";
import {
  AngelDownIcon,
  CartIcon,
  SearchIcon,
  ThreeDotIcon,
} from "@/public/icons/icons";
import { useCart } from "@/providers/CartContext";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();

  const cartLengths = cart?.items?.length || 0;

  const toggleMobileMenu = () => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleSearchMenu = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen((prev) => !prev);
  };

  const cartLength = cart?.items.length > 0 ? cart?.items.length : 0;

  return (
    <header className="shadow-sm bg-[#061E3E]   relative z-50">
      <div className="container flex items-center justify-between lg:justify-evenly h-[80px] lg:h-[105px]">
        {/* Logo */}
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={100}
            height={100}
            className="w-[80px] h-auto sm:w-[100px]" // default 80px, 100px on sm+
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:block">
          <Search />
        </div>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-gray-200">
          <Link
            href="/"
            className="text-white hover:text-[#e91325] transition-colors duration-300"
          >
            Home
          </Link>

          <Link
            href="/shop"
            className="text-white hover:text-[#e91325] transition-colors duration-300"
          >
            Store
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-[#e91325] transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-[#e91325] transition-colors duration-300"
          >
            Contact Us
          </Link>

          <div className="flex items-center space-x-4 gap-7">
            <LanguageSwitcher />

            <Link
              href="/add-card"
              className="text-white hover:text-primary transition relative flex items-center gap-3"
            >
              <CartIcon />
              <div className="leading-3 text-white hover:text-[#e91325] transition-colors duration-300">
                Cart
              </div>
              <div className="absolute right-[55px] -top-3 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
                {cartLength}
              </div>
              <AngelDownIcon />
            </Link>
          </div>
        </nav>

        {/* Mobile Icons */}
        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={toggleSearchMenu}
            className="bg-[#E30613] w-10 h-10 rounded-full flex items-center justify-center text-white"
          >
            <SearchIcon />
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
      <div
        className={`
          lg:hidden bg-[#061E3E] text-white px-6 py-4 space-y-4 absolute left-0 w-full z-50
          transform transition-all duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? "top-[80px] opacity-100 translate-y-0"
              : "top-0 opacity-0 -translate-y-full pointer-events-none"
          }
        `}
      >
        <Link
          href="/"
          className="block hover:text-primary"
          onClick={toggleMobileMenu}
        >
          Home
        </Link>
        <Link
          href="/shop"
          className="block hover:text-primary"
          onClick={toggleMobileMenu}
        >
          Store
        </Link>
        <Link
          href="about"
          className="block hover:text-primary"
          onClick={toggleMobileMenu}
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className="block hover:text-primary"
          onClick={toggleMobileMenu}
        >
          Contact Us
        </Link>
        <Link
          href="/add-card"
          className="block hover:text-primary"
          onClick={toggleMobileMenu}
        >
          Cart ({cartLengths})
        </Link>
        <div className="pt-2 border-t border-gray-600">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Search Menu Dropdown */}
      <div
        className={`
          lg:hidden bg-[#061E3E] text-white px-6 py-4 space-y-4 absolute left-0 w-full z-50
          transform transition-all duration-300 ease-in-out
          ${
            isSearchOpen
              ? "top-[80px] opacity-100 translate-y-0"
              : "top-0 opacity-0 -translate-y-full pointer-events-none"
          }
        `}
      >
        <Search />
      </div>
    </header>
  );
}
