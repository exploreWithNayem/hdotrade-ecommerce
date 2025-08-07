import { NextResponse } from "next/server";
import { dbConnect } from "@/service/mongo";
import { categoryModel } from "@/models/category-models";

export const GET = async () => {
  try {
    await dbConnect();

    // Fetch categories, sorted by most recent
    const categories = await categoryModel
      .find()
      .sort({ createdAt: -1 })
      .lean();

    // Return categories as JSON
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch categories:", error);

    return NextResponse.json(
      { message: "Failed to fetch categories", error: error.message },
      { status: 500 }
    );
  }
};
