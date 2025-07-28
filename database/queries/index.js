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
import { auth } from "@/auth";
import { orderModel } from "@/models/order-models";
import { Resend } from "resend";
import EmailTemplate from "@/components/common/EmailTemplate";
import { generateRandomID } from "@/utils/randomIdGenarate";
const { userModel } = require("@/models/users-model");
const { dbConnect } = require("@/service/mongo");

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

export async function AddToCard(userId, productId) {
  await dbConnect();

  try {
    // Ensure the product ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      throw new Error("Invalid product ID");
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Find the user by ID
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Ensure the cardlist field exists and is an array
    if (!user.cardlist) {
      user.cardlist = [];
    }

    // Check if the product is already in the user's card list
    const alreadyInList = user.cardlist.some((item) =>
      new mongoose.Types.ObjectId(item.itemId).equals(productObjectId)
    );

    if (alreadyInList) {
      return false;
    }

    // Check the product availability and decrease the quantity by 1
    const product = await productModel.findById(productObjectId);
    if (!product) {
      throw new Error("Product not found");
    }
    if (product.quantity <= 0) {
      throw new Error("Product out of stock");
    }

    // Decrease the product quantity by 1
    product.quantity -= 1;
    await product.save();

    // Add the product to the card list with itemQuantity 1 and addedAt
    user.cardlist.push({
      itemId: productObjectId,
      itemQuantity: 1,
      addedAt: new Date(),
    });

    await user.save();

    return true;
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error after logging it
  }
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

export const placeOrder = async (form) => {
  try {
    // Connect to the database
    await dbConnect();

    // Get the summary which includes cart info and user details
    const summary = await getSummary();

    // Create the new order object
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
    };

    const random = generateRandomID();

    try {
      //pdf.........................................................
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

      page.drawText(`Order ID: kh923e48923`, {
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

      // Define a path to save the PDF
      const pdfPath = path.join(process.cwd(), folderPath, `${random}.pdf`);

      // Ensure the directory exists
      fs.mkdirSync(path.dirname(pdfPath), { recursive: true });

      // Save the PDF to the file system
      fs.writeFileSync(pdfPath, pdfBytes);
      //pdf.........................................................
    } catch (e) {
      console.log(e);
    }

    const completeOrder = { ...newOrder, pdfFile: random };

    await orderModel.create(completeOrder);

    try {
      await sendingEmail(newOrder, random);
    } catch (e) {
      console.log(e);
    }

    return true;
  } catch (error) {
    return false;
  }
};

let folderPath = null;
if (process.env.DEV && process.env.DEV === "Yes") {
  folderPath = path.join(__dirname, `yourPath`);
} else {
  folderPath = "/tmp/";
}

export async function sendingEmail(newOrder, random) {
  let attachments;
  try {
    const pdfPath = path.join(process.cwd(), folderPath, `${random}.pdf`);

    const pdfBuffer = fs.readFileSync(pdfPath);
    const pdfBase64 = pdfBuffer.toString("base64");
    attachments = [
      {
        filename: "order-confirmation.pdf",
        content: pdfBase64,
        contentType: "application/pdf",
        disposition: "attachment",
      },
    ];
  } catch (e) {
    console.error(e.message);
  }

  const resend = new Resend(process.env.MAIL_SEND_KEY);
  const message = `Dear ${newOrder?.name}, you have successfully ordered. Total amount to pay is $${newOrder?.totalPrice}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "naeemislam13790@gmail.com",
    subject: "You have successfully ordered",
    react: EmailTemplate({ message }),
    attachments: attachments || [],
  });
}

export const clearCardlist = async (userId) => {
  await dbConnect();
  try {
    await userModel.updateOne({ _id: userId }, { $set: { cardlist: [] } });
  } catch (error) {
    console.error("Error clearing cardlist:", error);
  }
};
