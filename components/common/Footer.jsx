import worldDisImg from "@/public/client/worldDis.png";
import payment1 from "@/public/client/payment1.png";

import payment2 from "@/public/client/payment2.png";
import payment3 from "@/public/client/payment3.png";
import payment4 from "@/public/client/payment4.png";
import payment5 from "@/public/client/payment5.png";
import payment6 from "@/public/client/payment6.png";
import logo from "@/public/client/logo.png";
import Image from "next/image";
import {
  FbIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/public/icons/icons";
export default function Footer() {
  return (
    <footer className="bg-red-600 text-white">
      {/* Top Section */}
      <div className="bg-[#061E3E] py-10">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-sm">
          {/* Contact and Logo */}
          <div>
            <Image
              src={logo}
              alt="HDO Logo"
              width={90}
              height={90}
              className="mb-4"
            />

            <p className="text-[14px]">
              {" "}
              Quinta das rosas lote 3 R/C Esq, 6200-551 Covilhã, Portugal
            </p>
            <p className="mt-2 text-[16px]">Follow us</p>
            <div className="flex space-x-4 mt-2">
              <a href="#">
                <FbIcon />
              </a>
              <a href="#">
                <InstagramIcon />
              </a>
              <a href="#">
                <LinkedInIcon />
              </a>
              <a href="#">
                <XIcon />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-2">Find Product</h4>
            <ul className="space-y-1">
              <li>Dishwasher spare parts</li>
              <li>Vegetable cutter spare parts</li>
              <li>Juicer spare parts</li>
              <li>Hand mixer spare parts</li>
              <li>Food processor / bowl cutter spare parts</li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-semibold mb-2">Get help</h4>
            <ul className="space-y-1">
              <li>About us</li>
              <li>Privacy Policy</li>
              <li>Refunds & Returns</li>
              <li>Terms Conditions</li>
              <li>Online Complaints Book</li>
            </ul>
          </div>

          {/* Shipping & Button */}
          <div className="flex justify-center md:justify-start items-start">
            <Image
              src={worldDisImg}
              alt="Worldwide Shipping"
              width={120}
              height={150}
              className="h-auto w-auto"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#e91325] py-4 text-sm">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div>Copyright © HDOGLOBALTRADE · 2020</div>
          <div className="">
            <span className="text-start sm:text-center">We accept</span>
            <div className="flex  items-center py-4 space-x-2">
              <Image
                src={payment1}
                alt="Visa"
                className="h-5"
                width={50}
                height={60}
              />
              <Image
                src={payment2}
                alt="Visa"
                className="h-5"
                width={50}
                height={60}
              />
              <Image
                src={payment3}
                alt="Visa"
                className="h-5"
                width={50}
                height={60}
              />
              <Image
                src={payment4}
                alt="Visa"
                className="h-5"
                width={50}
                height={60}
              />
              <Image
                src={payment5}
                alt="Visa"
                className="h-5"
                width={50}
                height={60}
              />
              <Image
                src={payment6}
                alt="Visa"
                className="h-5"
                width={50}
                height={60}
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
