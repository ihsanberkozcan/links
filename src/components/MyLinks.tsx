import { Links, MyObjectType } from "@/types/types";
import { truncateText } from "@/utils/truncateText";
import { Dispatch, SetStateAction } from "react";
import {
  Droppable,
  Draggable,
  DragDropContext,
  DropResult,
} from "react-beautiful-dnd";
import Link from "./Link";
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
                  <Link key={index} data={data} index={index} deleteLink={deleteLink} />
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
