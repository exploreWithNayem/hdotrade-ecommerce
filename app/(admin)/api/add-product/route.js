import { NextResponse } from "next/server";
import { dbConnect } from "@/service/mongo";
import { productModel } from "@/models/product-models";

export const POST = async (request) => {
  await dbConnect();

  try {
    // Validate content type
    const contentType = request.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return NextResponse.json(
        { message: "Content-Type must be application/json" },
        { status: 415 }
      );
    }

    const data = await request.json();

    // Required field validation
    const requiredFields = ["name", "price", "description", "quantity"];
    const missingFields = requiredFields.filter((field) => {
      if (field === "price") return !data.priceUSD || !data.priceEUR;
      return !data[field];
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Numeric field validation
    const numericFields = [
      "price.usd",
      "price.eur",
      "discount_price?.usd",
      "discount_price?.eur",
      "reviewsNumber",
      "ratings",
      "quantity",
    ];

    for (const field of numericFields) {
      const value = field.includes("?.")
        ? field.split("?.")[0] in data
          ? data[field.split("?.")[0]][field.split("?.")[1]]
          : undefined
        : data[field];

      if (value !== undefined && isNaN(Number(value))) {
        return NextResponse.json(
          { message: `${field} must be a valid number` },
          { status: 400 }
        );
      }
    }

    // Prepare product data with proper type conversion
    const productData = {
      name: data.name.trim(),
      image: data.image,
      price: {
        usd: parseFloat(data.priceUSD),
        eur: parseFloat(data.priceEUR),
      },
      discountPrice:
        data.discountUSD || data.discountEUR
          ? {
              usd: data.discountUSD ? parseFloat(data.discountUSD) : undefined,
              eur: data.discountEUR ? parseFloat(data.discountEUR) : undefined,
            }
          : undefined,
      reviewsNumber: data.reviewsNumber ? parseInt(data.reviewsNumber) : 0,
      ratings: data.ratings ? parseFloat(data.ratings) : undefined,
      manufacturerId: data.manufacturerId || undefined,
      categoryId: data.categoryId || undefined,
      description: data.description.trim(),
      isActive: data?.visibility === "public" ? true : false,
      quantity: parseInt(data.quantity),
      ...(data.sku && { sku: data.sku.trim().toUpperCase() }),
      ...(data.features && {
        features: Array.isArray(data.features) ? data.features : [],
      }),
    };

    // Validate discount price is less than regular price
    if (
      productData.discountPrice?.usd &&
      productData.discountPrice.usd >= productData.price.usd
    ) {
      return NextResponse.json(
        { message: "Discount price (USD) must be lower than regular price" },
        { status: 400 }
      );
    }

    if (
      !productData.description ||
      productData.description.trim().length < 10
    ) {
      return NextResponse.json(
        {
          message: "Description must be at least 10 characters long",
          error: "DESCRIPTION_TOO_SHORT",
          minLength: 10,
          currentLength: productData.description?.trim().length || 0,
        },
        { status: 400 }
      );
    }

    if (
      productData.discountPrice?.eur &&
      productData.discountPrice.eur >= productData.price.eur
    ) {
      return NextResponse.json(
        { message: "Discount price (EUR) must be lower than regular price" },
        { status: 400 }
      );
    }

    // Create product
    const newProduct = await productModel.create(productData);

    return NextResponse.json(
      {
        message: "Product created successfully",
        productId: newProduct._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product creation error:", error);

    // Handle duplicate key errors (like unique SKU)
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "Product with this SKU already exists" },
        { status: 409 }
      );
    }

    // Handle validation errors from Mongoose
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
