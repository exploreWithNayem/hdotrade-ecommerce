"use client";

import { AddToCard, removeWishList } from "@/database/queries";
import { serverRevalidate } from "@/utils/serverRev";
import { toast } from "react-toastify";

export default function AddCard({
  lan,
  productId,
  userId,
  quantity,
  detail,
  fromWish,
}) {
  const handleClick = async () => {
    if (userId) {
      if (quantity > 0) {
        const mess = await AddToCard(userId, productId);
        if (mess) {
          toast.success("Added to the card", {
            position: "bottom-right",
          });
          if (fromWish) {
            await removeWishList(userId, productId);
          }
          await serverRevalidate();
        } else {
          toast.info(" Already added", {
            position: "bottom-right",
          });
        }
      } else {
        toast.error("Sorry! this product is out of stock", {
          position: "bottom-right",
        });
      }
    } else {
      toast.error("Login please", {
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      {detail ? (
        <button
          onClick={handleClick}
          className="font-bold text-[16px] text-white bg-red-600 rounded-full py-3 cursor-pointer transition-all duration-300 hover:bg-red-700 hover:shadow-md"
        >
          <i className="fa-solid fa-bag-shopping mr-2"></i> {lan}
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="font-bold text-[16px] text-white bg-red-600 rounded-full py-3 cursor-pointer transition-all duration-300 hover:bg-red-700 hover:shadow-md"
        >
          Add To Cart
        </button>
      )}
    </>
  );
}
