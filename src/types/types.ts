interface TrackData {
  album_img: string
  album_link: string
  song: string
  song_link: string
  artist: string
  artist_link: string
  progress: number
  duration: number
}

interface DisplayInfo {
  orientation: string
  color_bg: string
  color_text: string
  progress: true
  rounded: boolean
}