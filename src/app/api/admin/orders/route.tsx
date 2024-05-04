import connectMongoDB from "@/lib/mongodb";
import Chef from "@/models/chefModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    await connectMongoDB();
    try {
        let orders = await Chef.find({});
        return NextResponse.json({ orders }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ orders: [] }, { status: 500 })
    }
}


