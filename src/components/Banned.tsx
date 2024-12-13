/* eslint-disable react/no-unescaped-entities */
import React, { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { VscChromeClose } from "react-icons/vsc";
type deletePropsType = {
  banned:boolean,
  banVisible: boolean;
  setBanVisible: Dispatch<SetStateAction<boolean>>;
  banUser: any;
  UnbanUser: any;
  user?: any;
};

export default function Banned({
  banned,
  banVisible,
  setBanVisible,
  banUser,
  UnbanUser,
  user,
}: deletePropsType) {
  return (
    <div>
      <div
        className={
          banVisible
            ? "blur-sm w-screen h-screen fixed top-0 left-0 z-50 bg-slate-600 opacity-50"
            : ""
        }
      ></div>
      {banVisible ? (
        <>
          {createPortal(
            <div className="flex justify-center items-center w-screen h-screen top-0 fixed z-50">
              <div className="bg-white rounded-lg border shadow-lg p-8 md:p-10 w-5/6 md:w-2/3 lg:w-2/5 z-50 relative">
                <button
                  className="bg-slate-200  w-10 h-10 rounded-full text-black ml-auto absolute top-8 right-8 flex justify-center items-center"
                  onClick={() => setBanVisible(false)}
                >
                  <VscChromeClose size={20} />
                </button>
                <div className="text-center mt-10">
                  <p className="text-xl font-semibold mb-4">
                    Are you sure you want to {banned?"unban":"ban"}
                    {user && banned ? <span className="text-red-500"> {user}'s </span> : user && !banned  ?<span className="text-red-500"> {user}'s </span> :null}
                    account?
                  </p>
                </div>
                <div className="mt-10 flex justify-center gap-10">
                  <button
                    className="bg-black py-3 px-6 rounded text-white"
                    onClick={() => setBanVisible(false)}
                  >
                    Cancel
                  </button>
                  {banned?        <button
                    className="bg-red-400 py-3 px-6 rounded text-white"
                    onClick={() => UnbanUser()}
                  >
                    Unban
                  </button>:       <button
                    className="bg-red-400 py-3 px-6 rounded text-white"
                    onClick={() => banUser()}
                  >
                    Ban
                  </button>}
           
                </div>
              </div>
            </div>,
            document.body
          )}
        </>
      ) : null}
    </div>
  );
}
