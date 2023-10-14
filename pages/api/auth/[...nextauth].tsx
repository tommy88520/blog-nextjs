import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any): Promise<any> {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection('users');
        const user: any = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();

          throw new Error('No user found!');
        }
        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          client.close();
          return null;
          // throw new Error('Could not log you in!');
        }
        client.close();
        // return user;
        return { email: user.email };
      },
    }),
    // CredentialsProvider({
    // async authorize(credentials: any, req) {
    //   const client = await connectToDatabase();
    //   const usersCollection = client.db().collection('users');
    //   const user = await usersCollection.findOne({
    //     email: credentials.email,
    //   });
    //   if (!user) {
    //     client.close();
    //     throw new Error('No user found!');
    //   }
    //   const isValid = await verifyPassword(credentials.password, user.password);
    //   if (!isValid) {
    //     client.close();
    //     throw new Error('Could not log you in!');
    //   }
    //   client.close();
    //   return { email: user.email };
    // },
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      console.log(token);
      return token;
    },
    async session({ session, token, user }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      console.log('session', session);
      return session;
    },
  },
});
