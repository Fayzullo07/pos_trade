import connectMongoDB from "@/lib/mongodb";
import Category from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    await connectMongoDB();
    try {
        let categories = await Category.find({ isActive: true });
        return NextResponse.json({ categories }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ categories: [] }, { status: 500 })
    }
}


