import Image from 'next/image'
import Link from 'next/link'

export default async function Home() {
  return (
    <div className='h-screen w-screen overflow-hidden flex justify-around items-center bg-gradient-133 from-midnight from-30% via-tt-mint to-midnight'>
      <div className='md:ml-[10%] xl:ml-[20%]'>
        <h1 className='font-semibold text-8xl sm:text-9xl mb-8'>Track<br />Tracker</h1>
        <p className='mb-16 text-xl sm:text-2xl'>Display your listening activity with<br />a simple, customizable widget.</p>
        <Link href='/login'>
          <p className='inline-block italic text-lg after:content-[""] after:block after:h-[3px] after:mt-1 after:bg-gradient-to-r after:from-tt-blue after:via-tt-mint after:to-tt-green'>
            Get Started &#8594;</p>
        </Link>
        <p className='text-xs font-light mt-3'>
          <Link href='/privacy' className='hover:underline'>Privacy Policy</Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link href='/faq' className='hover:underline'>FAQ</Link>
        </p>
      </div>
      <div className='hidden md:block w-[40%] h-[832px] rotate-3 mt-12 ml-48'>
        <Image
          src='/example_sneakers.png'
          alt='Album cover for CHECKMATE by ITZY'
          width={321}
          height={411}
          className='absolute -top-60 max-w-none'
        />
        <Image
          src='/example_butterfly.png'
          alt='Album cover for XX by LOONA'
          width={321}
          height={411}
          priority
          className='absolute top-1/4 max-w-none'
        />
        <Image
          src='/example_am-i-dreaming.png'
          alt='Album cover for CHECKMATE by ITZY'
          width={321}
          height={411}
          className='absolute -bottom-60 max-w-none'
        />
      </div>
    </div>
  )
}