import Image from "next/image";
import about1 from "@/public/client/about.png";
import mapImg from "@/public/client/map2.png";
import teamImg from "@/public/client/team.jpg";
import OurBrand from "@/components/clients/OurBrand";
export default function About() {
  return (
    <>
      <div className="w-full mx-auto bg-[#f7f7f7]  overflow-hidden">
        {/* Who We Are Section */}
        <div className="w-full py-[50px] bg-[#ffffff]">
          <section className="w-full max-w-[1280px] mx-auto bg-[#ffffff] px-4 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
              {/* Text Content */}
              <div className="space-y-5">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  Who We Are
                </h2>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  With the knowledge we have acquired over the years, our
                  company designs, manufactures and markets spare parts under
                  our own brand HDO TRADE.
                </p>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  This is done to help our customers, as in many cases we see
                  that our customers had difficulty finding the spare parts they
                  need for their machine.
                </p>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  We manufacture our spare parts all over the world and our
                  technical team works hard daily to provide to our customer the
                  best quality at the best price.
                </p>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  All the spare parts that are sold under our brand, HDO TRADE,
                  have been tested by our technical team and by our constantly
                  customers for many years and also passed quality control.
                </p>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  In many cases the parts that sell under our home brand HDO
                  TRADE are manufactured in the same factory as the original
                  parts and the only difference between the parts is the brand
                  and the bag (if any).
                </p>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  Therefore, if you face difficulty finding the parts you need,
                  do not hesitate to contact us about your requirement to know
                  if replacement parts under our brand HDO TRADE are available.
                </p>
                <p className="text-base sm:text-lg font-semibold text-gray-800">
                  HDO GLOBAL TRADE <br />
                </p>
                <p className="text-base sm:text-lg leading-[150%] text-gray-700">
                  EQUAL QUALITY AT THE BEST PRICE
                </p>
              </div>

              {/* Image */}
              <div className="w-full md:max-w-[628px] mx-auto">
                <Image
                  src={about1}
                  alt="HDO Global Trade"
                  className="w-full h-auto md:h-[610px] rounded-lg shadow-md object-cover"
                  width={628}
                  height={610}
                  // fill
                  unoptimized
                />
              </div>
            </div>
          </section>
        </div>

        <div className="w-full py-[50px] bg-[#ffffff] ">
          <section className="w-full max-w-[1280px] mx-auto bg-[#ffffff] px-4 overflow-hidden">
            <div className="mx-auto">
              <Image
                src={teamImg}
                alt="Team"
                width={1280}
                height={600}
                className=" lg:w-[1280px] h-auto rounded-md shadow object-cover"
                priority
                // fill
                unoptimized
              />
            </div>
          </section>
        </div>

        <div className="w-full py-[50px] bg-[#f4f3ef]">
          <section className="w-full  max-w-[1280px] mx-auto bg-[#f4f3ef] px-4 overflow-hidden">
            <div className="mb-8">
              <Image
                src={mapImg}
                alt="World Map"
                className="w-full h-auto lg:h-[859px] rounded-md shadow object-cover"
                width={800}
                height={600}
                unoptimized
              />
            </div>
            <h2 className="text-[48px] sm:text-3xl font-bold mb-6">
              What We Do
            </h2>
            <div className="space-y-4 text-base sm:text-lg leading-[150%] text-gray-700">
              <p>
                With the goal of always pleasing the customer, we will make the
                best effort to ship the order around the world, in a maximum
                time of 24 hours from the moment of the order confirmation and
                payment (as long as the product is available in stock).
              </p>
              <br />
              <p>
                We work with the best couriers companies in Europe to ensure
                that the product reaches you safely and in the shortest time
                that possible.
              </p>
              <p>
                Our import and purchasing department are at your disposal
                anytime and will do all the effort to help you to find the
                product you need, even if you are looking for a product that
                does not exist on our site, just
              </p>
              <p>
                Our customer service is always at your disposal for any question
                and you can Our WhatsApp service is available 24/7 for all our
                customers for technical support and for urgent orders.
              </p>
            </div>
          </section>
        </div>
        <div className="w-full py-[50px] bg-[#e91325]">
          <section className="w-full  max-w-[1280px] mx-auto bg-[#e91325] px-4 overflow-hidden">
            <OurBrand title="Our popular brand" color="#FFFFFF" />
          </section>
        </div>
      </div>
    </>
  );
}
