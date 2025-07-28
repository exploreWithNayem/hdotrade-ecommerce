export default function NavC() {
  return (
    <nav className="navbar mb-4">
      <div className="container flex justify-between items-center gap-4 lg:py-0 py-5">
        <button
          type="button"
          id="navbar_menu_btn"
          className="menu_btn p-1 mr-5 block lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
          >
            <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" />
          </svg>
        </button>

        <a href="/" className="lg:block hidden min-w-24">
          <img
            src="/wp-content/themes/hdotrade/assets/logo-B5U-EJGW.png"
            alt=""
          />
        </a>

        <ul className="gap-10 md:flex hidden">
          <li className="nav_link text-lg">
            <a href="/">Home</a>
          </li>
          <li className="nav_link text-lg">
            <a href="/shop">Store</a>
          </li>
          <li className="nav_link text-lg">
            <a href="/about">About us</a>
          </li>
          <li className="nav_link text-lg">
            <a href="/contact">Contact Us</a>
          </li>
        </ul>

        <div className="max-w-[400px] flex-[1_0_auto] ">
          <form
            className=" relative w-full flex items-stretch h-[44px]"
            action="https://hdotrade.com/"
            method="get"
            role="search"
          >
            <div className=" flex-grow relative align-top p-0 w-full overflow-hidden">
              <label className="aws-search-label">Search...</label>
              <input
                type="search"
                name="s"
                id="6885930f98fbe"
                // value=""
                className="aws-search-field"
                placeholder="Search..."
                autoComplete="off"
              />
              <input type="hidden" name="post_type" value="product" />
              <input
                type="hidden"
                name="type_aws"
                // value="true"
              />
              <div className="aws-search-clear">
                <span>×</span>
              </div>
              <div className="aws-loader"></div>
            </div>
            <div
              className="aws-search-btn aws-form-btn     flex
    flex-col
    justify-center
    text-center

    border
    border-[#d8d8d8]
    -ml-px
    cursor-pointer
    relative
    whitespace-nowrap
    select-none
    transition-colors
    duration-100
    ease-in-out     w-[120px]

    bg-red-500
    rounded-tr-[20px]
    rounded-br-[20px]"
            >
              <span className="aws-search-btn_icon">
                <svg
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24px"
                >
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                </svg>
              </span>
            </div>
          </form>
        </div>

        <div className="flex">
          <div className="relative block text-left mr-5">
            <div className="flex items-center h-full">
              <button
                type="button"
                id="language_dropdown"
                className="inline-flex items-center w-full justify-center gap-1 px-1 text-sm font-semibold"
                aria-expanded="true"
                aria-haspopup="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M21.6272 18.4339C22.7523 16.6008 23.3464 14.4914 23.3434 12.3406V12.3402C23.3464 10.1894 22.7522 8.07992 21.6271 6.24684L21.6207 6.23684C20.5768 4.53549 19.1141 3.13025 17.3723 2.15541C15.6305 1.18056 13.6678 0.668679 11.6718 0.668671C9.67572 0.668662 7.71301 1.18053 5.9712 2.15536C4.22938 3.13019 2.76666 4.53541 1.72279 6.23676L1.71631 6.24689C0.593945 8.08122 8.33083e-06 10.1899 0 12.3404C-8.33065e-06 14.4908 0.593912 16.5995 1.71626 18.4338L1.72285 18.4441C2.76672 20.1454 4.22944 21.5506 5.97125 22.5254C7.71305 23.5003 9.67574 24.0121 11.6718 24.0121C13.6678 24.0121 15.6305 23.5002 17.3723 22.5254C19.1141 21.5506 20.5768 20.1453 21.6206 18.444L21.6272 18.4339ZM13.1636 22.0117C12.9412 22.2263 12.6852 22.4031 12.4058 22.5352C12.1764 22.6441 11.9257 22.7007 11.6717 22.7007C11.4178 22.7007 11.167 22.6441 10.9376 22.5352C10.4059 22.2635 9.95065 21.8629 9.61361 21.37C8.92528 20.3753 8.41517 19.2686 8.10609 18.0991C9.29343 18.026 10.482 17.9888 11.6717 17.9875C12.861 17.9875 14.0496 18.0247 15.2376 18.0991C15.0665 18.7004 14.8528 19.2887 14.5981 19.8597C14.2627 20.6626 13.7757 21.3933 13.1636 22.0117ZM1.33425 12.9961H6.04202C6.07267 14.3098 6.21506 15.6184 6.46764 16.9079C5.18072 17.0211 3.89709 17.1767 2.61674 17.3745C1.867 16.0294 1.42873 14.5332 1.33425 12.9961ZM2.61673 7.30628C3.89658 7.50461 5.18066 7.66018 6.46899 7.773C6.21591 9.0624 6.07321 10.371 6.04244 11.6847H1.33425C1.42872 10.1476 1.86699 8.65139 2.61673 7.30628ZM10.1798 2.66903C10.4022 2.45443 10.6582 2.27762 10.9376 2.14561C11.167 2.03663 11.4178 1.98008 11.6717 1.98008C11.9257 1.98008 12.1764 2.03663 12.4058 2.14561C12.9376 2.41724 13.3928 2.81784 13.7298 3.31077C14.4182 4.30542 14.9283 5.4122 15.2373 6.58165C14.05 6.65471 12.8615 6.69193 11.6717 6.69331C10.4825 6.69329 9.29386 6.65607 8.10588 6.58163C8.27696 5.98036 8.49066 5.39203 8.74534 4.82113C9.0807 4.01822 9.56774 3.28751 10.1798 2.66903ZM22.0092 11.6847H17.3014C17.2708 10.371 17.1284 9.06238 16.8758 7.77288C18.1628 7.65964 19.4464 7.5041 20.7267 7.30628C21.4765 8.65139 21.9147 10.1476 22.0092 11.6847ZM7.78663 16.8059C7.53017 15.5513 7.38532 14.2763 7.35379 12.9961H15.9898C15.9586 14.2763 15.814 15.5513 15.5577 16.806C14.2638 16.7211 12.9685 16.6778 11.6717 16.6761C10.3759 16.676 9.08088 16.7193 7.78663 16.8059ZM15.5568 7.87483C15.8133 9.12952 15.9581 10.4044 15.9896 11.6847H7.35365C7.38489 10.4044 7.52947 9.1295 7.7857 7.87478C9.07962 7.95967 10.375 8.00299 11.6717 8.00472C12.9676 8.00472 14.2626 7.96142 15.5568 7.87483ZM17.301 12.9961H22.0092C21.9147 14.5332 21.4765 16.0294 20.7267 17.3745C19.4469 17.1761 18.1628 17.0206 16.8745 16.9078C17.1275 15.6184 17.2702 14.3098 17.301 12.9961ZM19.9404 6.09924C18.8214 6.26069 17.6991 6.38851 16.5733 6.4827C16.371 5.72944 16.1101 4.99316 15.7929 4.2806C15.5034 3.62488 15.139 3.0048 14.7071 2.43272C16.7944 3.07284 18.626 4.35609 19.9404 6.09924ZM4.34586 5.01453C5.54317 3.81608 7.01619 2.92962 8.63578 2.43287C8.61121 2.4647 8.58593 2.49511 8.56171 2.5276C7.72924 3.72598 7.12287 5.06645 6.77249 6.48291C5.64673 6.38756 4.52358 6.25967 3.40305 6.09924C3.69204 5.71645 4.00706 5.35402 4.34586 5.01453ZM3.40304 18.5815C4.52203 18.4201 5.64438 18.2922 6.77008 18.1981C6.9724 18.9513 7.23334 19.6876 7.5505 20.4002C7.84008 21.0559 8.20443 21.676 8.63632 22.2481C6.54909 21.6079 4.71748 20.3247 3.40304 18.5815ZM18.9976 19.6662C17.8003 20.8647 16.3273 21.7512 14.7077 22.2479C14.7322 22.2161 14.7575 22.1857 14.7817 22.1532C15.6142 20.9548 16.2206 19.6143 16.571 18.1979C17.6967 18.2932 18.8199 18.4211 19.9404 18.5815C19.6514 18.9643 19.3364 19.3268 18.9976 19.6662Z"
                    fill="black"
                    data-darkreader-inline-fill=""
                    // style="--darkreader-inline-fill: #ffffff"
                  ></path>
                </svg>
                English (UK)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="10"
                  viewBox="0 0 18 10"
                  fill="none"
                >
                  <path
                    d="M16.3075 1.53925L10.158 7.5436C9.43179 8.2527 8.24339 8.2527 7.51715 7.5436L1.36768 1.53925"
                    stroke="black"
                    strokeWidth="1.90443"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    data-darkreader-inline-stroke=""
                    // style="--darkreader-inline-stroke: #ffffff"
                  ></path>
                </svg>
              </button>
            </div>

            <div
              data-no-translation
              className="hidden absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
              id="language_list"
            >
              <div className="py-1" role="none">
                <a
                  href="https://hdotrade.com/"
                  className="language_item block px-8 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                >
                  English (UK)
                </a>
                <a
                  href="https://hdotrade.com/pt/"
                  className="language_item block px-8 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Português
                </a>
                <a
                  href="https://hdotrade.com/es/"
                  className="language_item block px-8 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Español
                </a>
                <a
                  href="https://hdotrade.com/fr/"
                  className="language_item block px-8 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                >
                  Français
                </a>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              id="miniCartButton"
              className="flex items-center space-x-2 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="33"
                viewBox="0 0 34 33"
                fill="none"
              >
                <path
                  d="M3.70587 2.72339H6.07524C7.54588  2.72339 8.70333 3.98977 8.58077 5.4468L7.45056 19.0094C7.25992 21.2289 9.01651 23.1353 11.2497 23.1353H25.7519C27.7127 23.1353 29.4285 21.5285 29.5782 19.5813L30.3135 9.36851C30.477 7.10808 28.7612 5.26977 26.4872 5.26977H8.90759"
                  stroke="black"
                  strokeWidth="1.40061"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M23.1101 29.9575C24.0501 29.9575 24.8122 29.1954 24.8122 28.2554C24.8122 27.3153 24.0501 26.5532 23.1101 26.5532C22.17 26.5532 21.408 27.3153 21.408 28.2554C21.408 29.1954 22.17 29.9575 23.1101 29.9575Z"
                  stroke="black"
                  strokeWidth="1.40061"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.2165 29.9575C13.1565 29.9575 13.9186 29.1954 13.9186 28.2554C13.9186 27.3153 13.1565 26.5532 12.2165 26.5532C11.2764 26.5532 10.5143 27.3153 10.5143 28.2554C10.5143 29.1954 11.2764 29.9575 12.2165 29.9575Z"
                  stroke="black"
                  strokeWidth="1.40061"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.2377 10.8936H29.5782"
                  stroke="black"
                  strokeWidth="1.40061"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span
                id="cart-count"
                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1"
              >
                0
              </span>

              <span id="#cart-total" className="ml-2 font-semibold">
                <span className="woocommerce-Price-amount amount">
                  <bdi>
                    <span className="woocommerce-Price-currencySymbol">
                      &euro;
                    </span>
                    &nbsp;0,00
                  </bdi>
                </span>
              </span>
            </button>

            <div
              id="miniCartDrawer"
              className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden"
            >
              <div className="absolute right-0 top-0 w-full max-w-md bg-white h-full shadow-lg overflow-y-auto">
                <div className="flex justify-between items-center p-6">
                  <h6 className="text-xl">Shopping cart</h6>
                  <button
                    id="closeMiniCartDrawer"
                    className="text-3xl text-gray-600"
                  >
                    &times;
                  </button>
                </div>

                <div id="miniCartContent" className="woocommerce p-6">
                  <p className="woocommerce-mini-cart__empty-message">
                    No products in the basket.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
