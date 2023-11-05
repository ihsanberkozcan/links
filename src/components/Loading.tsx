import React from "react";
import { CgSpinner } from "react-icons/cg";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <CgSpinner className="animate-spin w-20 h-20" />
    </div>
  );
}
