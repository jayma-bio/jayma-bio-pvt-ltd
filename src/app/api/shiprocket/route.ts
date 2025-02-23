import { axiosinstance } from "@/lib/axios";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const token = await axiosinstance.post("/auth/login", {
            email: process.env.SHIPROCKET_EMAIL,
            password: process.env.SHIPROCKET_PASSWORD,
        }).then((response) => {
            console.log("Logged in successfully:", response.data);
            return response.data.token;
        }).catch((error) => {
            console.error("Error:", error.response.data.message);
            return null;
        });

        return NextResponse.json({ token: token });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: error });
    }
}