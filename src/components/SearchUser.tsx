import React, { useState } from "react";

export default function SearchUser() {
  const [searchText, setSeacrhText] = useState("");
  return (
    <div className="mb-5">
      <h3 className="my-2">Search User</h3>
      <input
        type="text"
        placeholder="Search User"
        className="p-2 rounded-md"
        onChange={(e) => setSeacrhText(e.target.value)}
      />
      
    </div>
  );
}
