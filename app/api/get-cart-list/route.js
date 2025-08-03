import { getProductById } from "@/database/queries";
import { cartModel } from "@/models/cart-models";
import { dbConnect } from "@/service/mongo";

import { NextResponse } from "next/server";

export const GET = async (request) => {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const trackingId = searchParams.get("trackingId");



  try {
    let cart = null;

    if (userId) {
      cart = await cartModel.findOne({ userId }).lean();
    }

    if (!cart && trackingId) {
      cart = await cartModel.findOne({ trackingId }).lean();
    }

    if (!cart) {
      return NextResponse.json([], { status: 200 });
    }

    const items = await Promise.all(
      (cart.items || []).map(async (item) => {
        const product = await getProductById(item.productId);
        return {
          ...product,
          cartQuantity: item.quantity,
          size: item.size,
          color: item.color,
        };
      })
    );

    return NextResponse.json(items, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
