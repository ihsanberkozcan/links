import React, { Dispatch, SetStateAction } from "react";
import { createPortal } from "react-dom";

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
            <div className="flex justify-center items-center w-screen h-screen top-0 fixed">
              <div className="bg-white rounded-lg border shadow-lg p-8 md:p-16 w-5/6 md:w-1/2">
                <p className="md:text-xl text-center">
                  Are you sure you want to delete your account? This action is
                  irreversible and all your data will be permanently deleted.
                  Once your account is deleted, it cannot be recovered.
                </p>
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
