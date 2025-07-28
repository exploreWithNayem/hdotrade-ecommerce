import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";

export default function page() {
  return (
    <>
      <div className="max-w-[1280px] mx-auto px-3">
        <div className="my-20">
          <div className="bg-gradient-to-b from-[#ff5b5f] to-[#e92231] py-20 px-28 rounded-3xl">
            <h1
              className="text-[64px] font-black text-white text-center "
              style={{ textShadow: "0 6px 20px rgba(0, 0, 0, 0.6)" }}
            >
              If you need help, don't hesitate to contact our support team!
            </h1>
          </div>

          {/* Card Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
            {/* Card 1 */}
            <div className="bg-[#f4f3ef] rounded-xl">
              <div className="flex items-center justify-center gap-2.5 py-4 border-b border-gray-300">
                <span className="bg-red-600 p-1.5 rounded-[8px]">
                  <FiPhone className="text-xl text-white" />
                </span>
                <p className="text-xl font-bold">Number</p>
              </div>

              <div className="flex flex-col items-center justify-center py-28 space-y-4 text-left">
                <p className=" text-[16px] font-bold text-red-600">
                  <span className="text-[#767778]">WhatsApp</span> +351
                  927408959
                </p>
                <p className=" text-[16px] font-bold text-red-600">
                  <span className="text-[#767778]">Office number</span> +351
                  275335326
                </p>
                <p className=" text-[16px] font-bold text-red-600">
                  <span className="text-[#767778]">Mob office</span> +351
                  927408959
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#f4f3ef] rounded-xl">
              <div className="flex items-center justify-center gap-2.5 py-4 border-b border-gray-300">
                <span className="bg-red-600 p-1.5 rounded-[8px]">
                  <HiOutlineMail className="text-xl text-white" />
                </span>
                <p className="text-xl font-bold">Email Us</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-[26px] px-[70px]">
                {/* Side 1 */}
                <div className="space-y-4">
                  <p className=" text-[16px] font-bold text-red-600">
                    <span className="text-[#767778]">Import Department -</span>{" "}
                    import@hdotrade.com
                  </p>
                  <p className=" text-[16px] font-bold text-red-600">
                    <span className="text-[#767778]">
                      Sales Department Global -
                    </span>{" "}
                    sales@hdotrade.com
                  </p>
                  <p className=" text-[16px] font-bold text-red-600">
                    <span className="text-[#767778]">
                      Sales Department Europ -
                    </span>{" "}
                    sales@Hdotrade.pt
                  </p>
                </div>
                {/* Side 2 */}
                <div className="space-y-4">
                  <p className=" text-[16px] font-bold text-red-600">
                    <span className="text-[#767778]">
                      Sccountancy Department Global -
                    </span>{" "}
                    accountancy@hdotrade.com
                  </p>
                  <p className=" text-[16px] font-bold text-red-600">
                    <span className="text-[#767778]">
                      Accountancy Department Europ -
                    </span>{" "}
                    accountancy@hdotrade.pt
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
            {/* Side 1 */}
            <div className="bg-[#f4f3ef] rounded-xl">
              <div className="flex items-center justify-center gap-2.5 py-4 border-b border-gray-300">
                <span className="bg-red-600 p-1.5 rounded-[8px]">
                  <IoLocationOutline className="text-xl text-white" />
                </span>
                <p className="text-xl font-bold">
                  Offices, warehouse, physical store
                </p>
              </div>

              <div className="flex flex-col items-center justify-center pt-4 pb-7 space-y-4 text-center">
                <p className="text-[16px] font-bold text-[#767779]">
                  Quinta das rosas lote 3 RC Esq 6200-551 Covilha Portugal
                </p>
                <p className="text-[16px] font-bold text-[#767779]">
                  warehouse - rua de espinho santo peraboa covilha <br />
                  portugalimport@hdotrade.com
                </p>
              </div>
            </div>
            {/* Side 2 */}
            <div className="bg-[#f4f3ef] rounded-xl">
              <div className="flex items-center justify-center gap-2.5 py-4 border-b border-gray-300">
                <span className="bg-red-600 p-1.5 rounded-[8px]">
                  <FiPhone className="text-xl text-white" />
                </span>
                <p className="text-xl font-bold">Office Hours</p>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-[16px] font-bold text-red-600 py-11">
                  Monday - Friday 9 AM - 6 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <img
            className="rounded-2xl"
            src="https://i.ibb.co/4wJNnNfp/616abdd005afd9a4d2249d68deb39bcb4e2a00a2.png"
            alt="Product Image"
          />
        </div>
      </div>
    </>
  );
}
