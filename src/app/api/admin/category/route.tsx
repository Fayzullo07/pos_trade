import connectMongoDB from "@/lib/mongodb";
import Category from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: any) => {
    const { name, isActive } = await req.json();
    await connectMongoDB()

    try {
        await Category.create({
            name,
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
        let categories = await Category.find({});
        return NextResponse.json({ categories }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ categories: [] }, { status: 500 })
    }
}


