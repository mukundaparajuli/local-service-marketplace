import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    const isProtected = request.nextUrl.pathname.startsWith("/dashboard");
    const authState = request.cookies.get("auth-state");

    if (isProtected && !authState) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*']
}