import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = await User.findOne({ email: session?.user.email });
    let radius;
    if (sessionUser) {
      radius = sessionUser.borderRadius;

      return NextResponse.json({ radius: radius }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 404 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  const roundedRegex =
    /(rounded-none|rounded-sm|rounded-md|rounded-xl|rounded-2xl|rounded-3xl)/;
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = await User.findOne({ email: session?.user.email });
    const radius = body.radius;
    if (radius && sessionUser) {
      if (roundedRegex.test(radius)) {
        sessionUser.borderRadius = radius;
        sessionUser.save();
        return NextResponse.json(
          { message: "Radius Updated" },
          { status: 200 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 404 });
  }
}
