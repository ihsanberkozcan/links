import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import connect from "@/utils/db";
import RestrictedUsername from "@/models/RestrictedUsername";

export async function POST(request: Request) {
  const body = await request.json();
  await connect();
  let allRestrictedUsername: any;
  const session = await getServerSession(authOptions);
  const sessionUser = await User.findOne({ email: session?.user.email });
  const homeURL = new URL("/", request.url);
  if (sessionUser.userType && sessionUser.userType === "admin") {
    try {
      const RestrictedUsernameExist = await RestrictedUsername.findOne({
        username: body.RestrictedUsername,
      });
      if (!RestrictedUsernameExist) {
        RestrictedUsername.create({
          username: body.RestrictedUsername,
        });
        return NextResponse.json(
          { message: "RestrictedUsername created" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "RestrictedUsername not created" },
          { status: 409 }
        );
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    return NextResponse.json({ message: "Error" }, { status: 401 });
  }
}

export async function GET(request: Request) {
  await connect();
  let allRestrictedUsername: any;
  const session = await getServerSession(authOptions);
  const sessionUser = await User.findOne({ email: session?.user.email });
  const homeURL = new URL("/", request.url);
  if (sessionUser.userType && sessionUser.userType === "admin") {
    try {
      await RestrictedUsername.find({}).then((data) => {
        allRestrictedUsername = data;
      });

      return NextResponse.json(
        { allRestrictedUsername: allRestrictedUsername },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();
  await connect();

  const session = await getServerSession(authOptions);
  const sessionUser = await User.findOne({ email: session?.user.email });
  const homeURL = new URL("/", request.url);
  if (sessionUser.userType && sessionUser.userType === "admin") {
    try {
      const RestrictedUsernameExist = await RestrictedUsername.findOne({
        username: body.RestrictedUsername,
      });
      if (RestrictedUsernameExist) {
        try {
          await RestrictedUsername.findOneAndDelete({
            username: body.RestrictedUsername,
          });
          return NextResponse.json(
            { message: "RestrictedUsername deleted" },
            { status: 200 }
          );
        } catch (error) {
          console.log(error);
          return NextResponse.json(
            { message: "RestrictedUsername can not deleted" },
            { status: 404 }
          );
        }
    
      } else {
        return NextResponse.json(
          { message: "RestrictedUsername not deleted" },
          { status: 409 }
        );
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    return NextResponse.json({ message: "Error" }, { status: 401 });
  }
}
