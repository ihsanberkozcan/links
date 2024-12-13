"use client";

import User from "./User";

type UsersPropsType = {
  allUsers: never[];
  handleDelete: (id: string) => Promise<void>;
  handleBan: (id: string) => Promise<void>;
  handleUnBan: (id: string) => Promise<void>;
};

export default function Users({ allUsers, handleDelete , handleBan, handleUnBan}: UsersPropsType) {
  return (
    <div className="mb-10">
      {allUsers?.map((user,index) => (
        <User key={index} user={user} handleDelete={handleDelete} handleBan={handleBan} handleUnBan={handleUnBan}/>
      ))}
    </div>
  );
}
