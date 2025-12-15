// types/next-auth.d.ts
import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
      atb?: string
      username?: string
    }
  }

  interface User {
    role?: string
    atb?: string
    username?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    atb?: string
    username?: string
  }
}
