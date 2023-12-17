import React, { Dispatch, SetStateAction, useState } from "react";

type SearchUser = {
  searchText: string;
  setSeacrhText: Dispatch<SetStateAction<string>>;
  userNumber: number;
  getAllUser: () => Promise<void>;
};

export default function SearchUser({
  searchText,
  setSeacrhText,
  userNumber,
  getAllUser,
}: {
  searchText: any;
  setSeacrhText: any;
  userNumber: any;
  getAllUser: any;
}) {
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      getAllUser();
    }
  };

  return (
    <div>
      <div className="text-center font-medium text-3xl mt-4">All User</div>
      <div className="mb-5 w-full flex justify-between items-center">
        <div>{userNumber} User</div>
        <input
          type="text"
          placeholder="Search User"
          className="p-2 rounded-md"
          onChange={(e) => setSeacrhText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
