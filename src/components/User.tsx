"use client";
import { RiDeleteBinLine } from "react-icons/ri";

type UserPropsType ={
  user:any,
  handleDelete: (id: string) => Promise<void>
}


export default function User({ user ,handleDelete}: UserPropsType) {

  return (
    <div className="p-5 rounded-md bg-white my-2 flex justify-between items-center">
      <div>{user.name}</div>
      <div>{user.email}</div>
      <button className="p-1 text-red-500" onClick={() => handleDelete(user.id)}>
        <RiDeleteBinLine className="h-5 w-5" />
      </button>
    </div>
  );
}
