import banner1 from "@/public/client/section2.webp";
import Image from "next/image";

export default function Banner2() {
  return (
    <div className="relative w-[1280px] h-[546px] mx-auto my-[50px]">
      <Image
        src={banner1}
        alt="banner2"
        fill
        className="object-cover rounded-xl"
        priority
      />
    </div>
  );
}
