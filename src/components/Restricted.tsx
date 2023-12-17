import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";

export default function Restricted({
  username,
  handleDelete,
}: {
  username: any;
  handleDelete: any;
}) {
  return (
    <div className="p-5 rounded-md bg-white my-2 flex justify-between items-center">
      {username}

      <button
        className="p-1 text-red-500"
        onClick={() => handleDelete(username)}
      >
        <RiDeleteBinLine className="h-5 w-5" />
      </button>
    </div>
  );
}
