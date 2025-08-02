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
      .find({ categoryId })
      .sort({ createdAt: -1 });
    return subcategories.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      slug: item.slug,
    }));
  } catch (error) {
    throw new Error("Failed to fetch subcategories");
  }
}


// category end---------------------------------------------------------------

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

export async function getAllCategory() {
  await dbConnect();
  try {
    const categories = await productModel.distinct("category");
    return categories;
  } catch (e) {
    console.error(e.message);
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
  await dbConnect();

  let products = await productModel.find().lean();
  let priceFiltered = false;

  //search for products........
  if (query) {
    const regexName = new RegExp(
      query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"),
      "i"
    );
    products = await productModel.find({ name: { $regex: regexName } }).lean();
  }

  // filter by category .......
  if (filCat) {
    const filCatToMatch = filCat.split("|");

    products = products.filter((product) => {
      return filCatToMatch.includes(product.category.toString());
    });
  }

  // filter by price..........
  if (fillPrice) {
    const priceArray = fillPrice.split("|");
    const min = priceArray[0];
    const max = priceArray[1];
    products = await productModel
      .find({
        price: { $gte: min, $lte: max },
      })
      .lean();

    priceFiltered = true;
  }

  // filter by size.........
  if (fillSize && priceFiltered) {
    products = products.filter((product) => product.sizes.includes(fillSize));
  } else if (fillSize && !priceFiltered) {
    products = await productModel.find({ sizes: { $in: [fillSize] } }).lean();
  }
  return replaceMongoIdInArray(products);
}

export async function getProductById(productId) {
  await dbConnect();
  const product = await productModel.findById(productId).lean();

  return replaceMongoIdInObject(product);
}

export async function getProductByCategory(category) {
  await dbConnect();
  const product = await productModel.find({ category: category }).lean();

  return replaceMongoIdInArray(product);
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

export async function AddToWishlist(userId, productId) {
  await dbConnect();

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    // Ensure the wishlist field exists and is an array
    if (!user.wishlist) {
      user.wishlist = [];
    }

    const alreadyInList = user.wishlist.includes(productId);
    if (!alreadyInList) {
      user.wishlist.push(new mongoose.Types.ObjectId(productId));
      await user.save();
      return true;
    }

    return false;
  } catch (err) {
    console.error(err);
    throw err; // Rethrow the error for further handling if necessary
  }
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

export async function incrementItemQuantity(userId, itemId, plus) {
  try {
    await dbConnect();

    // Ensure the product ID is a valid ObjectId
    let productObjectId;
    if (mongoose.Types.ObjectId.isValid(itemId)) {
      productObjectId = new mongoose.Types.ObjectId(itemId);
    } else {
      throw new Error("Invalid product ID");
    }

    if (plus) {
      // Increment item quantity in user's card list
      const userUpdateResult = await userModel.updateOne(
        { _id: userId, "cardlist.itemId": itemId },
        { $inc: { "cardlist.$.itemQuantity": 1 } }
      );

      // Decrement product quantity by 1
      const productUpdateResult = await productModel.updateOne(
        { _id: productObjectId },
        { $inc: { quantity: -1 } }
      );

      // Log the results for debugging
      console.log("User Update Result:", userUpdateResult);
      console.log("Product Update Result:", productUpdateResult);
    } else {
      // Decrement item quantity in user's card list only if itemQuantity is greater than 1
      const userUpdateResult = await userModel.updateOne(
        {
          _id: userId,
          "cardlist.itemId": itemId,
          "cardlist.itemQuantity": { $gt: 1 },
        },
        { $inc: { "cardlist.$.itemQuantity": -1 } }
      );

      // Check if the user update was successful before incrementing product quantity
      if (userUpdateResult.modifiedCount > 0) {
        const productUpdateResult = await productModel.updateOne(
          { _id: productObjectId },
          { $inc: { quantity: 1 } }
        );

        // Log the results for debugging
        console.log("User Update Result:", userUpdateResult);
        console.log("Product Update Result:", productUpdateResult);
      }
    }
  } catch (error) {
    console.error(
      `Error updating itemQuantity for itemId: ${itemId} in cardlist`,
      error
    );
    throw error; // Re-throw the error for higher-level error handling
  }
}

export async function removeCardList(userId, productId) {
  await dbConnect();
  const user = await userModel.findById(userId);
  const item = user.cardlist.find((item) => item.itemId === productId);
  let productObjectId;
  if (mongoose.Types.ObjectId.isValid(productId)) {
    productObjectId = new mongoose.Types.ObjectId(productId);
  } else {
    throw new Error("Invalid product ID");
  }

  if (!user) {
    throw new Error("User not found");
  }

  const result = await userModel.updateOne(
    { _id: userId },
    { $pull: { cardlist: { itemId: productId } } }
  );

  // increse the product quantity by 1
  await productModel.updateOne(
    { _id: productObjectId },
    { $inc: { quantity: +item?.itemQuantity } }
  );

  return result;
}

export async function removeWishList(userId, productId) {
  await dbConnect();
  const user = await userModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.wishlist.pull(new mongoose.Types.ObjectId(productId));
  await user.save();
}

export async function getWishListData(id) {
  await dbConnect();
  try {
    const user = await userModel.findById(id);
    const wishlist = user.wishlist;
    const products = await productModel.find({ _id: { $in: wishlist } }).lean();
    return replaceMongoIdInArray(products);
  } catch (err) {
    console.error(err);
  }
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
      await sendingEmail(newOrder, trackingCode); // Pass trackingCode for email content
    } catch (e) {
      console.error("Email sending error:", e);
    }

    return { success: true, trackingCode };
  } catch (error) {
    console.error("Order placement error:", error);
    return { success: false };
  }
};

