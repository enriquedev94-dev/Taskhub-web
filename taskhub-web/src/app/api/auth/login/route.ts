
import { NextResponse } from "next/server";
import type { LoginRequest, LoginResponse } from "@/types/auth";

export async function POST(request: Request){
    const body: LoginRequest = await request.json();

    const response = await fetch(`${process.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        return NextResponse.json(
            {
                message: "Invalid credentials",
            },
            {
                status: response.status
            }
        )
    }

    const data: LoginResponse = await response.json();
    const nextResponse = NextResponse.json({
        success: true,
    })

    nextResponse.cookies.set({
        name: "access_token",
        value: data.access_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60
    });
    return nextResponse;
}