import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";


const orderSchema = new Schema({
  
  cartInfo: {
    required: false,
    type: Array,
  },
  totalPrice: {
    required: true,
    type: Number,
  },

  userId: {
    required: true,
    type: ObjectId,
  },
  name: {
    required: true,
    type: String,
  },

  company: {
    required: false,
    type: String,
  },
  region: {
    required: false,
    type: String,
  },
  address: {
    required: true,
    type: String,
  },
  city: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: String,
  },
  email: {
    required: false,
    type: String,
  },
  pdfFile: {
    required: false,
    type: String,
  },
  orderedAt: {
    required: false,
    type: Date,
    default: Date.now
  },
});

export const orderModel =
  mongoose.models.orders ?? mongoose.model("orders", orderSchema);
