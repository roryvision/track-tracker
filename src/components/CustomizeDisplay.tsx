'use client'

import { useRouter } from 'next/navigation';
import { FC, useState } from 'react'
import Image from 'next/image';
import styles from './preview.module.css';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { colord } from 'colord';

interface CustomizeDisplayProps {
  user: string,
}

const CustomizeDisplay: FC<CustomizeDisplayProps> = ({ user }) => {
  const [orientation, setOrientation] = useState<string>('horizontal');
  const [colorBg, setColorBg] = useState<string>('#191414');
  const [colorText, setColorText] = useState<string>('#ffffff');
  const [showProgress, setShowProgress] = useState<boolean>(true);
  const [showRounded, setShowRounded] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    const buttonPressed = (e.nativeEvent.submitter as HTMLInputElement).name;

    if (buttonPressed === 'custom') {
      await fetch('/api/db/displays', {
        method: 'POST',
        body: JSON.stringify({ colorBg, colorText, showProgress, showRounded }),
      })
    } else if (buttonPressed === 'default') {
      await fetch('/api/db/displays', {
        method: 'DELETE',
      })
    }

    router.push(`/${user}`);
  }

  return (
    <div className='flex flex-row flex-wrap justify-around justify-items-center'>
      <div className='hidden md:flex flex-col justify-center items-center flex-grow h-screen bg-gradient-to-t from-midnight from-20% to-tt-mint'>
        <div id='preview'
          className={
            `${styles.preview}
            ${orientation === 'horizontal' ? styles['preview-horizontal'] : styles['preview-vertical']}
            ${showRounded ? 'rounded-lg' : 'rounded-none'}`}
          style={{ backgroundColor: colorBg }}>
          <div className={`${orientation === 'horizontal' ? 'm-5' : 'm-7 mb-5'}`}>
            <Image
              src='/loona_xx.jpg'
              alt='Album cover for XX by LOONA'
              width={`${orientation === 'horizontal' ? 200 : 260}`}
              height={`${orientation === 'horizontal' ? 200 : 260}`}
              priority
            />
          </div>
          <div className={
            `${'flex items-center'}
            ${orientation === 'horizontal' ? 'mx-4' : 'mx-7'}`}>
            <div style={{ color: colorText }}>
              <p className='text-3xl font-semibold'>Butterfly</p>
              <p className={`${'text-xl'}
                ${orientation === 'vertical' && !showProgress ? 'mb-6' : 'mb-0'}`}>
                LOONA</p>
              <div style={{ backgroundColor: colorText }}
                className={
                  `${'h-0.5 rounded-full mt-4'}
                ${orientation === 'horizontal' ? 'w-96' : 'w-64 mb-8'}
                ${showProgress ? 'block' : 'hidden'}
                `}></div>
            </div>
          </div>
          <div className={
            `${'absolute'}
            ${orientation === 'horizontal' ? 'top-5 right-5' : 'right-8'}
            ${showProgress ? 'bottom-24' : 'bottom-16'}`}>
              <Image
                src='/spotify_logo-white.png'
                alt='Spotify logo in white'
                width={21}
                height={21}
                className={colord(colorBg).brightness() < 0.7 ? 'block' : 'hidden'}
              />
              <Image
                src='/spotify_logo-black.png'
                alt='Spotify logo in black'
                width={21}
                height={21}
                className={colord(colorBg).brightness() >= 0.7 ? 'block' : 'hidden'}
              />
          </div>
        </div>
        <p className='text-center text-moonlight text-opacity-50 text-sm italic m-2 absolute bottom-28'>This is just a demo—your final widget will be resizable and will feature your currently playing track!</p>
      </div>

      <div className='flex justify-center items-center m-16'>
        <form onSubmit={handleSubmit}>
          <div className='relative'>
            <h2 className={styles['section-heading']}>Orientation</h2>

            <label htmlFor='edit-horizontal'>
              <input type='radio' name='orientation' value='horizontal' id='edit-horizontal'
                className='hidden peer'
                checked={orientation === 'horizontal'}
                onChange={() => setOrientation('horizontal')} />
              <span
                className='inline-block w-28 py-1.5 md:w-32 md:py-2.5 border rounded border-solid border-moonlight border-opacity-50 text-center  text-moonlight hover:border-opacity-100 peer-checked:bg-moonlight peer-checked:text-midnight transition mr-4'>
                Horizontal
              </span>
            </label>

            <label htmlFor='edit-vertical'>
              <input type='radio' name='orientation' value='vertical' id='edit-vertical'
                className='hidden peer'
                checked={orientation === 'vertical'}
                onChange={() => setOrientation('vertical')} />
              <span
                className='inline-block w-28 py-1.5 md:w-32 md:py-2.5 border rounded border-solid border-moonlight border-opacity-50 text-center  text-moonlight hover:border-opacity-100 peer-checked:bg-moonlight peer-checked:text-midnight transition'>
                Vertical
              </span>
            </label>

            <p className='text-opacity-50 text-xs mt-0.5'>*This is for previewing purposes — your widget will automatically adjust</p>
          </div>

          <br />

          <div className='relative'>
            <h2 className={`${styles['section-heading']} inline`}>Color</h2>
            <Image
              src={'/reset_icon.svg'}
              alt='Reset button for colors'
              width={18}
              height={18}
              className='inline mb-2 mx-2 cursor-pointer'
              onClick={() => {
                setColorBg('#191414')
                setColorText('#ffffff')
              }}
            />
            <div className='flex flex-wrap'>
              <div>
                <span>Background</span>
                <HexColorInput color={colorBg} onChange={setColorBg} className='text-moonlight text-center bg-transparent border-b border-solid border-moonlight w-16 mx-2' />
                <HexColorPicker color={colorBg} onChange={setColorBg} className='mr-10 my-2' />
              </div>
              <div>
                <span>Text</span>
                <HexColorInput color={colorText} onChange={setColorText} className='text-moonlight text-center bg-transparent border-b border-solid border-moonlight w-16 mx-2' />
                <HexColorPicker color={colorText} onChange={setColorText} className='my-2' />
              </div>
            </div>
          </div>

          <br />

          <div className='relative'>
            <h2 className={styles['section-heading']}>Other</h2>
            <div>
              <input type='checkbox' name='other' value='progress' id='edit-progress'
                className='appearance:none text-midnight bg-midnight border-moonlight rounded focus:ring-0 focus:border-moonlight checked:border-moonlight mr-1'
                checked={showProgress}
                onChange={() => { setShowProgress(!showProgress) }} />
              <label htmlFor='edit-progress'>Progress bar</label>
            </div>
            <div>
              <input type='checkbox' name='other' value='rounded' id='edit-rounded'
                className='appearance:none text-midnight bg-midnight border-moonlight rounded focus:ring-0 focus:border-moonlight checked:border-moonlight mr-1'
                checked={showRounded}
                onChange={() => { setShowRounded(!showRounded) }} />
              <label htmlFor='edit-rounded'>Rounded edges</label>
            </div>
          </div>

          <hr className='mt-12 mb-6' />
          <div>
          <button type='submit' name='custom'
            className='text-3xl font-semibold float-right hover:underline'>
            FINISH
          </button>
          <button type='submit' name='default'
            className='float-right clear-both hover:underline'>
            or use default
          </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomizeDisplay