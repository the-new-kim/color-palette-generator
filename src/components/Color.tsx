import { MouseEvent } from "react";
import { useSetRecoilState } from "recoil";
import { paletteState } from "../atoms";
import { HSLToHex } from "../helpers";
import { IColor } from "../types";

interface IColorProps {
  color: IColor;
  index: number;
}

function Color({ color, index }: IColorProps) {
  const { hue, saturation, lightness, isBaseColor } = color;
  const setPalette = useSetRecoilState(paletteState);

  const removeColor = (colorIndex: number) => {
    setPalette((oldPalette) => {
      let newPalette = { ...oldPalette };
      let colors = [...oldPalette.colors];
      colors.splice(colorIndex, 1);
      newPalette = { ...newPalette, colors };
      return newPalette;
    });
  };

  const copyHexCode = (event: MouseEvent<HTMLLIElement>) => {
    const target = event.target as HTMLLIElement;
    const hexCode = target.innerText;
    navigator.clipboard.writeText(hexCode);
  };

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
        <li onClick={() => removeColor(index)}>X</li>
        <li>Move</li>
        <li>Color Picker</li>

        <li onClick={copyHexCode}>{HSLToHex(hue, saturation, lightness)}</li>
        {isBaseColor && <li>⭐</li>}
      </ul>
    </div>
  );
}

export default Color;
