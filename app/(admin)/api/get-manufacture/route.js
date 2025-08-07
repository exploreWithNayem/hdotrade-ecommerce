import { NextResponse } from "next/server";
import { dbConnect } from "@/service/mongo";

import { manufacturerModel } from "@/models/manufacture-model";

export const GET = async () => {
  try {
    await dbConnect();

    // Fetch manufacture, sorted by most recent
    const manufacture = await manufacturerModel
      .find()
      .sort({ createdAt: -1 })
      .lean();

    // Return manufacture as JSON
    return NextResponse.json(manufacture, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch manufacture:", error);

    return NextResponse.json(
      { message: "Failed to fetch manufacture", error: error.message },
      { status: 500 }
    );
  }
};
