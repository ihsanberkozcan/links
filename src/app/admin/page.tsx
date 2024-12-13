"use client";

import Nav from "@/components/Nav";
import { useSession, getSession } from "next-auth/react";
import Users from "@/components/Users";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import AccessDenied from "@/components/AccessDenied";
import SearchUser from "@/components/SearchUser";
import RestrictedUsernames from "@/components/RestrictedUsernames";

export default function Admin() {
  const [allUsers, setAllUsers] = useState<any>([]);
  const [page, setPage] = useState("allUser");
  const { data: session, status } = useSession();
  const [searchText, setSeacrhText] = useState("");
  useEffect(() => {
    getAllUser();
  }, []);
  const getAllUser = async () => {
    const res = await fetch("/api/admin/getAllUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchText }),
    });

    const data = await res.json();

    setAllUsers(data.users);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/admin/deleteUser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    if (res.status == 200) {
      setAllUsers(allUsers?.filter((user: any) => user.id !== id));
    }
  };
  const handleBan = async (id: string) => {
    const res = await fetch("/api/admin/banUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    if (res.status == 200) {

      setAllUsers(
        allUsers?.map((user: any) => 
          user.id === id 
            ? { ...user, isBanned: true } 
            : user 
        )
      );
    }
  };
  const handleUnBan = async (id: string) => {
    const res = await fetch("/api/admin/unbanUser", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    if (res.status == 200) {


      setAllUsers(
        allUsers?.map((user: any) => 
          user.id === id 
            ? { ...user, isBanned: false } 
            : user 
        )
      );
    }
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
        <div>
          <button className="bg-black rounded-md text-white py-2 px-14" onClick={()=> setPage("allUser")}>
            All User
          </button>
          <button className="bg-black rounded-md text-white py-2 px-5 ml-2"  onClick={()=> setPage("restrictedUsername")}>
            Restricted Username
          </button>
        </div>
        {page == "allUser" ? (
          <>
            <SearchUser
              searchText={searchText}
              setSeacrhText={setSeacrhText}
              userNumber={allUsers.length}
              getAllUser={getAllUser}
            />
            <Users allUsers={allUsers} handleDelete={handleDelete} handleBan={handleBan} handleUnBan={handleUnBan}/>
          </>
        ) : (
          <RestrictedUsernames />
        )}
      </div>
    </div>
  );
}
