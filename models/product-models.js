
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    image: {
      type: String,
      required: false,
    },
    price: {
      usd: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"],
      },
      eur: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"],
      },
    },
    discountPrice: {
      usd: {
        type: Number,
        required: false,
        min: [0, "Discount price cannot be negative"],
        validate: {
          validator: function (value) {
            return !value || value < this.price.usd;
          },
          message: "Discount price must be lower than regular price",
        },
      },
      eur: {
        type: Number,
        required: false,
        min: [0, "Discount price cannot be negative"],
        validate: {
          validator: function (value) {
            return !value || value < this.price.eur;
          },
          message: "Discount price must be lower than regular price",
        },
      },
    },
    reviewsNumber: {
      type: Number,
      required: false,
      default: 0,
      min: [0, "Reviews number cannot be negative"],
    },
    ratings: {
      type: Number,
      required: false,
      default: 0,
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot be more than 5"],
    },
    manufacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Manufacturer",
      required: false,
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false,
      index: true,
    },
    description: {
      required: false,
      type: String,
    },

    soldCount: {
      type: Number,
      required: false,
      default: 0,
      min: [0, "Sold count cannot be negative"],
    },
    published: {
      type: Date,
      required: false,
      default: Date.now,
      immutable: true,
    },
    quantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: [0, "Quantity cannot be negative"],
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
    features: {
      type: [String],
      required: false,
      default: [],
    },
    sku: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
      trim: true,
      uppercase: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
productSchema.index({ name: "text", description: "text" });
productSchema.index({ price: 1 });
productSchema.index({ quantity: 1 });

// Virtual property
productSchema.virtual("inStock").get(function () {
  return this.quantity > 0;
});

// Pre-save validation
productSchema.pre("save", function (next) {
  if (this.discountPrice?.usd && this.discountPrice.usd >= this.price.usd) {
    throw new Error("USD discount price must be lower than regular price");
  }
  if (this.discountPrice?.eur && this.discountPrice.eur >= this.price.eur) {
    throw new Error("EUR discount price must be lower than regular price");
  }
  next();
});

export const productModel =
  mongoose.models.products || mongoose.model("products", productSchema);
