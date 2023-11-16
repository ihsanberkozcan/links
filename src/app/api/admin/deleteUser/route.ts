import User from "@/models/User";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import connect from "@/utils/db";
export async function DELETE(request: Request) {
  const body = await request.json();
  await connect();
  const session = await getServerSession(authOptions);
  const sessionUser = await User.findOne({ email: session?.user.email });

  if (sessionUser.userType && sessionUser.userType === "admin") {
    try {
      const userId = body.id;
      const user = await User.findById({ _id: userId });
      if (user.userType !== "admin") {
        await User.findByIdAndRemove({ _id: userId });

        return NextResponse.json({ message: "User Deleted" }, { status: 200 });
      }
      else{
        return NextResponse.json({ message: "cannot delete the admin user" }, { status: 404 });
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json({ message: "Error" }, { status: 404 });
    }
  } else {
  }
}
