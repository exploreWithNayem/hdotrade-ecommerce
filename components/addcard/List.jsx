// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useEffect, useState, useCallback } from "react";
// // import RemoveCard from "./RemoveCard";
// import { getProductById, incrementItemQuantity } from "@/database/queries";
// import { serverRevalidate } from "@/utils/serverRev";
// import { toast } from "react-toastify";
// import RemoveCard from "./RemoveCard";
// import placeholder from "@/public/client/banner/placeholder.png"

// export default function List({ product, user, trackingId }) {
//   const [quantity, setQuantity] = useState(product?.quantity);
//   const [totalPrice, setTotalPrice] = useState(product?.discountPrice?.usd);

//   const [isUpdating, setIsUpdating] = useState(false);

//   console.log("single list...", product);


//   function debounce(func, wait) {
//     let timeout;
//     return function (...args) {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func.apply(this, args), wait);
//     };
//   }

//   const handleIncrease = useCallback(
//     debounce(async () => {
//       if (isUpdating) return; // Prevent multiple simultaneous updates
//       setIsUpdating(true);

//       try {
//         const latestProduct = await getProductById(product?.id);

//         if (latestProduct?.quantity > 0) {
//           setQuantity((prevQuantity) => prevQuantity + 1);
//           setTotalPrice(
//             (prevTotalPrice) =>
//               prevTotalPrice + latestProduct.discountPrice?.usd
//           );

//           const plus = true;
//           await incrementItemQuantity(trackingId, user?.id, product?.id, plus);

//           await serverRevalidate();
//         } else {
//           toast.error("Sorry! no more available", {
//             position: "bottom-right",
//           });
//         }
//       } catch (error) {
//         toast.error("Error updating quantity", {
//           position: "bottom-right",
//         });
//         console.error("Error in handleIncrease:", error);
//       } finally {
//         setIsUpdating(false);
//       }
//     }, 200),
//     [isUpdating, product?.id, user?.id]
//   );

//   const handleDecrease = useCallback(
//     debounce(async () => {
//       if (isUpdating) return; // Prevent multiple simultaneous updates
//       setIsUpdating(true);

//       if (quantity > 1) {
//         try {
//           setQuantity((prevQuantity) => prevQuantity - 1);
//           setTotalPrice(
//             (prevTotalPrice) => prevTotalPrice - product.discountPrice?.usd
//           );

//           const plus = false;
//           await incrementItemQuantity(trackingId, user?.id, product?.id, plus);

//           await serverRevalidate();
//         } catch (error) {
//           setQuantity((prevQuantity) => prevQuantity + 1);
//           setTotalPrice(
//             (prevTotalPrice) => prevTotalPrice + product.discountPrice?.usd
//           );
//           toast.error("Error updating quantity", {
//             position: "bottom-right",
//           });
//           console.error("Error in handleDecrease:", error);
//         } finally {
//           setIsUpdating(false);
//         }
//       } else {
//         toast.error("Minimum quantity is 1", {
//           position: "bottom-right",
//         });
//         setIsUpdating(false);
//       }
//     }, 200),
//     [isUpdating, quantity, product?.discountPrice?.usd, user?.id, product?.id]
//   );

//   useEffect(() => {
//     const total = (quantity * product?.discountPrice?.usd).toFixed(2);
//     setTotalPrice(total);
//   }, [quantity]);

//   return (
//     <>
//       <div className="flex flex-col md:flex-row items-start md:items-center justify-between border gap-4 md:gap-6 p-4 border-gray-200 rounded w-full">
//         {/* Image */}
//         <div className="w-full md:w-28 ">
//           <Image
//             src={product?.image || placeholder}
//             width={50}
//             height={50}
//             alt="product image"
//             className="w-full max-w-[80px] md:max-w-none"
//           />
//         </div>

//         {/* Product Info */}
//         <div className="w-full md:w-1/3">
//           <h2 className="text-gray-800 text-lg md:text-xl font-medium uppercase">
//             <Link href={`/shop/${product.id}`}>{product.name}</Link>
//           </h2>
//           <p className="text-gray-500 text-sm mt-1">
//             Availability:
//             {product.quantity >= 0 ? (
//               <span className="text-green-600">
//                 {" "}
//                 In Stock ({product?.quantity})
//               </span>
//             ) : (
//               <span className="text-red-600"> Out of Stock</span>
//             )}
//           </p>
//         </div>

//         {/* Price */}
//         <div className="text-primary text-lg font-semibold w-full md:w-auto mt-2 md:mt-0">
//           ${totalPrice}
//         </div>

