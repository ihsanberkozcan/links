import React, { useEffect, useState } from "react";

import Restricted from "./Restricted";
export default function RestrictedUsernames() {
  const [RestrictedUsernames, setRestrictedUsernames] = useState<any>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    getAllRestrictedUsernames();
  }, []);
  const getAllRestrictedUsernames = async () => {
    const res = await fetch("/api/admin/restrictedUsername", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setRestrictedUsernames(data.allRestrictedUsername);
  };

  const sendRestrictedUsername = async () => {
    const res = await fetch("/api/admin/restrictedUsername", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ RestrictedUsername: text }),
    });

    if (res.status == 200) {
      const username = { username: text };
      setRestrictedUsernames([...RestrictedUsernames, username]);
      setText("");
    }
  };

  const handleDelete = async (username: string) => {
    const res = await fetch("/api/admin/restrictedUsername", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ RestrictedUsername: username }),
    });
    if (res.status == 200) {
      setRestrictedUsernames(RestrictedUsernames?.filter((RestrictedUsername: any) => RestrictedUsername.username !== username));
    }
  };

  return (
    <div>
       <div className="text-center font-medium text-3xl mt-4">Restricted Username</div>
      <div className="my-5">
        <input
          type="text"
          className="rounded p-2 drop-shadow-md"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="py-2 px-5 bg-black text-white rounded-lg ml-5"
          onClick={() => sendRestrictedUsername()}
        >
          Add
        </button>
      </div>
      <div className="mb-10">
        {RestrictedUsernames?.map((RestrictedUsername: any) => (
          <Restricted username={RestrictedUsername.username} handleDelete={handleDelete}/>
        ))}
      </div>
    </div>
  );
}
