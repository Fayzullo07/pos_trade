import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: any) => {
    const { photo, name, price, category, isActive } = await req.json();
    await connectMongoDB()

    try {
        await Product.create({
            photo,
            name,
            price,
            category,
            isActive
        });

        return NextResponse.json({ message: "Created succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}


export const GET = async (req: NextRequest) => {
    await connectMongoDB();
    try {
        let products = await Product.find({}).populate("category");
        return NextResponse.json({ products }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ products: [] }, { status: 500 })
    }
}


