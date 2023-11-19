import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type EditLinkBorderRadiusProps = {
  setIframeKey: Dispatch<SetStateAction<number>>;
  iframeKey: number;
  linksTextColor: string;
  linksBackgroundColor: string;
};

export default function EditLinkBorderRadius({
  iframeKey,
  setIframeKey,
  linksTextColor,
  linksBackgroundColor,
}: EditLinkBorderRadiusProps) {
  const [selected, setSelected] = useState<string>("rounded-none");

  useEffect(() => {
    getRadius();
  }, []);

  const getRadius = async () => {
    const res = await fetch("/api/links/BorderRadius");
    const data = await res.json();
    console.log(data);
    setSelected(data.radius);
  };

  const handleClick = async (clicked: string) => {
    setSelected(clicked);
    const res = await fetch("/api/links/BorderRadius", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ radius: clicked }),
    });
    if (res.status == 200) {
      setIframeKey(iframeKey + 1);
    }
  };

  return (
    <div className="mb-10">
      <h3 className="text-xl mt-8 mb-4">Link Border Radius</h3>
      <div className="grid gap-8 grid-cols-2 md:grid-cols-3">
        <button
          className={`bg-white px-8 py-4 rounded-none ${
            selected === "rounded-none" ? "selected" : ""
          }`}
          style={{ background: linksBackgroundColor, color: linksTextColor }}
          onClick={() => handleClick("rounded-none")}
        >
          Link
        </button>
        <button
          className={`bg-white px-8 py-4 rounded-sm ${
            selected === "rounded-sm" ? "selected" : ""
          }`}
          style={{ background: linksBackgroundColor, color: linksTextColor }}
          onClick={() => handleClick("rounded-sm")}
        >
          Link
        </button>
        <button
          className={`bg-white px-8 py-4 rounded-md ${
            selected === "rounded-md" ? "selected" : ""
          }`}
          style={{ background: linksBackgroundColor, color: linksTextColor }}
          onClick={() => handleClick("rounded-md")}
        >
          Link
        </button>
        <button
          className={`bg-white px-8 py-4 rounded-xl ${
            selected === "rounded-xl" ? "selected" : ""
          }`}
          style={{ background: linksBackgroundColor, color: linksTextColor }}
          onClick={() => handleClick("rounded-xl")}
        >
          Link
        </button>
        <button
          className={`bg-white px-8 py-4 rounded-2xl ${
            selected === "rounded-2xl" ? "selected" : ""
          }`}
          style={{ background: linksBackgroundColor, color: linksTextColor }}
          onClick={() => handleClick("rounded-2xl")}
        >
          Link
        </button>
        <button
          className={`bg-white px-8 py-4 rounded-3xl ${
            selected === "rounded-3xl" ? "selected" : ""
          }`}
          style={{ background: linksBackgroundColor, color: linksTextColor }}
          onClick={() => handleClick("rounded-3xl")}
        >
          Link
        </button>
      </div>
    </div>
  );
}
