import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import connect from "@/utils/db";

export async function POST(request: Request) {
  await connect();
  let allUsers: any;
  const session = await getServerSession(authOptions);
  const sessionUser = await User.findOne({ email: session?.user.email });
  const homeURL = new URL('/', request.url)
  if (sessionUser.userType && sessionUser.userType=== "admin") {
    try {
      await User.find({}).then((data) => {
        allUsers = data;
      });

      const userResponce = allUsers.map(
        (user: { username: string; email: string }) => {
          return { name: user.username, email: user.email };
        }
      );
   

      return NextResponse.json({ users: userResponce }, { status: 200 });
    } catch (error) {
      console.log(error);
    }
  }
  else{
 
  }
}
