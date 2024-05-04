// import NextAuth from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import connectMongoDB from "@/lib/mongodb";
// import User from "@/models/userModel";
// import bcrypt from "bcryptjs";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//     providers: [
//         Credentials({
//             credentials: {
//                 login: { label: "username", type: "text", required: true },
//                 password: { label: "password", type: "password", required: true },
//             },
//             authorize(credentials) {
//                 if (!credentials?.login || !credentials.password) return null;

//                 try {
//                     //     const res = await fetch(`/api/userExists`, {
//                     //         method: "POST",
//                     //         headers: { "Content-type": "application/json" },
//                     //         body: JSON.stringify({
//                     //             username: credentials.login,
//                     //             password: credentials.password,
//                     //         }),
//                     //     });

//                     //     const user = await res.json();
//                     //     console.log(res);

//                     //     if (res.ok && user) {

//                     //         return user;
//                     //     }
//                     //     return null;
//                     return {
//                         name: "Fill Murray",
//                         email: "bill@fillmurray.com",
//                         image: "https://www.fillmurray.com/64/64",
//                         id: "1",
//                     };
//                 } catch (error) {
//                     console.log(error);
//                 }
//             },
//         }),
//     ],
//     callbacks: {
//         authorized(params) {
//             return !!params.auth?.user;
//         },
//     },
//     session: {
//         strategy: 'jwt'  // Using JSON Web Tokens for session strategy
//     },
//     secret: process.env.NEXTAUTH_SECRET,  // Secret used to encrypt the JWT
//     pages: {
//         signIn: "/login"  // Custom sign-in page path
//     }

// })