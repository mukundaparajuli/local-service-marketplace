
import { NextRequest, NextResponse } from "next/server";
import { useAuth } from "../contexts/auth-context";

export default function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    const isProtected = request.nextUrl.pathname.startsWith("/dashboard");

    // if (isProtected && !user) {
    //     return NextResponse.redirect(new URL("/login", request.url));
    // }

    return NextResponse.next();
}
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/dashboard"
    ]
}