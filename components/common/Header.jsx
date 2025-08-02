"use client";

import Link from "next/link";
import LanguageSwitcher from "./LnagSwither";
import Search from "./Search";
import Image from "next/image";
import { useEffect, useState } from "react";
import logo from "@/public/client/logo.png";
import {
  AngelDownIcon,
  CartIcon,
  SearchIcon,
  ThreeDotIcon,
} from "@/public/icons/icons";
// import { getCart } from "@/database/queries";

export default function Header({ language, langCode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const header = language?.headers;

  const toggleMobileMenu = () => {
    setIsSearchOpen(false);
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleSearchMenu = () => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen((prev) => !prev);
  };

  const [cart, setCart] = useState(null);
  const cartLength = cart?.items.length > 0 ? cart?.items.length: 0;


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userId = localStorage.getItem("userId"); // or from auth context
        const trackingId = localStorage.getItem("trackingId"); // fallback

        const params = new URLSearchParams();

        if (userId) params.append("userId", userId);
        else if (trackingId) params.append("trackingId", trackingId);

        const res = await fetch(`/api/get-cart?${params.toString()}`);
        const data = await res.json();

        if (res.ok) {
          setCart(data);
        } else {
          console.log("Cart fetch error:", data.error);
        }
      } catch (error) {
        console.log("Fetch failed:", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <header className="shadow-sm bg-[#061E3E]   relative z-50">
      <div className="container flex items-center justify-between lg:justify-evenly h-[80px] lg:h-[105px]">
        {/* Logo */}
        <Link href={`/${langCode}`}>
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
          <Search searchLan={header?.search} langCode={langCode} />
        </div>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-gray-200">
          <Link
            href={`/${langCode}`}
            className="text-white hover:text-[#e91325] transition-colors duration-300"
          >
            Home
          </Link>

          <Link
            href={`/${langCode}/shop`}
            className="text-white hover:text-[#e91325] transition-colors duration-300"
          >
            Store
          </Link>
          <Link
            href={`/${langCode}/about`}
            className="text-white hover:text-[#e91325] transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            href={`/${langCode}/contact`}
            className="text-white hover:text-[#e91325] transition-colors duration-300"
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
          href={`/${langCode}`}
          className="block hover:text-primary"
          onClick={toggleMobileMenu}
        >
          Home
        </Link>
        <Link
          href={`/${langCode}/shop`}
          className="block hover:text-primary"
          onClick={toggleMobileMenu}
        >
          Store
        </Link>
        <Link
          href={`/${langCode}/about`}
          className="block hover:text-primary"
          onClick={toggleMobileMenu}
        >
          About Us
        </Link>
        <Link
          href={`/${langCode}/contact`}
          className="block hover:text-primary"
          onClick={toggleMobileMenu}
        >
          Contact Us
        </Link>
        <Link
          href={`/${langCode}/add-card`}
          className="block hover:text-primary"
          onClick={toggleMobileMenu}
        >
          Cart ({cartLength})
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
        <Search searchLan={header?.search} langCode={langCode} />
      </div>
    </header>
  );
}
