import dbConnect from '@/lib/dbConnect';
import { getSpotifyCredentials } from '@/lib/spotify-auth';
import Display from '@/models/display';
import User from '@/models/user';
import axios from 'axios';

const getNewToken = async (refresh_token: string, user: string): Promise<string> => {
  await dbConnect();

  try {
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      },
      {
        headers: {
          Authorization: `Basic ${getSpotifyCredentials().authBasic}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )

    await User.updateOne(
      { user: user },
      {
        refresh_token: refresh_token,
        access_token: data.access_token,
      }
    )

    return data.access_token;
  } catch (error) {
    // user has revoked access so we must delete them from the database
    await User.deleteMany({ user: user });
    await Display.deleteMany({ user: user });

    return 'Invalid refresh token';
  }
}

export default getNewToken;