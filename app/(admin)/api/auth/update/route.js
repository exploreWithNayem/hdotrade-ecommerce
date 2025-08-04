const { userModel } = require("@/models/users-model");
const { dbConnect } = require("@/service/mongo");

import { NextResponse } from "next/server";

export const POST = async (request) => {
  await dbConnect();
  const { id, name, image, contact } = await request.json();


  try {
    await userModel.findByIdAndUpdate(
      id,
      { name, contact,image},
      { new: true }
    );
    return new NextResponse("User has been updated", {
      status: 201,
    });
  } catch (e) {
    return new NextResponse(e.message, {
      status: 500,
    });
  }
};
