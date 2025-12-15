import axios from "axios";
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
// Your own logic for dealing with plaintext password strings; be careful!

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
                        {
                            username: credentials.username,
                            password: credentials.password,
                        },
                        {
                            headers: { "Content-Type": "application/json" },
                            timeout: 10000,
                        }
                    );

                    const user = res.data;

                    console.log(user)

                    if (user && user.id) {
                        // Return object แบบปลอดภัยโดยไม่เอา password
                        return {
                            id: user.id.toString(),   // แปลง id เป็น string
                            username: user.username,
                            name: user.name,
                            email: user.email,
                            role: user.role,          // ถ้าต้องใช้ role ใน session]
                            atb: user.atb,

                        };
                    }

                    return null; // login fail
                } catch (err) {
                    console.error("Authorize error:", err);
                    return null;
                }
            }

        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            // user object exists on first sign in
            if (user) {
                token.role = user.role;
                token.atb = user.atb;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            // attach custom fields from token to session
            session.user.role = token.role as string
            session.user.atb = token.atb as string
            session.user.username = token.username as string
            return session;
        }
    }
})