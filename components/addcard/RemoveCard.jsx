"use client";

import { removeCardList } from "@/database/queries";
import { serverRevalidate } from "@/utils/serverRev";
import { toast } from "react-toastify";

export default function RemoveCard({ user, productId }) {
  const handleClick = async () => {
    await removeCardList(user?.id, productId);
    toast.info("Removed from wish list", {
      position: "bottom-right",
    });
    await serverRevalidate();
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="text-gray-600 cursor-pointer hover:text-primary"
      >
        <i className="fa-solid fa-trash"></i>
      </div>
    </>
  );
}
