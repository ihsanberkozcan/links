import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
  let links;
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = await User.findOne({ email: session?.user.email });
    links = sessionUser?.links;
  } catch (error) {
    console.log("Error");
  }

  return NextResponse.json({
    links: links,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = await User.findOne({ email: session?.user.email });
    let newLink;
    if (body.urlDesc && body.url) {
      newLink = {
        urlDesc: body.urlDesc,
        url: body.url,
      };

      sessionUser?.links.push(newLink);
    } else if (body.desc) {
      sessionUser.desc = body.desc;
    }

    sessionUser.save();
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({ message: "Link Created" }, { status: 201 });
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = await User.findOne({ email: session?.user.email });
    const body = await request.json();
    if (sessionUser?.links[body.index]) {
      sessionUser?.links.splice(body.index, 1);
      sessionUser.save();
      return NextResponse.json({ message: "Link Deleted" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Error" }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
  }
}
