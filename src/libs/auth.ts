import { NextAuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import sanityClient from "./sanity";

export const authOptions: NextAuthOptions ={
    providers: [
        GithubProvider({
            clientId: process.env.GIT_HUB_CLIENT_ID as string,
            clientSecret: process.env.GIT_HUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GIT_HUB_CLIENT_ID as string,
            clientSecret: process.env.GIT_HUB_CLIENT_SECRET as string,
        }),
        SanityCredentials(sanityClient),
    ],
    session: {
        strategy: 'jwt',
    },
    adapter: SanityAdapter(sanityClient),
    debug: process.env.Node_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        session: async ({ session, token }) => {
            const userEmail = token.email;
            const userIdObj = await sanityClient.fetch<{ _id: string }>(
                `*[_type == "user" && email == $email][0]{ _id }`,
                { email: userEmail }
            );
            console.log("user", userIdObj);

            return {
                ...session,
                user: {
                    ...session.user,
                    id: userIdObj?._id || null,
                },
            };
        },
    },

}
