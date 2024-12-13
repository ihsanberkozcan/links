import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
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
  const [clear, setClear] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    getAllUser();
    setClear(false);
  }, [clear]);
  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      getAllUser();
    }
  };

  const handleClick = () => {
    getAllUser();
  };

  const deleteSearch = async () => {
    setSearchValue("");
    setSeacrhText("");
    setClear(true);
  };

  return (
    <div>
      <div className="text-center font-medium text-3xl mt-4">All User</div>
      <div className="mb-5 w-full flex justify-between items-center">
        <div>{userNumber} User</div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search User"
            className="p-2 rounded-md mr-2"
            onChange={(e) => {
              setSeacrhText(e.target.value);
              setSearchValue(e.target.value);
            }}
            value={searchValue}
            onKeyDown={handleKeyDown}
          />
          <div
            className="-ml-10 mr-3 hover:bg-slate-200 rounded-full p-1"
            onClick={() => deleteSearch()}
          >
            <IoMdClose size={16} />
          </div>
          <button
            className="bg-black p-3 h- ml-2 rounded-md text-white"
            onClick={() => handleClick()}
          >
            <CiSearch />
          </button>
        </div>
      </div>
    </div>
  );
}
