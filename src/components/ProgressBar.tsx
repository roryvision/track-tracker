'use client'

import { FC, useEffect, useState } from 'react'

interface ProgressBarProps {
  progress: number;
  duration: number;
  color: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ progress, duration, color }) => {
  const [currentTime, setCurrentTime] = useState<number>(progress);

  useEffect(() => {
    setCurrentTime(progress);
  }, [progress])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(prevTime => prevTime + 1000);
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <div className='relative h-full w-full'>
      <div style={{
        backgroundColor: color,
        width: `${(currentTime / duration) > 1 ? 100 : (currentTime / duration) * 100}%`,
        height: '100%',
        transition: 'width 1s ease-in-out',
        zIndex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
      }}></div>
      <div style={{
        backgroundColor: color,
        opacity: 0.5,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}></div>
      </div>
  )
}

export default ProgressBar