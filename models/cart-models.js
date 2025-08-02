import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
  trackingId: {
    type: String,
    required: true,
    unique: true, // ensures each guest/cart has a unique ID
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: false, // guest users won’t have a user ID
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      size: {
        type: String,
        required: false,
      },
      color: {
        type: String,
        required: false,
      },
    },
  ],
  isOrdered: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const cartModel =
  mongoose.models.carts || mongoose.model("carts", cartSchema);
