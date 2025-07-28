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
          className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
        >
          <i className="fa-solid fa-bag-shopping"></i> {lan}
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
        >
          {lan}
        </button>
      )}
    </>
  );
}
