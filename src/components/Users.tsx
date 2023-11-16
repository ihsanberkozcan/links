"use client";

import User from "./User";

type UsersPropsType= {
  allUsers: never[]
  handleDelete: (id: string) => Promise<void>
}

export default function Users({ allUsers ,handleDelete}: UsersPropsType) {

  return allUsers?.map((user) => <User user={user} handleDelete={handleDelete}/>);
}
