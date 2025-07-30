import Link from "next/link";
import React from "react";

export default function NavC2() {
  return (
    <div className="drawer_wrapper fixed invisible z-10">
      <div className="drawer sm:w-auto w-full" id="navbar_drawer">
        <div className="flex items-center justify-between">
          <Link href="/">
            <img
              src="/wp-content/themes/hdotrade/assets/logo-B5U-EJGW.png"
              alt=""
            />
          </Link>
          <button type="button" className="p-1" id="drawer_close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="32px"
              fill="#030303"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col gap-10 my-6">
          <li className="nav_link text-lg">
            <Link href="/">Home</Link>
          </li>
          <li className="nav_link text-lg">
            <Link href="/shop">Store</Link>
          </li>
          <li className="nav_link text-lg">
            <Link href="/about">About us</Link>
          </li>
          <li className="nav_link text-lg">
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>

        <div
          className="aws-container"
          data-url="/?wc-ajax=aws_action"
          data-show-more="true"
          data-show-page="true"
          data-ajax-search="true"
          data-show-clear="true"
          data-mobile-screen="false"
          data-use-analytics="false"
          data-min-chars="1"
          data-buttons-order="2"
          data-timeout="300"
          data-is-mobile="false"
          data-page-id="6"
          data-tax=""
        >
          <form
            className="aws-search-form"
            action="https://hdotrade.com/"
            method="get"
            role="search"
          >
            <div className="aws-wrapper">
              <label className="aws-search-label" htmlFor="6885930f9a1f9">
                Search...
              </label>
              <input
                type="search"
                name="s"
                id="6885930f9a1f9"
                // value=""
                className="aws-search-field"
                placeholder="Search..."
                autoComplete="off"
              />
              {/* <input type="hidden" name="post_type" value="product" /> */}
              {/* <input type="hidden" name="type_aws" value="true" /> */}
              <div className="aws-search-clear">
                <span>×</span>
              </div>
              <div className="aws-loader"></div>
            </div>
            <div className="aws-search-btn aws-form-btn">
              <span className="aws-search-btn_icon"></span>
            </div>
          </form>
        </div>

        <form
          action="https://hdotrade.com/"
          className="seach_bar relative shrink-0 flex items-center rounded-20 w-full"
        >
          <input
            type="text"
            placeholder="Search ..."
            name="s"
            // value=""
            className="w-full pl-14 pr-8 py-2 h-full text-gray-700 focus:outline-none rounded-20"
          />
          <button
            type="submit"
            className="btn !py-0 !flex items-center justify-center h-full w-full"
            id="search_btn"
          >
            Search
          </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            className="absolute top-1/2 left-7 -translate-y-1/2"
          >
            <path
              d="M16.3948 16.2726L12.814 12.6853M14.7984 7.89117C14.7984 9.69065 14.0836 11.4164 12.8111 12.6888C11.5387 13.9613 9.81293 14.6761 8.01345 14.6761C6.21398 14.6761 4.4882 13.9613 3.21578 12.6888C1.94336 11.4164 1.22852 9.69065 1.22852 7.89117C1.22852 6.09169 1.94336 4.36592 3.21578 3.09349C4.4882 1.82107 6.21398 1.10623 8.01345 1.10623C9.81293 1.10623 11.5387 1.82107 12.8111 3.09349C14.0836 4.36592 14.7984 6.09169 14.7984 7.89117V7.89117Z"
              stroke="#292D32"
              strokeWidth="1.42184"
              strokeLinecap="round"
            />
          </svg>
        </form>
      </div>
      <div aria-hidden="true" className="backdrop"></div>
    </div>
  );
}