//         {/* Quantity Controls */}
//         <div className="flex items-center space-x-3 w-full md:w-auto mt-2 md:mt-0">
//           <button
//             className="px-3 py-1 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
//             onClick={handleDecrease}
//           >
//             -
//           </button>
//           <span className="text-gray-900">{quantity}</span>
//           <button
//             className="px-3 py-1 bg-gray-200 rounded text-gray-700 hover:bg-gray-300"
//             onClick={handleIncrease}
//           >
//             +
//           </button>
//         </div>

//         {/* Remove Button */}
//         <div className="w-full justify-start md:w-auto mt-2 md:mt-0">
//           <RemoveCard productId={product?.id} trackingId={trackingId} />
//         </div>
//       </div>
//     </>
//   );
// }



"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useMemo, useCallback } from "react";
import { getProductById, incrementItemQuantity } from "@/database/queries";
import { serverRevalidate } from "@/utils/serverRev";
import { toast } from "react-toastify";
import RemoveCard from "./RemoveCard";
import placeholder from "@/public/client/banner/placeholder.png";
export default function List({ product, user, trackingId }) {
  const [quantity, setQuantity] = useState(product?.cartQuantity || 1);

 
  const [isUpdating, setIsUpdating] = useState(false);

  // Calculate total price directly from state
  const totalPrice = useMemo(() => {
    return (quantity * (product?.discountPrice?.usd || 0)).toFixed(2);
  }, [quantity, product?.discountPrice?.usd]);



  // Memoized debounce functions
  const debouncedUpdate = useMemo(() => {
    return (func) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), 200);
      };
    };
  }, []);

  const handleQuantityChange = useCallback(
    async (isIncrease) => {
      if (isUpdating) return;
      setIsUpdating(true);

      try {
        const latestProduct = await getProductById(product?.id);
        const newQuantity = isIncrease ? quantity + 1 : quantity - 1;

        // Validate quantity
        if (isIncrease && latestProduct?.quantity <= 0) {
          toast.error("Sorry! no more available", { position: "bottom-right" });
          return;
        }

        if (!isIncrease && newQuantity < 1) {
          toast.error("Minimum quantity is 1", { position: "bottom-right" });
          return;
        }

        // Optimistic update
        setQuantity(newQuantity);

        await incrementItemQuantity(
          trackingId,
          user?.id,
          product?.id,
          isIncrease
        );

        await serverRevalidate();
      } catch (error) {
        // Revert on error
        setQuantity(quantity);
        toast.error("Error updating quantity", { position: "bottom-right" });
        console.error("Error in quantity update:", error);
      } finally {
        setIsUpdating(false);
      }
    },
    [isUpdating, quantity, product?.id, user?.id, trackingId]
  );

  const handleIncrease = useMemo(
    () => debouncedUpdate(() => handleQuantityChange(true)),
    [debouncedUpdate, handleQuantityChange]
  );

  const handleDecrease = useMemo(
    () => debouncedUpdate(() => handleQuantityChange(false)),
    [debouncedUpdate, handleQuantityChange]
  );

  const handleImageError = (e) => {
    e.target.src = "/default-product-image.jpg";
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between border gap-4 md:gap-6 p-4 border-gray-200 rounded w-full">
      {/* Image with error handling */}
      <div className="w-full md:w-28">
        <Image
          src={product?.image || placeholder}
          width={80}
          height={80}
          alt={product?.name || "Product image"}
          className="w-full max-w-[80px] md:max-w-none"
          onError={handleImageError}
        />
      </div>

      {/* Product Info */}
      <div className="w-full md:w-1/3">
        <h2 className="text-gray-800 text-lg md:text-xl font-medium uppercase">
          <Link href={`/shop/${product.id}`}>{product.name}</Link>
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Availability:
          {product.quantity > 0 ? (
            <span className="text-green-600">
              {" "}
              In Stock ({product.quantity})
            </span>
          ) : (
            <span className="text-red-600"> Out of Stock</span>
          )}
        </p>
      </div>

      {/* Price */}
      <div className="text-primary text-lg font-semibold">${totalPrice}</div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        <button
          className="px-3 py-1 bg-gray-200 rounded text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          onClick={handleDecrease}
          disabled={isUpdating || quantity <= 1}
        >
          -
        </button>
        <span className="text-gray-900">{quantity}</span>
        <button
          className="px-3 py-1 bg-gray-200 rounded text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          onClick={handleIncrease}
          disabled={isUpdating || product.quantity <= 0}
        >
          +
        </button>
      </div>

      {/* Remove Button */}
      <div className="w-full justify-start md:w-auto">
        <RemoveCard productId={product?.id} trackingId={trackingId} />
      </div>
    </div>
  );
}
