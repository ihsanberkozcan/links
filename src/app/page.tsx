import Nav from "@/components/Nav";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import connect from "@/utils/db";
import User from "@/models/User";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";

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
    <div>
      <div className="flex flex-col min-h-screen">
        <Nav />
        <main className="flex-col flex-1 flex justify-center w-full h-max font-sans">
          <div className="relative max-w-10xl">
            <h1 className="uppercase font-sans mb-10 text-black font-semibold  text-6xl tracking-tight text-left">
              All-in-One Link Solution
            </h1>
            <h2 className="font-sans mt-5 text-black text-4xl tracking-tight text-left">
              Simplify your online life by bringing all your links together.
            </h2>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
