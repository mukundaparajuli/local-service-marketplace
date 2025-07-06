import { NextResponse } from "next/server"
import { NextRequest } from "next/server"
import { getMyProfile } from "../actions/get-myprofile"

type User = {
    id: string;
    email: string;
    role: string;
}

const privateRoutes = ["/dashboard", "/provider/dashboard"]

export async function middleware(request: NextRequest) {
    if (privateRoutes.includes(request.nextUrl.pathname)) {
        console.log("Protected route detected:", request.nextUrl.pathname)
        const user: User | null = await getMyProfile()
        console.log("User profile result:", user)
        if (user === null) {
            console.log("No user found, redirecting to login")
            return NextResponse.redirect(new URL("/login", request.url))
        }
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ]
}       