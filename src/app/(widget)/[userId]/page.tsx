'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState, FC } from 'react';
import Image from 'next/image';
import { colord } from 'colord';
import styles from './widget.module.css';
import ProgressBar from '@/components/ProgressBar';

interface PageProps {
  params: {
    userId: string,
  }
}

const truncateSong = (song: string) => {
  return song.substring(0, 30) + '...';
}

const truncateArtist = (song: string) => {
  return song.substring(0, 40) + '...';
}

const Page: FC<PageProps> = ({ params }) => {
  const { userId } = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [orientation, setOrientation] = useState<string>('horizontal');
  const [colorBg, setColorBg] = useState<string>('#191414');
  const [colorText, setColorText] = useState<string>('#ffffff');
  const [showProgress, setShowProgress] = useState<boolean>(true);
  const [showRounded, setShowRounded] = useState<boolean>(false);

  const updateOrientation = () => {
    if (window.innerWidth / window.innerHeight > 1) {
      setOrientation('horizontal');
    } else {
      setOrientation('vertical');
    }
  }

  useEffect(() => {
    const abortController = new AbortController();

    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/${userId}`);

        if(res.status === 404) {
          router.push(`${process.env.NEXT_PUBLIC_SITE_URL}/error`);
        }

        const json = await res.json();
        setColorBg(json.color_bg);
        setColorText(json.color_text);
        setShowProgress(json.progress);
        setShowRounded(json.rounded);
      } catch (error) {
        console.log(error);
        router.push(`${process.env.NEXT_PUBLIC_SITE_URL}/error`);
      }
    }

    fetchUser();

    window.addEventListener('resize', updateOrientation);

    return () => {
      abortController.abort();
    }
  }, [])

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [data, setData] = useState<TrackData>();

  const getTrackAPI = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/${userId}/tracks`);

      if(!res.ok) {
        res.status === 404 ? setIsPlaying(false) : router.push(`${process.env.NEXT_PUBLIC_SITE_URL}/error`);
      } else {
        setIsPlaying(true);
        const json = await res.json();
        setData(json);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    setTimeout(async () => {
      await getTrackAPI();
    }, 0)

    const interval = setInterval(async () => {
      await getTrackAPI();
    }, 10000)

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <>
      <div 
        style={{ backgroundColor: colorBg, color: colorText }}
        className={
          `${'w-screen h-screen flex justify-center items-center overflow-hidden'}
          ${orientation === 'horizontal' ? 'flex-row' : 'flex-col'}
          ${showRounded ? 'rounded-lg' : 'rounded-none'}`}>
        <div className={`${orientation === 'horizontal' ? styles['image-h'] : styles['image-v']}`}>
          <a href={`${isPlaying ? data?.album_link : 'https://open.spotify.com'}`} 
            rel='noopener noreferrer'
            target='_blank'>
            <img 
              src={isPlaying ? data?.album_img : '/placeholder_not-playing.png'} 
              alt='Album cover of track'
              className='w-full bg-moonlight' /></a>
        </div>
        <div className={`${'w-2/3 flex flex-row justify-between'}
          ${orientation === 'horizontal' ? 'my-5' : 'mt-5'}`}>
          <div className={`${'inline-block w-full'}
            ${orientation === 'horizontal' ? styles['text-h'] : 'p-0'}`}>
            <a href={`${isPlaying ? data?.song_link : 'https://open.spotify.com'}`}
              rel='noopener noreferrer'
              target='_blank'
              className={`${styles.song}`}>
              {isPlaying ? (data?.song.length! > 23 ? truncateSong(data?.song!) : data?.song) : 'Not playing'}</a>
            <br />
            <a href={`${isPlaying ? data?.artist_link : 'https://open.spotify.com'}`}
              rel='noopener noreferrer'
              target='_blank'
              className={`${styles.artist}`}>
              {isPlaying ? (data?.artist.length! > 40 ? truncateArtist(data?.artist!) : data?.artist) : 'Play on Spotify'}</a>
            <br />
            <div className={
              `${'rounded-full h-0.5'}
              ${showProgress && isPlaying ? 'block' : 'hidden'}
              ${orientation === 'horizontal' ? styles['progress-h'] : styles['progress-v']}`}>
              {showProgress && isPlaying && !isLoading &&
                <ProgressBar
                  progress={isPlaying ? data?.progress! : 0}
                  duration={isPlaying ? data?.duration! : 237000}
                  color={colorText} />}
            </div>
          </div>
          <div className={`${'absolute'} 
            ${orientation === 'horizontal' ? 'right-[3%]' : 'right-[17%]'}`}>
            <a href='https://open.spotify.com' 
              rel='noopener noreferrer'
              target='_blank'>
              <Image
                src='/spotify_logo-white.png'
                alt='Spotify logo in white'
                width={21}
                height={21}
                priority
                className={colord(colorBg).brightness() < 0.7 ? 'block' : 'hidden'}
              /></a>
            <a href='https://open.spotify.com' 
              rel='noopener noreferrer'
              target='_blank'>
              <Image
                src='/spotify_logo-black.png'
                alt='Spotify logo in black'
                width={21}
                height={21}
                priority
                className={colord(colorBg).brightness() >= 0.7 ? 'block' : 'hidden'}
              /></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page;