"use client";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import Delete from "./Delete";

type UserPropsType = {
  user: any;
  handleDelete: (id: string) => Promise<void>;
};

export default function User({ user, handleDelete }: UserPropsType) {
  const [deleteVisible, setDeleteVisible] = useState(false);

  const deleteUser = () => {
    return handleDelete(user.id);
  };

  return (
    <div className="p-5 rounded-md bg-white my-2 flex justify-between items-center">
      <div>{user.name}</div>
      <div>{user.email}</div>

      <Delete
        deleteVisible={deleteVisible}
        setDeleteVisible={setDeleteVisible}
        deleteUser={deleteUser}
        user={user.name}
      />
      <button
        className="p-1 text-red-500"
        onClick={() => setDeleteVisible(true)}
      >
        <RiDeleteBinLine className="h-5 w-5" />
      </button>
    </div>
  );
}
