"use client";
import {
  AddAdminIcon,
  AddCategoryIcon,
  AddManufactureIcon,
  AddProductIcon,
  AdminIcon,
  CartsIcon,
  CategoryIcon,
  DashboardIcon,
  LoginIcon,
  ManufacturerIcon,
  OrdersIcon,
  ProductsIcon,
} from "@/public/icons/icons";
import Link from "next/link";

// import { useRouter } from "next/router";
import React from "react";

// import UserDropdown from "components/Dropdowns/UserDropdown.js";
// import NotificationDropdown from "./NotificationDropdown";

export default function AdminSidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  // const router = useRouter();
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            href="/auth/dashboard"
            className=" text-[#0ea5e9] md:block text-left md:pb-2  mr-0 inline-block whitespace-nowrap text-[20px] font-bold uppercase  p-4 px-0"
          >
            HDOTRADE Admin
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              {/* <NotificationDropdown /> */}
            </li>
            <li className="inline-block relative">{/* <UserDropdown /> */}</li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link
                    href="/auth/dashboard"
                    className="md:block text-left md:pb-2 text-[#0ea5e9] mr-0 inline-block whitespace-nowrap text-sm uppercase p-4 px-0"
                  >
                    HDOTRADE Admin
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-[#0ea5e9]  text-[14px] uppercase  block pt-1 pb-4 no-underline">
              Auth Pages
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  href="/auth/login"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-xs uppercase py-3  flex   gap-2 "
                >
                  <DashboardIcon /> <span>Dashboard </span>
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/auth/login"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-xs uppercase py-3  flex   gap-2"
                >
                  <AdminIcon />
                  Admins
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/auth/login"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-xs uppercase py-3  flex   gap-2"
                >
                  <AddAdminIcon />
                  Create An Admin
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/auth/login"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-xs uppercase py-3  flex   gap-2"
                >
                  <LoginIcon />
                  Logout
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="text-[#0ea5e9] md:min-w-full  text-[14px] uppercase  block pt-1 pb-4 no-underline">
              Product Pages
            </h6>
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="items-center">
                <Link
                  href="/landing"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-xs uppercase py-3  flex   gap-2"
                >
                  <ProductsIcon />
                  Products
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/profile"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-xs uppercase py-3  flex   gap-2"
                >
                  <AddProductIcon />
                  Add Product
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/profile"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-xs uppercase py-3  flex   gap-2"
                >
                  <CategoryIcon />
                  Categories
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/profile"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-xs uppercase py-3  flex   gap-2"
                >
                  <AddCategoryIcon />
                  Add Category
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/profile"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-xs uppercase py-3  flex   gap-2"
                >
                  <ManufacturerIcon />
                  Manufacturers
                </Link>
              </li>
              <li className="items-center">
                <Link
                  href="/profile"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-xs uppercase py-3  flex   gap-2"
                >
                  <AddManufactureIcon />
                  Add Manufacturer
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/profile"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-xs uppercase py-3  flex   gap-2"
                >
                  <CartsIcon />
                  Carts
                </Link>
              </li>

              <li className="items-center">
                <Link
                  href="/landing"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-xs uppercase py-3  flex   gap-2"
                >
                  <OrdersIcon />
                  Orders
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-[#0ea5e9]  text-[14px] uppercase  block pt-1 pb-4 no-underline">
              Other Pages
            </h6>
            {/* Navigation */}
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              <li className="inline-flex">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/colors/notus"
                  target="_blank"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-sm block mb-4 no-underline "
                >
                  <i className="fas fa-paint-brush mr-2 text-blueGray-300 text-base"></i>
                  Home
                </a>
              </li>

              <li className="inline-flex">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus"
                  target="_blank"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-sm block mb-4 no-underline "
                >
                  <i className="fab fa-css3-alt mr-2 text-blueGray-300 text-base"></i>
                  About
                </a>
              </li>

              <li className="inline-flex">
                <a
                  aria-disabled
                  href="#!"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-sm block mb-4 no-underline "
                >
                  <i className="fab fa-angular mr-2 text-blueGray-300 text-base"></i>
                  Contact
                </a>
              </li>

              <li className="inline-flex">
                <a
                  aria-disabled
                  href="#!"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-sm block mb-4 no-underline "
                >
                  <i className="fab fa-js-square mr-2 text-blueGray-300 text-base"></i>
                  Store
                </a>
              </li>

              <li className="inline-flex">
                <a
                  href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/overview/notus"
                  target="_blank"
                  className="text-blueGray-700 hover:text-[#0ea5e9] text-sm block mb-4 no-underline font-normal"
                >
                  <i className="fab fa-react mr-2 text-blueGray-300 text-base"></i>
                  Footer
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
