import Navigation from '@/components/Navigation'
import Link from 'next/link'

const Page = () => {
  return (
    <>
      <Navigation current='error' />
      <div className='mt-[10%] mx-[8%] sm:mx-[20%]'>
        <h1 className='text-8xl mb-6 font-semibold bg-gradient-to-r from-tt-blue via-tt-mint to-tt-green bg-clip-text text-transparent w-fit'>OH NO!</h1>
        <p className='text-xl'>There appears to be an error. You can attempt to revoke Track Tracker's access in your <a href='https://www.spotify.com/account/apps/' rel='noopener noreferrer' className='underline'>Spotify app</a> and then <Link href='/'>log in</Link> again. If that doesn't resolve it, then the issue may be on our end. Server wide issues will be investigated as soon as possible, so please check back soon!</p>
        <br /><br /><br />
        <h2 className='font-bold'>Current Issues</h2>
        <p>We are not aware of any server wide issues at this moment.</p>
      </div>
    </>
  )
}

export default Page