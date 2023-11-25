import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";




export async function POST(request: Request) {
  const body = await request.json();
  const username = await body.username;
  await connect();
  const id = await body.id;

  const user = await User.findOne({ username: username });

  const foundValue = user.links.find(
    (item: { _id: any }) => item._id.toString() === id
  );

  foundValue.clickNumber = foundValue.clickNumber + 1;

  user.save();

  return NextResponse.json({ message: "Heello" }, { status: 200 });
}
