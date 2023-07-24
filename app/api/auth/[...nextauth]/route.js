import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import user from "@models/user";
import {connectToDB} from '@utils/database';

// console.log(
//     {clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,}
// )
const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
        async session({ session }){
            const sessionUser = await user.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({ profile }){
            try {
                await connectToDB();
                // check if user already exists in database
                const userExists = await user.findOne({ email: profile.email });
                // if not, create new user
                if (!userExists) {
                    await user.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    });
                }
                return true;
            } catch (error) {
                console. log('%c ERROR signIn({ profile }) ', 'background: #222; color: #bada55')
                console.log(error);
                return false;
            }
        }
    }
    
})

export { handler as GET, handler as POST}