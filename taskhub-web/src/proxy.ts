import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = new Set([
    "/login",
])

export function proxy(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const { pathname } = request.nextUrl;

    const isPublicRoute = PUBLIC_ROUTES.has(pathname);

    if(!token && !isPublicRoute){
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if(token && isPublicRoute){
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/dashboard/:path*",
    "/projects/:path*",
    "/tasks/:path*",
  ],
};