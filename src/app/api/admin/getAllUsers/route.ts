import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import connect from "@/utils/db";

export async function POST(request: Request) {
  const body = await request.json();
  await connect();
  let allUsers: any;
  const searchText = body.searchText;
  const session = await getServerSession(authOptions);
  const sessionUser = await User.findOne({ email: session?.user.email });
  const homeURL = new URL("/", request.url);
  if (sessionUser.userType && sessionUser.userType === "admin") {
    try {
      if (searchText) {

        await User.find({
          $or: [{ username: { $regex: searchText, $options: 'i' } }, { email: { $regex: searchText, $options: 'i' }}],
        }).then((data) => {
          allUsers = data;
        });
      } else {
        await User.find({}).then((data) => {
          allUsers = data;
        });
      }

      const userResponce = allUsers.map(
        (user: { _id: any; username: string; email: string,isBanned: boolean }) => {
          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email,
            isBanned: user.isBanned
          };
        }
      );

      return NextResponse.json({ users: userResponce }, { status: 200 });
    } catch (error) {
      console.log(error);
    }
  } else {
  }
}
