import { cookies } from "next/headers";
import CardList from "@/components/addcard/CardList";

export default async function CartPage() {
  const cookieStore = await cookies();
  const trackingId = cookieStore.get("trackingId")?.value;

  let products = [];

  if (trackingId) {
    try {
      const query = new URLSearchParams({ trackingId }).toString();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/get-cart-list?${query}`,
        {
          cache: "no-store",
        }
      );

      if (res.ok) {
        products = await res.json();
      } else {
        console.error("Failed to fetch cart items:", res.status);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }


  return (
    <div>
      <CardList products={products} trackingId={trackingId} />
    </div>
  );
}
