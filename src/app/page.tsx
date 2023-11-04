import Nav from "@/components/Nav";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import connect from "@/utils/db";
import User from "@/models/User";
import { redirect } from "next/navigation";

export default async function Home() {
  await connect();
  const session = await getServerSession(authOptions);
  const sessionUser = await User.findOne({ email: session?.user.email });

  if (sessionUser?.username === "") {
    redirect("/register");
  } else if (sessionUser?.username) {
    redirect("/my");
  }
  return (
    <div className="">
      <Nav />
      <main className="flex justify-center w-full min-h-screen font-sans">
        <div className="relative max-w-10xl mx-auto pt-20 sm:pt-24 lg:pt-32">
          <h1 className="uppercase font-sans mt-20 text-slate-700 font-bold text-5xl tracking-tight text-left">
            All-in-One <span className="text-black">Link</span> Solution:
          </h1>
          <h2 className="font-sans mt-5 text-slate-600 font-medium text-5xl tracking-tight text-left">
            Simplify your online life by bringing all your{" "}
            <span className="text-black">links</span> together.
          </h2>
        </div>
      </main>
    </div>
  );
}
