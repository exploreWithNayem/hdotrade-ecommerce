import Image from "next/image";
import banner1 from "@/public/client/imageBanner1.png";
import banner2 from "@/public/client/imageBanner2.png";
import banner3 from "@/public/client/feature.jpg";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function ImageBanners() {
  return (
    <section className="w-[1276px]  mx-auto px-4 py-10 space-y-6">
      {/* Banner 1 - with both buttons bottom-left */}
      <div className="w-full h-[692px] relative overflow-hidden rounded-xl shadow">
        <Image
          src={banner3}
          alt="Banner 1"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 1000px"
          priority
        />
        {/* Both buttons bottom-left */}
        <div className="absolute bottom-6 left-6 space-y-3">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/your-number"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full font-medium hover:bg-green-700 transition"
          >
            <FaWhatsapp className="text-lg" />
            Send Message on WhatsApp
          </a>

          {/* Email Button */}
          <a
            href="mailto:your@email.com"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition"
          >
            <FaEnvelope className="text-lg" />
            Send Mail
          </a>
        </div>
      </div>

      {/* Banner 2 and 3 - plain */}
      {[banner1, banner2].map((img, idx) => (
        <div
          key={idx}
          className="w-full h-[555px] relative overflow-hidden rounded-xl shadow"
        >
          <Image
            src={img}
            alt={`Banner ${idx + 2}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1000px"
          />
        </div>
      ))}
    </section>
  );
}
