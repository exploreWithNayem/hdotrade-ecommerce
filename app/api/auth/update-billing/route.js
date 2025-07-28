const { userModel } = require("@/models/users-model");
const { dbConnect } = require("@/service/mongo");

import { NextResponse } from "next/server";

export const POST = async (request) => {
  await dbConnect();
  const { id, city, phone, postcode, houseName } = await request.json();

  const newData = {
    billingAddress: {
      city,
      phone,
      postcode,
      houseName,
    },
  };

  try {
    await userModel.findByIdAndUpdate(id, newData, { new: true });
    return new NextResponse("Billing Address has been updated", {
      status: 201,
    });
  } catch (e) {
    return new NextResponse(e.message, {
      status: 500,
    });
  }
};
