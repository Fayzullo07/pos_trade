import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const config = {
    pages: {
        signIn: '/login',
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                login: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
                role: { label: "role", type: "text" }
            },
            authorize(c: any) {
                if (!c?.login || !c.password) return null;
                const user = { id: "1", name: c.login, role: "admin77", password: c.password }
                return user
            },
        }),
    ],
    callbacks: {
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl
            if (pathname === "/") return !!auth
            return true
        }
    },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)