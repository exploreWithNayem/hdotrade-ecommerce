"use client";

import { addToCart } from "@/database/queries";
import { useCart } from "@/providers/CartContext";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import { serverRevalidate } from "@/utils/serverRev";

export default function AddCard({
  productId,
  userId,
  quantity,

}) {
  const { fetchCart } = useCart();

  const handleClick = async () => {
    // Get trackingId from cookies
    let trackingId = Cookies.get("trackingId");

    // Set trackingId for guests if not already present
    if (!trackingId && !userId) {
      trackingId = uuidv4();

      Cookies.set("trackingId", trackingId, { expires: 30 }); // store for 30 days
    }

    if (!userId && !trackingId) {
      toast.error("Please log in first", { position: "bottom-right" });
      return;
    }

    if (quantity <= 0) {
      toast.error("Sorry! This product is out of stock", {
        position: "bottom-right",
      });
      return;
    }

    try {
      const response = await addToCart({
        userId: userId || null,
        trackingId,
        productId,
      });

      if (response?.success) {
        toast.success("Added to cart", { position: "bottom-right" });
        await serverRevalidate();
        await fetchCart();
      } else {
        toast.info(response?.message || "Already added", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong.", { position: "bottom-right" });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="font-bold text-[16px] text-white bg-red-600 rounded-full py-3 px-6 cursor-pointer transition duration-300 hover:bg-red-700 hover:shadow-md flex items-center justify-center"
    >
      <i className="fa-solid fa-bag-shopping mr-2"></i>
      Add To Cart
    </button>
  );
}

