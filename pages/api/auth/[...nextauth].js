// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";



// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         username: { label: "Username", type: "text", placeholder: "อีเมล" },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "รหัสผ่าน",
//         },
//       },
//       async authorize(credentials, req) {
//         const res = await fetch("https://www.melivecode.com/api/login", {
//           method: "POST",
//           body: JSON.stringify(credentials),
//           headers: { "Content-Type": "application/json" },
//         });
//         const data = await res.json();

//         if (data.status == "ok") {
//           return data.user;
//         }
//         return null;
//       },
//     }),
//   ],
//   secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
//   callbacks: {
//   async jwt({ token, account }) {
//     // Persist the OAuth access_token to the token right after signin
//     if (account) {
//       token.accessToken = account.access_token
//     }
//     return token
//   },
//   async session({ session, token, user }) {
//     // Send properties to the client, like an access_token from a provider.
//     session.accessToken = token.accessToken
//     return session
//   }
// }
// });

