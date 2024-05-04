import connectMongoDB from "@/lib/mongodb";
import Chef from "@/models/chefModel";
import OrderNumber from "@/models/orderNumberModel";
import { NextResponse } from "next/server";


export const PATCH = async (req: any, { params }: { params: any }) => {
    const { id } = params;
    const { isFinished, isActive, orderNumber } = await req.json();
    await connectMongoDB()

    try {
        await OrderNumber.findOneAndUpdate({ orderNumber: orderNumber }, { isFinished, isActive }, { new: true });

        await Chef.findByIdAndUpdate(id, {
            isFinished,
            isActive
        });

        return NextResponse.json({ message: "Updated succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}



