import React, { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";
import { VscChromeClose } from "react-icons/vsc";
type deletePropsType = {
  deleteVisible: boolean;
  setDeleteVisible: Dispatch<SetStateAction<boolean>>;
  deleteUser: () => Promise<void>;
};

export default function Delete({
  deleteVisible,
  setDeleteVisible,
  deleteUser,
}: deletePropsType) {
  return (
    <div>
      {deleteVisible ? (
        <>
          {createPortal(
            <div className="flex justify-center items-center w-screen h-screen top-0 fixed z-50">
              <div className="bg-white rounded-lg border shadow-lg p-8 md:p-10 w-5/6 md:w-5/12 z-50 relative">
              <button
                    className="bg-slate-200  w-10 h-10 rounded-full text-black ml-auto absolute top-8 right-8 flex justify-center items-center"
                    onClick={() => setDeleteVisible(false)}
                  >
                   <VscChromeClose size={20}/>
                  </button>
                <div className="text-center mt-10">
                  <p className="text-xl font-semibold mb-4">Are you sure you want to delete your account?</p>
                  <p className="text-lg">
                    This action is irreversible and all your data will be
                    permanently deleted. Once your account is deleted, it cannot
                    be recovered.
                  </p>
                </div>
                <div className="mt-10 flex justify-between md:justify-around">
                  <button
                    className="bg-black py-3 px-6 rounded text-white"
                    onClick={() => setDeleteVisible(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-red-400 py-3 px-6 rounded text-white"
                    onClick={() => deleteUser()}
                  >
                    Delete
                  </button>
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
