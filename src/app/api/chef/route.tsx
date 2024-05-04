import connectMongoDB from "@/lib/mongodb";
import Chef from "@/models/chefModel";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    await connectMongoDB();
    try {
        let orders = await Chef.find({ isActive: true });
        return NextResponse.json({ orders }, {
            status: 200,
            headers: {
                'Cache-Control': 'public, s-maxage=1',
                'CDN-Cache-Control': 'public, s-maxage=60',
                'Vercel-CDN-Cache-Control': 'public, s-maxage=3600',
            },
        })
    } catch (error) {
        return NextResponse.json({ orders: [] }, { status: 500 })
    }
}


