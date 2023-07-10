import dbConnect from "@/lib/dbConnect";
import Display from "@/models/display";
import User from '@/models/user';
import { NextResponse } from "next/server";

interface routeProps {
  params: {
    userId: string;
  }
}

export async function GET(req: Request, { params }: routeProps) {
  const { userId } = params;
  await dbConnect();

  const user = await User.find({ user: userId });
  if (user.length <= 0) {
    return new Response("User does not exist", { status: 404 });
  }

  const data = await Display.find({ user: userId });

  if(data.length <= 0) {
    const display : DisplayInfo = {
      orientation: 'horizontal',
      color_bg: '#191414',
      color_text: '#ffffff',
      progress: true,
      rounded: false,
    }

    return NextResponse.json(display);
  }

  const display: DisplayInfo = {
    orientation: data[0].orientation,
    color_bg: data[0].color_bg,
    color_text: data[0].color_text,
    progress: data[0].progress,
    rounded: data[0].rounded,
  }

  return NextResponse.json(display);
}