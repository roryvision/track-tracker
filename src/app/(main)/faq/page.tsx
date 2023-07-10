import Navigation from '@/components/Navigation'
import Link from 'next/link'

const Page = () => {
  return (
    <>
      <Navigation current='faq' />
      <div className='my-[4%] mx-[8%] sm:mx-[20%]'>
        <h1 className='font-bold text-xl mb-3'>Frequently Asked Questions</h1>

        <h2 className='font-bold mb-2'>General Disclaimer</h2>
        <p>Track Tracker is powered by third party services. Most errors are likely due to rate limits that I cannot control. Because of such limits, I may have to increase the refresh time of song tracking as more people use this project. I apologize for any inconvenience!</p><br />

        <h2 className='font-bold mb-2'>How do I use Track Tracker?</h2>
        <ol className='list-decimal list-inside'>
          <li>Log in with your Spotify account <Link href='/login' className='underline'>here</Link>.</li>
          <li>After logging in, you will be brought to <Link href='/edit' className='italic bg-moonlight bg-opacity-30'>tracktracker.vercel.app/edit</Link>. You can either customize your widget or proceed with the default. Return anytime if you would to make changes.</li>
          <li>Track Tracker will create a pathname of your Spotify username: <span className='italic bg-moonlight bg-opacity-30'>tracktracker.vercel.app/<span className='text-tt-mint'>username</span></span></li>
          <li>Embed your designated URL anywhere you would like, such as your blog, using your chosen platform's embed options.</li>
        </ol><br />

        <h2 className='font-bold mb-2'>How do I embed my widget?</h2>
        <p>This depends on where you are embedding. For example, on Notion you would type <span className='italic'>/embed</span> and paste in your designated URL, then resize it directly in Notion. In general we suggest you embed an iframe instead of the direct URL, especially if you want rounded borders.</p>
        <code className='bg-moonlight bg-opacity-30'>
          {`<iframe src="YOUR-URL-HERE" width="720" height="240" frameborder="0" allowtransparency="true"></iframe>`}
        </code><br /><br />

        <h2 className='font-bold mb-2'>Does Track Tracker store any of my data?</h2>
        <p>By using our service, you consent to our <Link href='/privacy' className='underline'>Privacy Policy</Link>. We securely store some basic information about your Spotify account so you don't have to repeatedly log in every hour. The only thing we can do with this information is check for your currently playing track — that means no emails, passwords, etc.</p><br />

        <h2 className='font-bold mb-2'>How do I delete my data?</h2>
        <p>Click "Remove Access" next to Track Tracker in your <a href='https://www.spotify.com/account/apps/' rel='noopener noreferrer' className='underline'>Spotify app</a>. Then refresh your designated URL. This will let us know that you have revoked access and we will delete your stored data from our database.</p><br />
      </div>
    </>
  )
}

export default Page