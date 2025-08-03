"use client";

import { addToCart, removeWishList } from "@/database/queries";
import { useCart } from "@/providers/CartContext";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

export default function AddCard({
  lan,
  productId,
  userId,
  quantity,
  detail,
  fromWish,
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

        if (fromWish && userId) {
          await removeWishList(userId, productId);
        }

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
      {detail ? lan : "Add To Cart"}
    </button>
  );
}

// "use client";

// import { addToCart, removeWishList } from "@/database/queries";
// import { useCart } from "@/providers/CartContext";
// // import { serverRevalidate } from "@/utils/serverRev";
// import { toast } from "react-toastify";
// import { v4 as uuidv4 } from "uuid";

// export default function AddCard({
//   lan,
//   productId,
//   userId, // could be null for guests
//   quantity,
//   detail,
//   fromWish,
// }) {

//   const { fetchCart } = useCart();
//   const handleClick = async () => {
//     let trackingId = localStorage.getItem("trackingId");

//     if (!trackingId && !userId) {
//       // generate a guest tracking ID
//       trackingId = uuidv4();
//       localStorage.setItem("trackingId", trackingId);
//     }

//     if (userId || trackingId) {
//       if (quantity > 0) {
//         try {
//           const mess = await addToCart({
//             userId: userId || null,
//             trackingId: trackingId || null,
//             productId,
//           });

//           if (mess?.success) {

//             toast.success("Added to cart", {
//               position: "bottom-right",
//             });

//             if (fromWish && userId) {
//               await removeWishList(userId, productId);
//             }

//             // await serverRevalidate();
//               await fetchCart();
//           } else {
//             toast.info(mess?.message || "Already added", {
//               position: "bottom-right",
//             });
//           }
//         } catch (err) {
//           toast.error("Something went wrong.", {
//             position: "bottom-right",
//           });
//         }
//       } else {
//         toast.error("Sorry! this product is out of stock", {
//           position: "bottom-right",
//         });
//       }
//     } else {
//       toast.error("Login please", {
//         position: "bottom-right",
//       });
//     }
//   };

//   return (
//     <>
//       <button
//         onClick={handleClick}
//         className="font-bold text-[16px] text-white bg-red-600 rounded-full py-3 cursor-pointer transition-all duration-300 hover:bg-red-700 hover:shadow-md"
//       >
//         <i className="fa-solid fa-bag-shopping mr-2"></i>{" "}
//         {detail ? lan : "Add To Cart"}
//       </button>
//     </>
//   );
// }

// "use client";

// import { addToCart, removeWishList } from "@/database/queries";
// import { serverRevalidate } from "@/utils/serverRev";
// import { toast } from "react-toastify";

// export default function AddCard({
//   lan,
//   productId,
//   userId,
//   quantity,
//   detail,
//   fromWish,
// }) {
//   const handleClick = async () => {
//     if (userId) {
//       if (quantity > 0) {
//         const mess = await addToCart(userId, productId);
//         if (mess) {
//           toast.success("Added to the card", {
//             position: "bottom-right",
//           });
//           if (fromWish) {
//             await removeWishList(userId, productId);
//           }
//           await serverRevalidate();
//         } else {
//           toast.info(" Already added", {
//             position: "bottom-right",
//           });
//         }
//       } else {
//         toast.error("Sorry! this product is out of stock", {
//           position: "bottom-right",
//         });
//       }
//     } else {
//       toast.error("Login please", {
//         position: "bottom-right",
//       });
//     }
//   };

//   return (
//     <>
//       {detail ? (
//         <button
//           onClick={handleClick}
//           className="font-bold text-[16px] text-white bg-red-600 rounded-full py-3 cursor-pointer transition-all duration-300 hover:bg-red-700 hover:shadow-md"
//         >
//           <i className="fa-solid fa-bag-shopping mr-2"></i> {lan}
//         </button>
//       ) : (
//         <button
//           onClick={handleClick}
//           className="font-bold text-[16px] text-white bg-red-600 rounded-full py-3 cursor-pointer transition-all duration-300 hover:bg-red-700 hover:shadow-md"
//         >
//           Add To Cart
//         </button>
//       )}
//     </>
//   );
// }
