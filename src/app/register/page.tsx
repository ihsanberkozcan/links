"use client";
import { useSession, getSession } from "next-auth/react";
import Nav from "@/components/Nav";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/components/Loading";
import AccessDenied from "@/components/AccessDenied";

export default function Register() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [errorMesaage, setErrorMessage] = useState<string>("");

  const handleCreateAccount = async () => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    if (res.status == 201) {
      router.push("/my");
    } else if (res.status == 400) {
      setErrorMessage(data.message);
    }
  };
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  return (
    <div className="w-full flex flex-col h-screen">
      <Nav />
      <div className="flex justify-center items-center flex-grow">
        <div className="flex flex-col w-1/2">
          <label htmlFor="" className="mb-4 text-3xl ml-5">
            Username
          </label>
          <div className="flex">
            <input
              type="text"
              className="rounded-full p-5 pl-10 w-full drop-shadow-md"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value), setErrorMessage("");
              }}
            />
            <button
              className="p-5 ml-2 bg-black text-white rounded-full"
              onClick={handleCreateAccount}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
            </button>
          </div>
          <span className="text-red-500 ml-5 mt-4">{errorMesaage}&#8203;</span>
        </div>
      </div>
    </div>
  );
}
