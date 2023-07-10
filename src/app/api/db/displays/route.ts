import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import Display from "@/models/display";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/spotify-auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if(!session) {
    return new Response("Unauthorized user", { status: 401 });
  }
  const user: string = session?.user?.id!;

  await dbConnect();

  try {
    const body = await req.json();

    if(!body) {
      return new Response("No body passed", { status: 400 });
    }

    const userExists = await User.find({ 'user': user });

    if(userExists.length > 0) {
      await Display.replaceOne(
        { 'user': user },
        { 
          'user': user,
          'orientation': body.orientation,
          'color_bg': body.colorBg,
          'color_text': body.colorText,
          'progress': body.showProgress,
          'rounded': body.showRounded,
        },
        { upsert: true },
      )

      return new Response("OK", { status: 200 });
    }

    return new Response("User does not exist", { status: 404 });
  } catch (error) {
    console.log(error);
    return new Response("Invalid request", { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if(!session) {
    return new Response("Unauthorized user", { status: 401 });
  }
  const user: string = session?.user?.id!;

  await dbConnect();

  try {
    const userExists = await User.find({ 'user': user });

    if(userExists.length > 0) {
      await Display.deleteOne({ 'user': user });

      return new Response("OK", { status: 200 });
    }

    return new Response("User does not exist", { status: 404 });
  } catch (error) {
    console.log(error);
    return new Response("Invalid request", { status: 400 });
  }
}