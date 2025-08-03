"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId"); // still from localStorage if logged in

      // Get or create trackingId from cookie
      let trackingId = Cookies.get("trackingId");
      if (!userId && !trackingId) {
        trackingId = crypto.randomUUID();
        Cookies.set("trackingId", trackingId, { expires: 30 });
      }

      const params = new URLSearchParams();
      if (userId) params.append("userId", userId);
      else if (trackingId) params.append("trackingId", trackingId);

      const res = await fetch(`/api/get-cart?${params.toString()}`);
      const data = await res.json();

      if (res.ok) setCart(data);
      else console.error("Cart fetch error:", data.error);
    } catch (err) {
      console.error("Fetch cart failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart, loading }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
