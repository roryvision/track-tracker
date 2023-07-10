import CustomizeDisplay from '@/components/CustomizeDisplay'
import { authOptions } from '@/lib/spotify-auth';
import { getServerSession } from 'next-auth';

interface PageProps { }

const Page = async ({ }: PageProps) => {
  const session = await getServerSession(authOptions);
  // have to pass through middleware so we can assume it exists
  const userId: string = session?.user?.id!;

  return (
    <CustomizeDisplay user={userId} />
  )
}

export default Page