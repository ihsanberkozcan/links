import { getServerSession } from "next-auth";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import RestrictedUsername from "@/models/RestrictedUsername";
export async function GET() {
  const session = await getServerSession(authOptions);
  const sessionUser = await User.findOne({ email: session?.user.email });

  return NextResponse.json({
    username: sessionUser.username,
    desc: sessionUser.desc,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const session = await getServerSession(authOptions);
  
  const sessionUser = await User.findOne({ email: session?.user.email });
  const username = body.username.toLowerCase();
  const userExist = await User.findOne({ username: username });
  const restrictedUsername = await RestrictedUsername.findOne({ username: username });
  if (!body.username) {
    return NextResponse.json(
      { message: "Username can not be empty" },
      { status: 400 }
    );
  } else if (!userExist && !restrictedUsername) {
    sessionUser.username = body.username;
    sessionUser.save();
    return NextResponse.json({ message: "Username Updated" }, { status: 201 });
  } else if(userExist){
    return NextResponse.json(
      { message: "That username is already taken" },
      { status: 400 }
    );
  }else if(restrictedUsername){
    return NextResponse.json(
      { message: "That username is restricted username" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    await User.findOneAndDelete({ email: session?.user.email });
    return NextResponse.json({ message: "User Deleted" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error" }, { status: 400 });
  }
}
