import Image from "next/image";
import about1 from "@/public/client/logo.png";
import mapImg from "@/public/client/map.jpg";
import teamImg from "@/public/client/team.jpg";
import PopularBrands from "@/components/clients/Brand";
export default function About() {
  return (
    <>
      <div className="bg-white text-gray-800 font-sans">
        {/* Who We Are Section */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Text Content */}
            <div className="md:col-span-2 space-y-4">
              <p>
                With the knowledge we have gained over the years, our company
                helps customers to reduce their costs without sacrificing
                quality.
              </p>
              <p>
                We deliver the best price and quality with our HDO GLOBAL TRADE
                trademark brand based on our expertise and strong supply
                network.
              </p>
              <p>
                HDO Global Trade, which works with the most reliable companies
                in Europe and Turkey, also helps to supply the most suitable
                products from Turkey according to the needs of the customer.
              </p>
              <p>
                As a result of our experience and the self-sacrificing work of
                our employees, we try to help all our customers with the highest
                quality and minimum time.
              </p>
              <p>
                <strong>HDO GLOBAL TRADE</strong>
                <br />
                EQUAL QUALITY AT THE BEST PRICE
              </p>
            </div>

            {/* Logo/Image */}
            <div className="flex justify-center items-start">
              <Image
                src={about1}
                alt="HDO Global Trade"
                className="w-full max-w-xs rounded-lg shadow-md"
                width={400}
                height={400}
              />
            </div>
          </div>
        </section>

        {/* Team Image Section */}
        <section className="max-w-6xl mx-auto px-4 py-8">
          <Image
            src={teamImg}
            alt="World Map"
            width={800}
            height={600}
            className="w-full rounded-md shadow"
          />
        </section>

        {/* Map + What We Do */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-8">
            <Image
              src={mapImg}
              alt="World Map"
              width={800}
              height={600}
              className="w-full rounded-md shadow"
            />
          </div>
          <h2 className="text-3xl font-bold mb-6">What we do</h2>
          <div className="space-y-4">
            <p>
              With the goal of always pleasing the customer, we will make the
              best effort to ship the order around the world in a maximum time
              of 24 hours from the moment of the order confirmation and payment
              (as long as the product is available in stock).
            </p>
            <p>
              We work with the best courier companies in Europe to ensure that
              the product reaches you safely and in the shortest time possible.
            </p>
            <p>
              Our longest and prestigious shipment is an urgent lifesaving
              medical one and we still do the efforts to help you to find the
              product you need, even if you are looking for something you can’t
              find anywhere else!
            </p>
            <p>
              Our customer assistance and after-sales support is key practice
              and you can use Our WhatsApp to ask us available 24/7 for all our
              customers for technical support and urgent order support.
            </p>
          </div>
        </section>
      </div>
      <PopularBrands />
    </>
  );
}
