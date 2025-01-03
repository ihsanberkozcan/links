"use client";
import { useSession, getSession } from "next-auth/react";
import Nav from "@/components/Nav";
import { createPortal } from "react-dom";
import { Metadata } from "next";
import { signOut } from "next-auth/react";

import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "@/components/Loading";
import AccessDenied from "@/components/AccessDenied";
import Delete from "@/components/Delete";
type Props = {
  params: { slug: string };
};

export default function Settings({ params }: Props) {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [succesMessage, setSuccesMessage] = useState<string>("");
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);
  const deleteUser = async () => {
    const res = await fetch("/api/user", {
      method: "DELETE",
    });
    if (res.status == 201) {
      await signOut({ callbackUrl: "/" });
    }
  };

  const handleChangeUsername = async () => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    if (res.status == 201) {
      setSuccesMessage(data.message);
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
    <main>

      <Nav />

      <div className="flex flex-col mt-4 mb-4">
        <label htmlFor="" className="mb-2 text-2xl">
          Change Username
        </label>
        <div className="flex">
          <input
            type="text"
            className="rounded p-2 drop-shadow-md"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value), setErrorMessage("");
              setSuccesMessage("");
            }}
          />
          <button
            className="px-5 ml-5 bg-black text-white rounded"
            onClick={handleChangeUsername}
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
                strokeLinecap="round"
                stroke-linejoin="round"
                d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
              />
            </svg>
          </button>
        </div>
        {errorMessage ? (
          <span className="mt-2 text-red-500">{errorMessage}&#8203;</span>
        ) : succesMessage ? (
          <span className="mt-2 text-green-500">{succesMessage}&#8203;</span>
        ) : (
          <span className="mt-2">&#8203;</span>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="mb-4 text-2xl">
          Delete My Account
        </label>
        <div>
          <button
            className="bg-red-400 py-3 px-12 rounded text-white"
            onClick={() => setDeleteVisible(true)}
          >
            delete
          </button>
          <Delete
            deleteVisible={deleteVisible}
            setDeleteVisible={setDeleteVisible}
            deleteUser={deleteUser}
          />
        </div>
      </div>
    </main>
  );
}
