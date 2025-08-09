"use server";
import fs from "fs";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";

import mongoose from "mongoose";
import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/utils/data-util";
import { productModel } from "@/models/product-models";
import { cartModel } from "@/models/cart-models";
import { auth } from "@/auth";
import { orderModel } from "@/models/order-models";
import { dbConnect } from "@/service/mongo";
import { manufacturerModel } from "@/models/manufacture-model";
import { categoryModel } from "@/models/category-models";
import { subcategoryModel } from "@/models/sub-cat-models";

const { userModel } = require("@/models/users-model");

// manufacturer start ---------------------------------------------------------------

export async function getManufacturers() {
  await dbConnect();

  const manufacturers = await manufacturerModel.find().lean();
  return replaceMongoIdInArray(manufacturers);
}
export async function createManufacturer(data) {
  await dbConnect();

  // Check if manufacturer with same name already exists
  const existing = await manufacturerModel.findOne({ name: data.name });
  if (existing) {
    throw new Error("Manufacturer with this name already exists.");
  }

  const newManufacturer = new manufacturerModel({
    name: data.name,
    logo: data.logo || "",
    description: data.description || "",
    website: data.website || "",
  });

  const saved = await newManufacturer.save();
  return saved.toObject(); // or `lean()` if needed
}

export async function deleteManufacturer(id) {
  await dbConnect();

  const deleted = await manufacturerModel.findByIdAndDelete(id);

  if (!deleted) {
    throw new Error("Manufacturer not found or already deleted.");
  }

  return deleted.toObject();
}
// manufacturer end ---------------------------------------------------------------

// category start ---------------------------------------------------------------
export async function getCategories() {
  try {
    const categories = await categoryModel
      .find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return replaceMongoIdInArray(categories);
  } catch (error) {
    console.error("Failed to get categories:", error);
    throw new Error("Error fetching categories");
  }
}

export async function addCategory({ name, slug, icon, description }) {
  try {
    const newCategory = await categoryModel.create({
      name,
      slug,
      icon,
      description,
    });

    return newCategory;
  } catch (error) {
    console.error("Failed to add category:", error);
    throw new Error("Error adding category");
  }
}

export async function deleteCategory(id) {
  try {
    const deletedCategory = await categoryModel.findByIdAndDelete(id);
    return deletedCategory;
  } catch (error) {
    console.error("Failed to delete category:", error);
    throw new Error("Error deleting category");
  }
}

export async function createSubcategory({ name, slug, categoryId }) {
  try {
    const newSubcategory = await subcategoryModel.create({
      name,
      slug,
      categoryId,
    });
    return newSubcategory;
  } catch (error) {
    throw new Error("Failed to create subcategory: " + error.message);
  }
}

export async function getSubcategoriesByCategory(categoryId) {
  try {
    const subcategories = await subcategoryModel
      .find({ categoryId: new mongoose.Types.ObjectId(categoryId) })
      .sort({ createdAt: -1 });

    return subcategories.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      slug: item.slug,
    }));
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw new Error("Failed to fetch subcategories");
  }
}

// category end---------------------------------------------------------------

// user start---------------------------------------------------------------

export async function getUserByMail(email) {
  await dbConnect();
  try {
    const user = await userModel.findOne({ email: email });

    if (!user) {
      // Handle case when no user is found
      return null;
    }

    // Ensure the wishlist and cardlist fields exist and are arrays
    if (!Array.isArray(user.wishlist)) {
      user.wishlist = [];
    }
    if (!Array.isArray(user.cardlist)) {
      user.cardlist = [];
    }

    await user.save(); // Save changes if necessary

    return replaceMongoIdInObject(user.toObject()); // Convert Mongoose document to plain object
  } catch (err) {
    console.log(err);
    return null; // Return null or handle the error appropriately
  }
}

export async function getUserById(id) {
  await dbConnect();
  try {
    const user = await userModel.findById(id).lean();
    return replaceMongoIdInObject(user);
  } catch (err) {
    console.log(err);
  }
}
// user end---------------------------------------------------------------

// products start---------------------------------------------------------------
/**
 * Fetches cart by userId (if logged in) or by trackingId (for guest users)
 * @param userId MongoDB ObjectId or null
 * @param trackingId string (must be provided for guests)
 * @returns cart document or null
 */
