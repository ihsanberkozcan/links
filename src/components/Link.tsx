import { truncateText } from "@/utils/truncateText";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Links } from "@/types/types";
import Trash from "./icons/Trash";
import ChartBar from "./icons/ChartBar";

type LinkProps = {
  data: Links;
  index: number;
  deleteLink: (index: number) => Promise<void>;
};

export default function Link({ index, data, deleteLink }: LinkProps) {
  return (
    <Draggable key={index} draggableId={`link-${index}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="flex justify-between w-full mb-3 bg-white px-2 py-2 lg:px-10 lg:py-5 rounded-lg drop-shadow-sm border"
        >
          <div className="w-full flex justify-center">
            <div>
              <div className="ml-3 text-center w-full text-sm lg:text-lg">
                {data.urlDesc}
              </div>
              <a
                className="ml-3 text-center text-xs lg:text-lg flex justify-center items-center underline underline-offset-1 text-sky-500"
                href={data.url}
              >
                <div className="flex lg:hidden">
                  {truncateText(data.url, 30)}
                </div>
                <div className="hidden lg:flex">{data.url}</div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 lg:h-6 lg:w-6"
                >
                  <path
                    strokeLinecap="round"
                    stroke-linejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-1 md:mr-5">
              <ChartBar />
              <span>{data.clickNumber}</span>
            </div>
            <button
              className="p-3 text-red-400 transition duration-300 ease-in-out hover:text-red-600"
              onClick={() => deleteLink(index)}
            >
              <Trash />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
