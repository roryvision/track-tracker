import Link from 'next/link'
import { FC } from 'react'

interface NavigationProps {
  current: string;
}

const Navigation: FC<NavigationProps> = ({ current }) => {
  return (
    <nav className='text-left sm:text-right mt-16 ml-[8%] sm:ml-0 sm:mr-24'>
      <Link href='/' className={`${current === 'home' ? 'inline-block after:content-[""] after:block after:h-0.5 after:bg-gradient-to-r after:from-tt-blue after:via-tt-mint after:to-tt-green' : 'hover:underline'}`}>Home</Link>
      <Link href='/privacy' className={`${'px-8'} ${current === 'privacy' ? 'inline-block after:content-[""] after:block after:h-0.5 after:bg-gradient-to-r after:from-tt-blue after:via-tt-mint after:to-tt-green' : 'hover:underline'}`}>Privacy Policy</Link>
      <Link href='/faq' className={`${current === 'faq' ? 'inline-block after:content-[""] after:block after:h-0.5 after:bg-gradient-to-r after:from-tt-blue after:via-tt-mint after:to-tt-green' : 'hover:underline'}`}>FAQ</Link>
    </nav>
  )
}

export default Navigation