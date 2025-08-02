import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  image: {
    required: false,
    type: [String], // More specific than just Array
  },
  price: {
    required: true,
    type: Number,
  },
  discount_price: {
    required: false,
    type: Number,
  },
  reviewsNumber: {
    required: false,
    type: Number,
  },
  ratings: {
    required: false,
    type: Number,
  },

  // Replacing "brand" with manufacturerId (linked to manufacturers collection)
  manufacturerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "manufacturers",
    required: false,
  },

  // Replacing "category" with categoryId (linked to categories collection)
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: false,
  },

  description: {
    required: true,
    type: String,
  },
  sizes: {
    required: false,
    type: [String],
  },
  colors: {
    required: false,
    type: [String],
  },
  soldCounts: {
    required: false,
    type: Number,
    default: 0,
  },
  published: {
    required: false,
    type: Date,
    default: Date.now,
  },
  quantity: {
    required: true,
    type: Number,
  },

  details: {
    material: { type: String },
    dimensions: { type: String },
    weight: { type: String },
  },
});

export const productModel =
  mongoose.models.products ?? mongoose.model("products", productSchema);
