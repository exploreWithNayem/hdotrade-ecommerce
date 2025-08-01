"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";

import banner1 from "@/public/client/section1.png";
import banner2 from "@/public/client/hero2.jpg";

const slides = [
  {
    image: banner1,
    title: (
      <>
        All Types of <br /> Commercial Faucets
      </>
    ),
  },
  {
    image: banner2,
    title: (
      <>
        ALL THE SPARE PARTS & <br /> ACCESSORIES FOR DYNAMIC MIXER
      </>
    ),
  },
  // Add more slides with different titles as needed
];

export default function Banner() {
  return (
    <div className="w-full max-w-[1260px] mx-auto px-4">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={800}
        loop
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[429px] rounded-xl overflow-hidden shadow">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={`Slide ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1000px"
                priority={idx === 0}
              />

              {/* Optional Dark Overlay */}
              <div className="absolute inset-0 bg-opacity-40 sm:bg-opacity-50 z-10" />

              {/* Text + Buttons - hidden on mobile */}
              <div className="absolute inset-0 z-20 items-center justify-end hidden sm:flex">
                <div className="mr-[18%] max-w-lg text-white text-right">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h2>
                  <div className="flex gap-4 justify-end">
                    <button className="bg-white hover:bg-blue-700 hover:text-white text-blue-600 px-6 py-2 rounded-md transition">
                      Shop Now
                    </button>
                    <button className="bg-transparent text-white border border-white hover:bg-gray-100 hover:text-blue-700 px-6 py-2 rounded-md transition">
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
