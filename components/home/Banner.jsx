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
    <div className="w-[100%] mx-auto px-4">
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
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow">
              {/* Background image */}
              <Image
                src={slide.image}
                alt={`Slide ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1000px"
                priority={idx === 0}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />

              {/* Text Block - from center to slight right */}
              <div className="absolute inset-0 z-20 flex items-center justify-end">
                <div className="mr-[18%] max-w-lg text-white text-right">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight text-left">
                    {slide.title}
                  </h2>
                  <div className="flex gap-4 justify-start flex-wrap">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition">
                      Shop Now
                    </button>
                    <button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-md transition">
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
