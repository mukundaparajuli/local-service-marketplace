import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { getMyProfile } from "../actions/get-myprofile"

type User = {
    id: string;
    email: string;
    role: string;
}

const privateRoutes = ["/dashboard", "/provider"]

export async function middleware(request: NextRequest) {
    console.log("=== Middleware Debug ===")
    console.log("Request URL:", request.url)
    console.log("Pathname:", request.nextUrl.pathname)
    console.log("Method:", request.method)

    if (privateRoutes.includes(request.nextUrl.pathname)) {
        console.log("new")
        console.log("Protected route detected:", request.nextUrl.pathname)
        const user: User | null = await getMyProfile()
        console.log("User profile result:", user)
        if (user === null) {
            console.log("No user found, redirecting to login")
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }

    if (request.nextUrl.pathname === '/') {
        console.log("Root path detected, redirecting to dashboard")
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    console.log("=== Middleware Complete ===")
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}       