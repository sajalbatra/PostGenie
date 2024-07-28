import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dotenv from "dotenv";

dotenv.config();

const clientId = process.env.Client_ID as string;
const clientSecret = process.env.Client_secret as string;
const secret = process.env.NEXTAUTH_SECRET as string; 

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId,
            clientSecret
        })
    ],
    secret, 
});

export { handler as GET, handler as POST };
