import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
    console.log("middleware trigerred")
    const token = request.cookies.get("token")?.value;
    console.log(token);
    const allCookies = request.cookies.getAll()
    console.log(allCookies)
    const isProtected = request.nextUrl.pathname.startsWith("/dashboard");

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/dashboard"
    ]
}