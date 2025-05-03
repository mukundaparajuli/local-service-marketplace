import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"


export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    console.log(credentials);
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify(credentials),
                    });
                    const data = await res.json();
                    console.log(data);
                    const user = {

                    }
                    console.log("mapped user=", user);

                    return user;

                } catch (error) {
                    console.log("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {

    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.AUTH_SECRET,
});