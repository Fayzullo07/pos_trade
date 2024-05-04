import connectMongoDB from "@/lib/mongodb";
import Chef from "@/models/chefModel";
import OrderNumber from "@/models/orderNumberModel";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
    const { orders, orderNumber } = await req.json();
    await connectMongoDB()

    try {
        const order = await Chef.create({
            orders,
            orderNumber
        });

        await OrderNumber.create({
            orderNumber
        });


        return NextResponse.json({ message: "Created succesfully" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ data: null }, { status: 500 })
    }
}



