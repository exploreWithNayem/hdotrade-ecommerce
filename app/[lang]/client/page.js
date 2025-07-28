import React from "react";
import NavC from "./components/NavC";
import NavC2 from "./components/NavC2";
import SearchC from "./components/SearchC";
import Image from "next/image";
import sectionIm1 from "@/public/client/section1.png";
import ProductC from "./components/ProductC";
export default function page() {
  return (
    <div>
      <NavC />
      <NavC2 />
      <SearchC />

      <Image
        src={sectionIm1}
        alt=""
        className="mx-auto"
        width={1200}
        height={200}
      />

      <ProductC />
    </div>
  );
}
