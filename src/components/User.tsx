"use client";
import { RiDeleteBinLine } from "react-icons/ri";
export default function User({user}:any) {
  console.log(user);
  return (
    <div className="p-5 rounded-md bg-white my-2 flex justify-between items-center">
      <div>{user.name}</div>
      <div>{user.email}</div>
      <button className="p-1 text-red-500">
        <RiDeleteBinLine className="h-5 w-5"/>
      </button>
    </div>
  );
}
