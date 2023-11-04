import { Links, MyObjectType } from "@/types/types";
import { truncateText } from "@/utils/truncateText";
import { Dispatch, SetStateAction } from "react";
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
type MyLinkProps = {
  datas: MyObjectType;
  setDatas: Dispatch<SetStateAction<MyObjectType>>;
  setIframeKey: Dispatch<SetStateAction<number>>;
  iframeKey: number;
};

export default function MyLinks({
  datas,
  setDatas,
  iframeKey,
  setIframeKey,
}: MyLinkProps) {
  const deleteLink = async (index: number) => {
    const res = await fetch("/api/links", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index: index }),
    });

    if (res.status == 201) {
      let newData = datas?.links ? [...datas.links] : [];

      newData.splice(index, 1);
      setDatas({ links: newData });
      setIframeKey(iframeKey + 1);
    }
  };
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const newItems = datas?.links;
    if (newItems) {
      const [removed] = newItems?.splice(result.source.index, 1);
      newItems.splice(result.destination.index, 0, removed);

      const res = await fetch("/api/links/updateOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Source: result.source.index,
          Destination: result.destination.index,
        }),
      });
      if (res.status == 200) {
        setDatas({ links: newItems });
        setIframeKey(iframeKey + 1);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        {datas !== null ? (
          <Droppable droppableId="links">
            {(provided) => (
              <div
                className="flex flex-col justify-center mt-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {datas?.links?.map((data: Links, index: number) => (
                  <Draggable
                    key={index}
                    draggableId={`link-${index}`}
                    index={index}
                  >
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
                                stroke-width="1.5"
                                stroke="currentColor"
                                className="w-5 h-5 lg:h-6 lg:w-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                                />
                              </svg>
                            </a>
                          </div>
                        </div>
                        <div className="flex">
                          <button
                            className="p-3 text-red-400 transition duration-300 ease-in-out hover:text-red-600"
                            onClick={() => deleteLink(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="w-5 h-5 lg:h-6 lg:w-6"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : (
          <div className="flex w-full h-screen justify-center items-center text-5xl text-center font-bold">
            There is no data
          </div>
        )}
      </div>
    </DragDropContext>
  );
}
