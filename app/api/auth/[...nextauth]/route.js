import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';


// documentation on next-auth:
// https://next-auth.js.org/getting-started/introduction

import User from '@models/user';
import { connectToDB } from "@utils/database";

// console.log({
//   clientId: process.env.GOOGLE_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// });

// to handle our authentications, we create a handler.
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  async session( {session} ) {
    // for session to exist, we first need to sign the user in.
    const sessionUser = await User.findOne( {
      email: session.user.email
    })

    session.user.id = sessionUser._id.toString();

    return session;
  },
  async signIn ( { profile } ) {
    // every nextjs routeModule, is known as a serverless route, which means this is a lambda function, that opens up only when its called

    try {
      await connectToDB();

      // check if a user already exists, to create one we will have to create a function.
      const userExists = await User.findOne({
        email: profile.email
      });


      // if not, create a new user and save it to the database.
      if (!userExists) {
        await User.create ({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture
        })
      }

      return true;

    } catch (error) {

      console.log(error);
      return false;
    }
  }
})

export { handler as GET, handler as POST };

// EXPORT IS ACCORDING TO THE NEXTJS DOC