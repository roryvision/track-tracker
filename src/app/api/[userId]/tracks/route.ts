import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';
import getNewToken from '@/utils/getNewToken';
import axios from 'axios';
import { NextResponse } from 'next/server';

interface routeProps {
  params: {
    userId: string,
  }
}

export async function GET(req: Request, { params }: routeProps) {
  const { userId } = params;
  await dbConnect();

  const tokens = await User.find({ user: userId });
  let token = tokens[0].access_token;

  const result: any = async () => {
    try {
      const data = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )

      if (data.status === 204) {
        return 204;
      }

      return data.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        token = await getNewToken(tokens[0].refresh_token, userId);

        const data = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (data.status === 204) {
          return 204;
        }

        return data.data;
      }

      return new Response("Error for unknown reason", { status: 400 });
    }
  }

  const currentlyPlaying = await result();
  if (currentlyPlaying === 204 || !currentlyPlaying.is_playing) {
    // NextJS has a bug where we cannot handle 204 so use 404 for now
    return new Response("Not playing", { status: 404 });
  }

  if(currentlyPlaying.is_playing) {
    if(currentlyPlaying.currently_playing_type === 'track') {
      const track: TrackData = {
        album_img: currentlyPlaying.item.album.images[0].url,
        album_link: currentlyPlaying.item.album.external_urls.spotify,
        song: currentlyPlaying.item.name,
        song_link: currentlyPlaying.item.external_urls.spotify,
        artist: currentlyPlaying.item.artists[0].name,
        artist_link: currentlyPlaying.item.artists[0].external_urls.spotify,
        progress: currentlyPlaying.progress_ms,
        duration: currentlyPlaying.item.duration_ms,
      }

      return NextResponse.json(track);
    } else {
      return new Response("Not playing", { status: 404 });
    }
  }

  return new Response("Error for unknown reason", { status: 400 });
}