import connectMongoDB from "@/lib/mongodb";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
    const { login, password } = await req.json();
    await connectMongoDB()
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            login,
            password: hashedPassword,
            role: "admin"
        });

        return NextResponse.json({ message: "User registered" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Ann error occurred while registering the user." }, { status: 500 })
    }
}

