import User from "@/models/User";
import { Links, datatype } from "@/types/types";
import connect from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const name = params.slug;
  return {
    title: name,
  };
}

export default async function Profile({ params }: Props) {
  const username = params.slug;

  await connect();
  const session = await getServerSession(authOptions);
  const sessionUser = await User.findOne({ email: session?.user.email });

  const datas: datatype | null = await User.findOne({ username });

  return (
    <main className="flex justify-center w-full min-h-screen font-sans">
      {username == sessionUser?.username ? (
        <a
          href="/my"
          className="p-5 m-2 absolute text-purple-500 flex text-lg font-semibold"
          id="edit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
          <div className="ml-2">Edit your page</div>
        </a>
      ) : null}

      <div className="w-4/5 mt-16">
        {datas !== null ? (
          <>
            <div className="flex flex-col items-center mb-10">
              <h1 className="mt-4 text-2xl">@{datas.username}</h1>
              <p className="text-lg mt-2">{datas.desc}</p>
            </div>
            {datas?.links?.map((data: Links, index: number) => (
              <a
                key={index}
                className="bg-red-400 mb-5 rounded-lg p-5 text-white transition ease-in-out delay-150 transition ease-in-out delay-150 hover:scale-105 flex items-center"
                href={data.url}
              >
                <div className="w-full text-center">{data.urlDesc}</div>
              </a>
            ))}
          </>
        ) : (
          <div className="flex w-full h-screen justify-center items-center text-5xl text-center font-bold">
            This account doesn't exist.🤷
          </div>
        )}
      </div>
    </main>
  );
}