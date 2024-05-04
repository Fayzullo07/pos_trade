import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const category = req.nextUrl.searchParams.get('category');
    await connectMongoDB();
    try {
        let products = await Product.find({ isActive: true, category });
        return NextResponse.json({ products }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ products: [] }, { status: 500 })
    }
}


