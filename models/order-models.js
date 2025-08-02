import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    trackingCode: {
      type: String,
      required: true,
      unique: true,
    },

    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],

    totalAmount: Number,
    finalAmount: Number,

    shippingAddress: {
      fullName: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      city: String,
      zip: String,
      country: String,
    },

    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "card", "stripe", "sslcommerz", "manual"],
      default: "cod",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const orderModel =
  mongoose.models.orders ?? mongoose.model("orders", orderSchema);