export async function getCart({ userId, trackingId }) {
  try {
    let cart = null;

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      cart = await cartModel.findOne({ userId, isOrdered: false }).lean();
    }

    if (!cart && trackingId) {
      cart = await cartModel.findOne({ trackingId, isOrdered: false }).lean(); // ✅ added .lean()
    }

    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw new Error("Failed to fetch cart");
  }
}

export async function searchProducts(query) {
  await dbConnect();
  const regexName = new RegExp(
    query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
    "i"
  );

  const products = await productModel
    .find({ name: { $regex: regexName } })
    .lean();
  return replaceMongoIdInArray(products);
}

export async function getProducts(filCat, query, fillPrice, fillSize) {
  try {
    await dbConnect();

    // Base query builder
    const buildQuery = () => {
      const queryConditions = {};

      // Search by name
      if (query) {
        const regexName = new RegExp(
          query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
          "i"
        );
        queryConditions.name = { $regex: regexName };
      }

      // Filter by price range
      if (fillPrice) {
        const [min, max] = fillPrice.split("|").map(Number);
        queryConditions["price.usd"] = { $gte: min, $lte: max };
      }

      return queryConditions;
    };

    // Main query execution
    let products = await productModel.find(buildQuery()).lean();

    // Filter by category (client-side as it uses array includes)
    if (filCat) {
      const categoriesToMatch = filCat.split("|");
      products = products.filter((product) =>
        categoriesToMatch.includes(product.categoryId?.toString())
      );
    }

    // Filter by size (optimized to use database when possible)
    if (fillSize) {
      // If we already have a filtered result set, filter client-side
      if (query || filCat || fillPrice) {
        products = products.filter((product) =>
          product.sizes?.includes(fillSize)
        );
      } else {
        // Otherwise, let MongoDB handle the filtering
        products = await productModel
          .find({
            sizes: { $in: [fillSize] },
          })
          .lean();
      }
    }

    return replaceMongoIdInArray(products);
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function getProductById(productId) {

  await dbConnect();
  const product = await productModel.findById(productId).lean();

  return replaceMongoIdInObject(product);
}

export async function deleteProductById(productId) {
  try {
    await dbConnect();

    // Find and delete the product
    const deletedProduct = await productModel
      .findByIdAndDelete(productId)
      .lean();

    if (!deletedProduct) {
      throw new Error("Product not found");
    }

    // Return the deleted product (with transformed IDs if needed)
    return replaceMongoIdInObject(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error; // Re-throw the error for the calling function to handle
  }
}

export async function getProductByCategory(categoryId) {
  try {
    await dbConnect();
    console.log("Fetching products for category ID:", categoryId);

    const products = await productModel
      .find({ categoryId: categoryId, isActive: true }) // Changed to categoryId to match schema
      .select(
        "name image price discountPrice ratings reviewsNumber soldCount quantity isActive"
      )
      .sort({ createdAt: -1 }) // Sort by newest first
      .lean();

    if (!products?.length) {
      console.log("No active products found for category ID:", categoryId);
      return [];
    }

    const processedProducts = replaceMongoIdInArray(products);
    console.log(
      `Found ${processedProducts.length} active products for category ${categoryId}`
    );
    return processedProducts;
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
    throw new Error("Failed to fetch products by category");
  }
}

export async function getNewArivalProduct() {
  await dbConnect();
  const newArivalProduct = await productModel
    .find()
    .sort({ published: -1 })
    .lean();

  return replaceMongoIdInArray(newArivalProduct);
}

export async function getTrendingProduct() {
  await dbConnect();
  const trendingProduct = await productModel
    .find({ ratings: { $gte: 4.8, $lte: 5 } })
    .sort({ published: -1 })
    .lean();
  // Trending products: (Some recent products those ratings are between 4.8 to 5)
  return replaceMongoIdInArray(trendingProduct);
}

export const cartCleanUp = async () => {
  const expirationTime = new Date(Date.now() - 20 * 60 * 1000);
  await dbConnect();

  try {
    // Find users with expired items
    const users = await userModel.find({
      "cardlist.addedAt": { $lt: expirationTime },
    });

    // Iterate over each user and handle their expired items
    for (const user of users) {
      const expiredItems = user.cardlist.filter(
        (item) => item.addedAt < expirationTime
      );

      // Update the product quantities
      for (const item of expiredItems) {
        await productModel.updateOne(
          { _id: item.itemId },
          { $inc: { quantity: item.itemQuantity } }
        );
      }

      // Remove the expired items from the user's cardlist
      user.cardlist = user.cardlist.filter(
        (item) => item.addedAt >= expirationTime
      );
      await user.save();
    }
  } catch (err) {
    console.error("Error cleaning up expired cart items:", err);
  }
};

export async function addToCart({
  userId = null,
  trackingId = null,
  productId,
  quantity = 1,
  size,
  color,
}) {
  await dbConnect();

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  const productObjectId = new mongoose.Types.ObjectId(productId);
  const product = await productModel.findById(productObjectId);

  if (!product) throw new Error("Product not found");
  if (product.quantity < quantity) throw new Error("Insufficient stock");

  // If user is logged in
  if (userId) {
    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found");

    if (!user.cardlist) user.cardlist = [];

    const alreadyInList = user.cardlist.find(
      (item) =>
        item.itemId.equals(productObjectId) &&
        item.size === size &&
        item.color === color
    );

    if (alreadyInList) {
      alreadyInList.itemQuantity += quantity;
    } else {
      user.cardlist.push({
        itemId: productObjectId,
        itemQuantity: quantity,
        size,
        color,
        addedAt: new Date(),
      });
    }

    product.quantity -= quantity;
    await product.save();
    await user.save();
    return { success: true, type: "user" };
  }

  // If guest user with trackingId
  if (trackingId) {
    let cart = await cartModel.findOne({ trackingId });

    if (!cart) {
      cart = await cartModel.create({
        trackingId,
        items: [
          {
            productId,
            quantity,
            size,
            color,
            addedAt: new Date(),
          },
        ],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId.equals(productObjectId) &&
          item.size === size &&
          item.color === color
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({
          productId,
          quantity,
          size,
          color,
          addedAt: new Date(),
        });
      }
      await cart.save();
    }

    product.quantity -= quantity;
    await product.save();

    return { success: true, type: "guest" };
  }

  throw new Error("No userId or trackingId provided");
}

export async function getCardListData(id) {
  await dbConnect();
  try {
    const user = await userModel.findById(id);
    const cardlist = user.cardlist;
    const summery = await Promise.all(
      cardlist.map(async (card) => {
        const item = await getProductById(card?.itemId);

        return {
          ...item,
          cartQuantity: card.itemQuantity,
        };
      })
    );

    return summery;
  } catch (err) {
    console.error(err);
  }
}

export async function incrementItemQuantity(trackingId, userId, itemId, plus) {
  try {
    await dbConnect();

    // Validate product ID
    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      throw new Error("Invalid product ID");
    }
    const productObjectId = new mongoose.Types.ObjectId(itemId);

    if (userId) {
      // 🔒 Logged-in user logic
      if (plus) {
        // Increase quantity in user cardlist
        await userModel.updateOne(
          { _id: userId, "cardlist.itemId": itemId },
          { $inc: { "cardlist.$.itemQuantity": 1 } }
        );
        await productModel.updateOne(
          { _id: productObjectId },
          { $inc: { quantity: -1 } }
        );
      } else {
        const userResult = await userModel.updateOne(
          {
            _id: userId,
            "cardlist.itemId": itemId,
            "cardlist.itemQuantity": { $gt: 1 },
          },
          { $inc: { "cardlist.$.itemQuantity": -1 } }
        );
        if (userResult.modifiedCount > 0) {
          await productModel.updateOne(
            { _id: productObjectId },
            { $inc: { quantity: 1 } }
          );
        }
      }
    } else if (trackingId) {
      // 🧾 Guest user logic using trackingId
      const cart = await cartModel.findOne({ trackingId });

      if (!cart) throw new Error("Cart not found");

      const item = cart.items.find(
        (i) => i.productId.toString() === itemId.toString()
      );
      if (!item) throw new Error("Item not found in cart");

      if (plus) {
        item.quantity += 1;
        await productModel.updateOne(
          { _id: productObjectId },
          { $inc: { quantity: -1 } }
        );
      } else if (item.quantity > 1) {
        item.quantity -= 1;
        await productModel.updateOne(
          { _id: productObjectId },
          { $inc: { quantity: 1 } }
        );
      }

      await cart.save();
    } else {
      throw new Error("Missing userId or trackingId");
    }
  } catch (error) {
    console.error(
      `❌ Error updating itemQuantity for itemId: ${itemId}`,
      error
    );
    throw error;
  }
}

export async function removeCardList(userId, trackingId, productId) {
  await dbConnect();
  // Validate productId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new Error("Invalid product ID");
  }

  const productObjectId = new mongoose.Types.ObjectId(productId);

  if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    const user = await userModel.findById(userId);
    if (user && Array.isArray(user.cardlist)) {
      const item = user.cardlist.find(
        (item) => item.itemId.toString() === productId.toString()
      );

      // Remove item from user's cardlist
      const result = await userModel.updateOne(
        { _id: userId },
        { $pull: { cardlist: { itemId: productId } } }
      );

      // Increment product quantity
      if (item?.itemQuantity) {
        await productModel.updateOne(
          { _id: productObjectId },
          { $inc: { quantity: item.itemQuantity } }
        );
      }

      return { success: true, source: "user", result };
    }
  }

  if (!trackingId) {
    throw new Error("Tracking ID is required for guest users");
  }

  // Remove item from guest cart
  const guestCart = await cartModel.findOne({ trackingId });
  if (!guestCart) {
    throw new Error("Guest cart not found");
  }

  const guestItem = guestCart.items.find(
    (item) => item.productId.toString() === productId.toString()
  );

  const result = await cartModel.updateOne(
    { trackingId },
    { $pull: { items: { productId: productId } } }
  );

  // Increment product quantity
  if (guestItem?.quantity) {
    await productModel.updateOne(
      { _id: productObjectId },
      { $inc: { quantity: guestItem.quantity } }
    );
  }

  return { success: true, source: "guest", result };
}

export const getSummary = async () => {
  await dbConnect();
  const session = await auth();
  if (session) {
    const user = await getUserByMail(session?.user?.email);
    const cartInfo = await user?.cardlist;

    if (cartInfo) {
      const subtotal = await Promise.all(
        cartInfo?.map(async (cart) => {
          const productInfo = await getProductById(cart?.itemId);
          const cost = productInfo.discount_price * cart?.itemQuantity;
          return { const: cost };
        })
      );
      const estimate = Math.ceil(
        subtotal.reduce((acc, curr) => acc + curr.const, 0)
      );

      return { cartInfo, estimate, userId: user.id };
    }
  }
};

function generateTrackingCode() {
  return "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
}

export const placeOrder = async (form) => {
  try {
    await dbConnect();

    const summary = await getSummary();

    const trackingCode = generateTrackingCode();

    // Create the new order object with trackingCode
    const newOrder = {
      cartInfo: summary.cartInfo,
      totalPrice: summary.estimate,
      userId: summary.userId,
      name: `${form?.firstName || ""} ${form?.lastName || ""}`.trim(),
      company: form?.company || "",
      region: form?.region || "",
      address: form?.address || "",
      city: form?.city || "",
      phone: form?.phone || "",
      email: form?.email || "",
      trackingCode, // << Added tracking code here
    };

    try {
      // PDF generation
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 400]);
      const { height } = page.getSize();
      const fontSize = 30;

      page.drawText(`Order Confirmation`, {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        color: rgb(0, 0.53, 0.71),
      });

      page.drawText(`Tracking Number: ${trackingCode}`, {
        // Updated line
        x: 50,
        y: height - 6 * fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Customer Name: ${newOrder?.name}`, {
        x: 50,
        y: height - 8 * fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Address: ${newOrder?.address}`, {
        x: 50,
        y: height - 10 * fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      page.drawText(`Total Amount: $${newOrder?.totalPrice}`, {
        x: 50,
        y: height - 12 * fontSize,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();

      let folderPath = null;
      if (process.env.DEV && process.env.DEV === "Yes") {
        folderPath = path.join(__dirname, `yourPath`);
      } else {
        folderPath = "/tmp/";
      }

      const pdfPath = path.join(
        process.cwd(),
        folderPath,
        `${trackingCode}.pdf`
      );

      fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
      fs.writeFileSync(pdfPath, pdfBytes);
    } catch (e) {
      console.error("PDF generation error:", e);
    }

    const completeOrder = { ...newOrder, pdfFile: trackingCode };

    await orderModel.create(completeOrder);

    try {
      // await sendingEmail(newOrder, trackingCode); // Pass trackingCode for email content
    } catch (e) {
      console.error("Email sending error:", e);
    }

    return { success: true, trackingCode };
  } catch (error) {
    console.error("Order placement error:", error);
    return { success: false };
  }
};

export const clearCardlist = async (userId) => {
  await dbConnect();
  try {
    await userModel.updateOne({ _id: userId }, { $set: { cardlist: [] } });
  } catch (error) {
    console.error("Error clearing cardlist:", error);
  }
};

// products end---------------------------------------------------------------
