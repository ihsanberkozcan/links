import { useOnClickOutside } from "@/hooks/hook";
import getContrastColor from "@/utils/getContrastColor";
import { useRef, useState } from "react";
import { SketchPicker } from "react-color";

type ChangeColorType = {
  title: string;
  color: string;
  handleChangeComplete: any;
  update: string;
};

export default function ChangeColor({
  title,
  color,
  handleChangeComplete,
  update,
}: ChangeColorType) {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };
  useOnClickOutside(ref, buttonRef, () => setDisplayColorPicker(false));
  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="p-4 my-2 text-center rounded-lg drop-shadow-sm border w-full"
        style={{
          backgroundColor: color,
          color: getContrastColor(color),
        }}
        onClick={handleClick}
      >
        {title}
      </button>
      {displayColorPicker ? (
        <div
          className="absolute right-0 z-10"
          ref={ref}
        >
         <div className="arrow-up"></div>
          <SketchPicker
            disableAlpha
            color={color}
            onChangeComplete={(hex) => handleChangeComplete(hex, update)}
          />
        </div>
      ) : null}
    </div>
  );
}
