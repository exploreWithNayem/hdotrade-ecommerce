import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
  name: {
    required: true,
    type: String
  },
  image: {
    required: false,
    type: Array
  },
  price: {
    required: true,
    type: Number
  },
  discount_price: {
    required: false,
    type: Number
  },
  reviewsNumber: {
    required: false,
    type: Number
  },
  ratings: {
    required: false,
    type: Number
  },
  brand: {
    required: false,
    type: String
  },
  category: {
    required: false,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  sizes: {
    required: false,
    type: Array
  },
  soldCounts: {
    required: false,
    type: Number
  },

  pubshied: {
    required: false,
    type: String
  },
  quantity: {
    required: true,
    type: Number
  },
  


});



export const productModel = mongoose.models.products ?? mongoose.model("products", productSchema);