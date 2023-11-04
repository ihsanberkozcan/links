import React from "react";

export default function BorderRadius() {
  return (
    <div>
      <h3 className="text-xl mt-5 mb-2">Border Radius</h3>
      <div className="flex justify-between">
        <button className="bg-slate-500 py-3 px-5 text-white">Link</button>
        <button className="rounded-sm bg-slate-500 py-3 px-5 text-white">
          Link
        </button>
        <button className="rounded bg-slate-500 py-3 px-5 text-white">
          Link
        </button>
        <button className="rounded-md bg-slate-500 py-3 px-5 text-white">
          Link
        </button>
        <button className="rounded-lg bg-slate-500 py-3 px-5 text-white">
          Link
        </button>
        <button className="rounded-xl bg-slate-500 py-3 px-5 text-white">
          Link
        </button>
        <button className="rounded-2xl bg-slate-500 py-3 px-5 text-white">
          Link
        </button>
        <button className="rounded-3xl bg-slate-500 py-3 px-5 text-white">
          Link
        </button>
      </div>
    </div>
  );
}
