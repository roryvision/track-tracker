// Moved to API endpoint /api/[userId]/tracks/

import axios from "axios";
import getNewToken from "./getNewToken";

const getTrackInfo = async (
  refresh_token: string,
  access_token: string,
  user: string
): Promise<TrackData | Response > => {
  let token: string = access_token;

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

      if(data.status === 204) {
        return 204;
      }

      return data.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        token = await getNewToken(refresh_token, user);

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

      throw new Error("Error for unknown reason");
    }
  }

  const currentlyPlaying = await result();
  if(currentlyPlaying === 204) {
    throw new ReferenceError("Not playing");
  }

  if(currentlyPlaying.is_playing && currentlyPlaying.currently_playing_type === "track") {
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

    return track;
  }

  throw new Error("Error for unknown reason");
}

export default getTrackInfo;
