import { HSLToHex } from "../helpers";
import { IColor } from "../types";

interface IColorProps {
  color: IColor;
  index: number;
}

function Color({ color, index }: IColorProps) {
  const { hue, saturation, lightness, isBaseColor } = color;

  return (
    <div
      className="group flex-grow flex flex-col justify-center items-center overflow-hidden"
      style={{
        background: `hsl(${hue},${saturation}%,${lightness}%)`,
        color: lightness > 50 ? "black" : "white",
      }}
    >
      <ul
        className="flex flex-col justify-end items-center flex-grow relative pb-10
      opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out
    [&>*]:cursor-pointer [&>*]:mb-5
      "
      >
        <li>X</li>
        <li>Move</li>
        <li>Color Picker</li>
        <li>Copy Hex</li>
        <li>{HSLToHex(hue, saturation, lightness)}</li>
        {isBaseColor && <li>⭐</li>}
      </ul>
    </div>
  );
}

export default Color;
