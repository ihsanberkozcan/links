"use client";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import { TbUserX } from "react-icons/tb";

import Delete from "./Delete";
import Banned from "./Banned";

type UserPropsType = {
  user: any;
  handleDelete: (id: string) => Promise<void>;
  handleBan: (id: string) => Promise<void>;
  handleUnBan: (id: string) => Promise<void>;
};

export default function User({ user, handleDelete, handleBan, handleUnBan }: UserPropsType) {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [banVisible, setBanVisible] = useState(false);

  const deleteUser = () => {
    return handleDelete(user.id);
  };
  const banUser = () => {
    setBanVisible(false)
    return handleBan(user.id);

  };
  const UnbanUser = () => {
    setBanVisible(false)
    return handleUnBan(user.id);

  };

  return (
    <div className="p-5 rounded-md bg-white my-2 flex justify-between items-center">

      <div className="flex items-center gap-2">

        {user.isBanned ? <TbUserX className="text-red-600" size={25} /> : null}
        {user.name}
      </div>

      <div>{user.email}</div>



      <Delete
        deleteVisible={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        deleteUser={deleteUser}
        user={user.name}
      />
      <Banned
        banned={user.isBanned}
        banVisible={banVisible}
        setBanVisible={setBanVisible}
        banUser={banUser}
        UnbanUser={UnbanUser}
        user={user.name}
      />
      <div className="flex gap-6">

        <button
          className="p-1 text-red-500 flex items-center flex-col text-[10px]"
          onClick={() => setBanVisible(true)}
        >
          <MdBlock className="h-4 w-4" />
          <div>
            {user.isBanned ? "Unban" : "Ban"}
          </div>
        </button>
        <button
          className="p-1 text-red-500"
          onClick={() => setDeleteVisible(true)}
        >
          <RiDeleteBinLine className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
