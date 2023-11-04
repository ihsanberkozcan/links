import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = await User.findOne({ email: session?.user.email });

    if (sessionUser) {
      const linksBackgroundColor = sessionUser.linksBackgroundColor;
      const descriptionTextColor = sessionUser.descriptionTextColor;
      const linksTextColor = sessionUser.linksTextColor;
      const pageBackgroundColor = sessionUser.pageBackgroundColor;

      return NextResponse.json(
        {
          linksBackgroundColor,
          descriptionTextColor,
          linksTextColor,
          pageBackgroundColor,
        },
        { status: 200 }
      );
    } else if (sessionUser) {
      return NextResponse.json({ message: "Error" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = await User.findOne({ email: session?.user.email });
    const keyName = Object.keys(body)[0];
    const update = body[keyName];
    const checkHex = /^#([0-9a-fA-F]{6})$/.test(update);
    if (sessionUser && checkHex) {
      sessionUser[keyName] = update;
      sessionUser.save();
      return NextResponse.json({ updated: keyName }, { status: 200 });
    } else if (sessionUser) {
      return NextResponse.json({ message: "Error" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }
}
