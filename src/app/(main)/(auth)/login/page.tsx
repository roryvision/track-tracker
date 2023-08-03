'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
  async function loginWithSpotify() {
    try {
      await signIn('spotify', { callbackUrl: '/edit' })
    } catch (error) {
      return new Response('Error', { status: 400 })
    }
  }

  return (
    <div className='h-screen w-screen overflow-hidden flex flex-col justify-around items-center bg-gradient-to-b from-midnight from-20% via-[#17423A] to-tt-mint'>
      <p className='text-center px-8'>By proceeding, you agree to Track Tracker's privacy policy — you can read it in full <Link href='/privacy' className='underline'>here</Link>.</p>
      <div className='w-fit rounded-full p-2 bg-gradient-to-r from-tt-blue via-tt-mint to-tt-green hover:cursor-pointer'>
        <div onClick={loginWithSpotify}
          className='inline-block bg-gradient-to-b from-[#0C211D] via-[#17423A] to-[#236257] rounded-full p-4 sm:p-8'>
          <div className='flex justify-around'>
            <Image
              src='/spotify_logo-white.png'
              alt='Spotify logo in white'
              width={39}
              height={39}
              priority
              className='mr-5'
            />
            <p className='mx-0 my-auto text-xl sm:text-4xl font-semibold'>CONNECT WITH SPOTIFY</p>
          </div>
        </div>
      </div>
      <p className='w-1/2 text-center text-midnight opacity-50 text-xs sm:text-sm'>Track Tracker securely stores only the information necessary to find your currently playing song — no emails, passwords, previous listening history, etc. You can always revoke our access any time in your own Spotify settings.</p>
    </div>
  )
}

export default Page;