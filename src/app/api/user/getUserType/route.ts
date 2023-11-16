import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
export async function GET() {
    const session = await getServerSession(authOptions);
    const sessionUser = await User.findOne({ email: session?.user.email });
  sessionUser.userType
    return NextResponse.json({
      userType:   sessionUser.userType,

    });
  }