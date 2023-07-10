import User from '@/models/user';
import axios from 'axios';
import { NextAuthOptions } from "next-auth";
import { JWT } from 'next-auth/jwt';
import SpotifyProvider from "next-auth/providers/spotify";
import dbConnect from './dbConnect';

export const getSpotifyCredentials = () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("Missing SPOTIFY_CLIENT_ID");
  }

  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Missing SPOTIFY_CLIENT_SECRET");
  }

  const authBasic : string = Buffer.from(
    `${clientId}:${clientSecret}`
  ).toString("base64");

  return { clientId, clientSecret, authBasic };
}

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const { data } = await axios.post("https://accounts.spotify.com/api/token", 
    {
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,  
    },
    {
      headers: {
        Authorization: `Basic ${getSpotifyCredentials().authBasic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: data.expires_in,
    }
  } catch (error) {
    return{
      ...token,
      error: "Invalid refresh token"
    }
  }
}

const addUserToMongo = async (user: string, refresh_token: string, access_token: string) => {
  await dbConnect();

  try {
    const userExists = await User.find({ user: user });
    const tokenExists = await User.find({ refresh_token: refresh_token });

    // each refresh token is unique and we can assume that if the token exists then there is an accompanying user
    // we only need to replace the user if their token is invalid because they revoked access
    if (tokenExists.length > 0) {
      return new Response("User and token are valid", { status: 200 });
    }

    // if the user exists and they have a new token (because of re-granting app access) then we need to update the db
    if (userExists.length > 0) {
      await User.updateOne(
        { user: user },
        {
          refresh_token: refresh_token,
          access_token: access_token,
        }
      )
      return new Response("OK", { status: 200 });
    }

    // otherwise we can assume the user is new
    await User.create({ user, refresh_token, access_token });
    return new Response("Created", { status: 201 });
  } catch (error) {
    console.log(error);
    return new Response("Invalid request", { status: 400 });
  }
}

const scopes = [
  // "user-read-email",
  "user-read-currently-playing",
  // "user-read-playback-state",
]

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    SpotifyProvider({
      clientId: getSpotifyCredentials().clientId,
      clientSecret: getSpotifyCredentials().clientSecret,
      authorization:
        "https://accounts.spotify.com/authorize?scope=" + scopes.toString(),
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if(account && user) {
        addUserToMongo(user.id!, account.refresh_token!, account.access_token!);

        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          // access tokens expire after an hour
          accessTokenExpires: account.expires_at,
          user,
        }
      }
      // if the access token has not yet expired (1 hour)
      if(token.accessTokenExpires && (Date.now() < token.accessTokenExpires * 1000)) {
        return token;
      }
      // otherwise get a new access token with the refresh token
      const newToken = await refreshAccessToken(token);
      return newToken;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      session.user = token.user;
      return session;
    },
  },
};
