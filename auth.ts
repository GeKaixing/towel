import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, auth } = NextAuth({
  providers: [GitHub],
})