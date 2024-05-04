import connectMongoDB from "@/lib/mongodb";
import Category from "@/models/categoryModel";
import { NextResponse } from "next/server";


export const GET = async (req: any, { params }: { params: any }) => {
    await connectMongoDB();
    const { id } = params;
    try {
        const category = await Category.findById(id);
        return NextResponse.json({ category }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ category: [] }, { status: 500 });
    }
};

export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { name, isActive } = await req.json();
    await connectMongoDB()

    try {
        await Category.findByIdAndUpdate(id, {
            name,
            isActive
        });

        return NextResponse.json({ message: "Updated succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}

export async function DELETE(req: any, { params }: { params: any }) {
    const { id } = params;
    await connectMongoDB();
    await Category.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" }, { status: 200 })
}