// export const placeOrder = async (form) => {
//   try {
//     // Connect to the database
//     await dbConnect();

//     // Get the summary which includes cart info and user details
//     const summary = await getSummary();

//     // Create the new order object
//     const newOrder = {
//       cartInfo: summary.cartInfo,
//       totalPrice: summary.estimate,
//       userId: summary.userId,
//       name: `${form?.firstName || ""} ${form?.lastName || ""}`.trim(),
//       company: form?.company || "",
//       region: form?.region || "",
//       address: form?.address || "",
//       city: form?.city || "",
//       phone: form?.phone || "",
//       email: form?.email || "",
//     };

//     const random = generateRandomID();

//     try {
//       //pdf.........................................................
//       const pdfDoc = await PDFDocument.create();
//       const page = pdfDoc.addPage([600, 400]);
//       const { height } = page.getSize();
//       const fontSize = 30;

//       page.drawText(`Order Confirmation`, {
//         x: 50,
//         y: height - 4 * fontSize,
//         size: fontSize,
//         color: rgb(0, 0.53, 0.71),
//       });

//       page.drawText(`Order ID: kh923e48923`, {
//         x: 50,
//         y: height - 6 * fontSize,
//         size: fontSize,
//         color: rgb(0, 0, 0),
//       });

//       page.drawText(`Customer Name: ${newOrder?.name}`, {
//         x: 50,
//         y: height - 8 * fontSize,
//         size: fontSize,
//         color: rgb(0, 0, 0),
//       });

//       page.drawText(`Address: ${newOrder?.address}`, {
//         x: 50,
//         y: height - 10 * fontSize,
//         size: fontSize,
//         color: rgb(0, 0, 0),
//       });

//       page.drawText(`Total Amount: $${newOrder?.totalPrice}`, {
//         x: 50,
//         y: height - 12 * fontSize,
//         size: fontSize,
//         color: rgb(0, 0, 0),
//       });

//       const pdfBytes = await pdfDoc.save();

//       let folderPath = null;
//       if (process.env.DEV && process.env.DEV === "Yes") {
//         folderPath = path.join(__dirname, `yourPath`);
//       } else {
//         folderPath = "/tmp/";
//       }

//       // Define a path to save the PDF
//       const pdfPath = path.join(process.cwd(), folderPath, `${random}.pdf`);

//       // Ensure the directory exists
//       fs.mkdirSync(path.dirname(pdfPath), { recursive: true });

//       // Save the PDF to the file system
//       fs.writeFileSync(pdfPath, pdfBytes);
//       //pdf.........................................................
//     } catch (e) {
//       console.log(e);
//     }

//     const completeOrder = { ...newOrder, pdfFile: random };

//     await orderModel.create(completeOrder);

//     try {
//       await sendingEmail(newOrder, random);
//     } catch (e) {
//       console.log(e);
//     }

//     return true;
//   } catch (error) {
//     return false;
//   }
// };

let folderPath = null;
if (process.env.DEV && process.env.DEV === "Yes") {
  folderPath = path.join(__dirname, `yourPath`);
} else {
  folderPath = "/tmp/";
}

// export async function sendingEmail(newOrder, random) {
//   let attachments;
//   try {
//     const pdfPath = path.join(process.cwd(), folderPath, `${random}.pdf`);

//     const pdfBuffer = fs.readFileSync(pdfPath);
//     const pdfBase64 = pdfBuffer.toString("base64");
//     attachments = [
//       {
//         filename: "order-confirmation.pdf",
//         content: pdfBase64,
//         contentType: "application/pdf",
//         disposition: "attachment",
//       },
//     ];
//   } catch (e) {
//     console.error(e.message);
//   }

//   const resend = new Resend(process.env.MAIL_SEND_KEY);
//   const message = `Dear ${newOrder?.name}, you have successfully ordered. Total amount to pay is $${newOrder?.totalPrice}`;

//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: "naeemislam13790@gmail.com",
//     subject: "You have successfully ordered",
//     react: EmailTemplate({ message }),
//     attachments: attachments || [],
//   });
// }

export const clearCardlist = async (userId) => {
  await dbConnect();
  try {
    await userModel.updateOne({ _id: userId }, { $set: { cardlist: [] } });
  } catch (error) {
    console.error("Error clearing cardlist:", error);
  }
};
