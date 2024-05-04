import connectMongoDB from "@/lib/mongodb";
import Product from "@/models/productModel";
import { NextResponse } from "next/server";


export const GET = async (req: any, { params }: { params: any }) => {
    await connectMongoDB();
    const { id } = params;
    try {
        const product = await Product.findById(id);
        return NextResponse.json({ product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ product: [] }, { status: 500 });
    }
};

export const PUT = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { photo, name, price, category, isActive } = await req.json();
    await connectMongoDB()
    

    try {
        await Product.findByIdAndUpdate(id, {
            photo,
            name,
            price,
            category,
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
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted" }, { status: 200 })
}



