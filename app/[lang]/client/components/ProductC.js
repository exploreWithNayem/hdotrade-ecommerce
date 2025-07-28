import product1 from "@/public/client/product1.webp";
import Image from "next/image";
export default function ProductC() {
  return (
    <div className="container py-16">
      <h4 className="lg:text-3xl text-2xl secondary_color flex items-center mb-5">
        <span className="title_tag"></span> Juicer spare parts
      </h4>

      <div className="swiper products_slider mt-12">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="flex flex-col w-full justify-between border border-[#b6b6b6] rounded-[20px] relative min-h-[290px] pb-5 max-w-[350px] h-[320px] mx-auto shop">
              <a href="https://hdotrade.com/product/santos-65-cold-press-juicer-nutrisantos-container-cap-bouchon-conteneur/">
                <Image
                  src={product1}
                  alt="imag"
                  className="px-5 py-2.5 w-max max-h-[160px] mx-auto"
                  width={250}
                  height={250}
                />
              </a>
              <div className="px-[15px] transition duration-300 block">
                <h4 className="w-full overflow-hidden line-clamp-2 text-[18px] font-bold leading-[26px] text-[var(--secondary)] mt-4 text-center">
                  SANTOS 65 COLD PRESS JUICER NUTRISANTOS CONTAINER CAP /
                  BOUCHON CONTENEUR
                </h4>

                <div className="flex w-max mx-auto mt-2 mb-4"></div>
                <a
                  href="https://hdotrade.com/product/santos-65-cold-press-juicer-nutrisantos-container-cap-bouchon-conteneur/"
                  className="btn   text-[16px] max-w-[160px] text-center pt-3 pr-[33px] pb-3 pl-[15px] relative block w-[210px] rounded-[20px] py-3.5 px-[34px] font-bold bg-red-500 border border-neutral-700 text-white transition duration-300 mx-auto"
                >
                  Shop Now
                  <button
                    type="button"
                 
                    className="btn_shop_icon" // You can replace this with Tailwind classes if you want
                    aria-label="Add to cart"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M1.43408 1.4342H2.68195C3.45648 1.4342 4.06607 2.10117 4.00153 2.86853L3.40628 10.0115C3.30588 11.1804 4.23101 12.1845 5.40716 12.1845H13.0449C14.0777 12.1845 14.9813 11.3382 15.0602 10.3127L15.4474 4.93396C15.5335 3.74347 14.6299 2.77529 13.4322 2.77529H4.17365"
                        stroke="#003D77"
                        strokeWidth="1.47531"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.6538 15.7775C12.1489 15.7775 12.5502 15.3762 12.5502 14.8811C12.5502 14.386 12.1489 13.9846 11.6538 13.9846C11.1587 13.9846 10.7573 14.386 10.7573 14.8811C10.7573 15.3762 11.1587 15.7775 11.6538 15.7775Z"
                        stroke="#003D77"
                        strokeWidth="1.47531"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.91647 15.7775C6.41157 15.7775 6.81293 15.3762 6.81293 14.8811C6.81293 14.386 6.41157 13.9846 5.91647 13.9846C5.42138 13.9846 5.02002 14.386 5.02002 14.8811C5.02002 15.3762 5.42138 15.7775 5.91647 15.7775Z"
                        stroke="#003D77"
                        strokeWidth="1.47531"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.45459 5.73718H15.0605"
                        stroke="#003D77"
                        strokeWidth="1.47531"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </a>
              </div>

              <button
                type="button"
                className="  px-4 py-2 text-gray-700 bg-gray-200 rounded  hover:bg-gray-300 transition duration-300absolute top-[20px] right-[20px] w-[33px] h-[33px] p-0 flex items-center justify-center"
                product-title="SANTOS 65 COLD PRESS JUICER NUTRISANTOS CONTAINER CAP / BOUCHON CONTENEUR"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="16"
                  viewBox="0 0 18 16"
                  fill="none"
                >
                  <path
                    d="M5 1C2.7912 1 1 2.73964 1 4.88594C1 6.61852 1.7 10.7305 8.5904 14.8873C8.71383 14.961 8.85552 15 9 15C9.14448 15 9.28617 14.961 9.4096 14.8873C16.3 10.7305 17 6.61852 17 4.88594C17 2.73964 15.2088 1 13 1C10.7912 1 9 3.35511 9 3.35511C9 3.35511 7.2088 1 5 1Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="products_slider_pagi flex justify-center mt-4 mx-auto"></div>
      </div>
    </div>
  );
}
