import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request: Request) {}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = await User.findOne({ email: session?.user.email });

    const source = body.Source;
    const destination = body.Destination;

    if (sessionUser?.links) {
      const [removed] = sessionUser?.links?.splice(source, 1);
      sessionUser?.links.splice(destination, 0, removed);
      sessionUser.save();
      return NextResponse.json({ message: "ok" }, { status: 200 });
    } else if (sessionUser?.links) {
      return NextResponse.json({ message: "Error" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
  }
}
