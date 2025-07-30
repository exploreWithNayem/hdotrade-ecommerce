import Image from "next/image";
import banner1 from "@/public/client/brand1.png";
import banner2 from "@/public/client/brand2.png";
import banner3 from "@/public/client/brand3.png";
import banner4 from "@/public/client/brand4.png";

export default function OurBrand({ title = " Some of Our brand", color = "#1A1D21" }) {

  console.log('color...', color)
  return (
    <div className="max-w-[1280px] mx-auto my-[70px] px-4">
      <h1
        style={{ color }}
        className={`text-center font-[700] text-[32px] md:text-[48px] mb-8 text-[${color}]`}
      >
        {title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[banner1, banner2, banner3, banner4].map((banner, idx) => (
          <div
            key={idx}
            className="relative w-full aspect-[16/9] border border-[#82818180] rounded-xl"
          >
            <Image
              src={banner}
              alt={`Brand ${idx + 1}`}
              fill
              className="object-cover rounded-xl"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
