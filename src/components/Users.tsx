"use client";

import User from "./User";

export default function Users({ allUsers }: any) {

  return allUsers?.map((user: any) => <User user={user} />);
}
