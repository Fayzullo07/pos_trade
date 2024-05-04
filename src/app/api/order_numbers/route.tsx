import connectMongoDB from "@/lib/mongodb";
import OrderNumber from "@/models/orderNumberModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    await connectMongoDB();
    try {
        const order_numbers = await OrderNumber.find({ isActive: true });
        return NextResponse.json({ order_numbers }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ order_numbers: [] }, { status: 500 })
    }
}


