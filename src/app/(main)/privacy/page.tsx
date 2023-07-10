import Navigation from '@/components/Navigation'
import Link from 'next/link'

const Page = () => {
  return (
    <>
      <Navigation current='privacy' />
      <div className='my-[4%] mx-[8%] sm:mx-[20%]'>
        <h1 className='font-bold text-xl mb-3'>Privacy Policy</h1>
        <p className='mb-1'>By using Track Tracker, the user acknowledges that you have read and understood this Privacy Policy. You consent to the collection, use, and sharing of your information as described in this Privacy Policy. </p>
        <p className='italic'>Disclaimer: Track Tracker utilizes the Spotify Web API, but is otherwise not affiliated with Spotify in any way. Album art and other metadata belong to Spotify.</p> <br />

        <h2 className='font-bold mb-2'>I. Information Collection and Use</h2>
        <p className='mb-1'>When you use Track Tracker, we collect your Spotify account's public profile to create a designated path within the Track Tracker website. Additionally, we collect information about the track you are currently listening to on Spotify to display it on your personalized Track Tracker page.</p>
        <p className='mb-1'>We store basic information about your account, as well as your customization options, on a third-party service. This information is securely stored and is necessary for Track Tracker to operate. Your listening history is not stored. Users can revoke Track Tracker's access and delete their stored data at any time. Please visit our <Link href='/faq' className='underline'>FAQ</Link> for a more detailed guide.</p> <br />

        <h2 className='font-bold mb-2'>II. Contact</h2>
        <p>If you have any questions, concerns, or inquiries regarding your information or this Privacy Policy, please contact contactrorysprojects@gmail.com.</p> <br />

        <h2 className='font-bold mb-2'>III. Cookies</h2>
        <p>Track Tracker uses strictly necessary session cookies. We do not allow third parties to place cookies on users' browsers in order to collect information about their browsing activities.</p> <br />

        <p>We reserve the right to update or modify this Privacy Policy at any time to reflect meaningful updates. Any changes made to the Privacy Policy will be effective immediately upon posting the updated version. It is the user's responsibility to review the Privacy Policy periodically for any updates or changes.</p>
      </div>
    </>
  )
}

export default Page