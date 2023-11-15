"use client";

import Nav from "@/components/Nav";
import { useSession, getSession } from "next-auth/react";
import Users from "@/components/Users";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import AccessDenied from "@/components/AccessDenied";

export default function Admin() {
  const [allUsers, setAllUsers] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    getAllUser();
  }, []);
  const getAllUser = async () => {

    const res = await fetch("/api/admin/getAllUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await res.json();
console.log(data.users)
    setAllUsers(data.users);
   

  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  return (
    <div>
      <Nav />
      <div>
        <h2 className="text-4xl mt-10 pb-2 mb-5 text-center">Hello Admin</h2>
        <Users allUsers={allUsers}/>
      </div>
    </div>
  );
}
