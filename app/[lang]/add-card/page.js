"use client";
import CardList from "@/components/addcard/CardList";
import { useEffect, useState } from "react";
// import CardList from "./CardList";


export default function ClientCartWrapper({ langCode }) {
  const [products, setProducts] = useState([]);

  console.log("products....", products);

  useEffect(() => {
    const fetchCart = async () => {
      const trackingId = localStorage.getItem("trackingId");
      const query = new URLSearchParams();

      if (trackingId) {
        query.append("trackingId", trackingId);
      }

      try {
        const res = await fetch(`/api/get-cart-list?${query.toString()}`);
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };

    fetchCart();
  }, []);

  return (
    <>
    
      <CardList langCode={langCode} products={products} />{" "}
    </>
  );
}

// import { auth } from "@/auth";
// import CardList from "@/components/addcard/CardList";
// import { getCardListData, getUserByMail } from "@/database/queries";
// import { redirect } from "next/navigation";

// export default async function page(props) {
//   const params = await props.params;

//   const {
//     lang
//   } = params;

//   // const session = await auth();
//   // if (!session) {
//   //   redirect(`/${lang}/login`);
//   // }

//   // const user = await getUserByMail(session?.user?.email);

//   // const listedProducts = await getCardListData(user?.id);

//     const userId = null;
//     const trackingId = localStorage.getItem("trackingId");

//     const query = new URLSearchParams();

//     if (userId) query.append("userId", userId);
//     if (!userId && trackingId) query.append("trackingId", trackingId);

//     const res = await fetch(`/api/get-cart-list?${query.toString()}`);
//     const listedProducts = await res.json();

//     console.log("cart list data....", listedProducts);

//   return (
//     <>
//       <div className="container gap-6 pt-4 pb-16">
//         <div className="mx-auto space-y-4 max-w-6xl">
//           {/* <CardList /> */}

//           <CardList
//             // userId={user?.id}
//             langCode={lang}
//             products={listedProducts}
//           />
//         </div>
//       </div>
//     </>
//   );
// }
