const { userModel } = require("@/models/users-model");
const { dbConnect } = require("@/service/mongo");
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  await dbConnect();
  const { name, email, password } = await request.json();

  console.log('from api..',name,email, password)

  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  try {
    await userModel.create(newUser);
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (e) {
    return new NextResponse(e.message, {
      status: 500,
    });
  }
};
