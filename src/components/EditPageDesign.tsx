import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ChangeColor from "./ChangeColor";

type EditPageDesignProps = {
  setIframeKey: Dispatch<SetStateAction<number>>;
  iframeKey: number;
};
export default function EditPageDesign({
  iframeKey,
  setIframeKey,
}: EditPageDesignProps) {
  const [pageBackgroundColor, setPageBackgroundColor] =
    useState<string>("#ffffff");
  const [descriptionTextColor, setDescriptionTextColor] =
    useState<string>("#000000");
  const [linksBackgroundColor, setLinksBackgroundColor] =
    useState<string>("#000000");
  const [linksTextColor, setLinksTextColor] = useState<string>("#ffffff");

  useEffect(() => {
    getLinksBackgroundColor();
  }, []);
  const getLinksBackgroundColor = async () => {
    const res = await fetch("/api/links/color");
    const data = await res.json();
    setLinksBackgroundColor(data.linksBackgroundColor);
    setDescriptionTextColor(data.descriptionTextColor);
    setLinksTextColor(data.linksTextColor);
    setPageBackgroundColor(data.pageBackgroundColor);
  };

  const handleChangeComplete = async (
    color: { hex: string },
    update: string
  ) => {
    const res = await fetch("/api/links/color", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ [update]: color.hex }),
    });
    const data = await res.json();
    if (res.status == 200) {
      if (data.updated === "linksBackgroundColor") {
        setLinksBackgroundColor(color.hex);
      } else if (data.updated === "descriptionTextColor") {
        setDescriptionTextColor(color.hex);
      } else if (data.updated === "linksTextColor") {
        setLinksTextColor(color.hex);
      } else if (data.updated === "pageBackgroundColor") {
        setPageBackgroundColor(color.hex);
      }
      setIframeKey(iframeKey + 1);
    }
  };
  return (
    <div>
      <h2 className="text-2xl mt-8">Edit My Page Design</h2>
      <h3 className="text-xl mt-5 mb-2">Colors</h3>
      <ChangeColor
        title="Page Bacground Color"
        color={pageBackgroundColor}
        handleChangeComplete={handleChangeComplete}
        update="pageBackgroundColor"
      />
      <ChangeColor
        title="Description Text Color"
        color={descriptionTextColor}
        handleChangeComplete={handleChangeComplete}
        update="descriptionTextColor"
      />
      <ChangeColor
        title="Links Background Color"
        color={linksBackgroundColor}
        handleChangeComplete={handleChangeComplete}
        update="linksBackgroundColor"
      />
      <ChangeColor
        title="Links Text Color"
        color={linksTextColor}
        handleChangeComplete={handleChangeComplete}
        update="linksTextColor"
      />
    </div>
  );
}
