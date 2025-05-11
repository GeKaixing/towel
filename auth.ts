import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],


  //   callbacks: {
  //   async jwt({ token, account }) {
  //   console.log('token',token)
  //     if (account) {
  //       token.accessToken = account.access_token
  //     }
  //     return token
  //   },
  //   async session({ session, token }) {
  //     console.log('session',session)
  //     session.accessToken = token.accessToken
  //     return session
  //   },
  // },

})