import { useRecoilState } from "recoil";
import { paletteState } from "../atoms";
import { generatePalette } from "../helpers";
import { EColorHarmonies, IColor } from "../types";
import { ChangeEvent, useEffect, useState } from "react";

import { MdOutlineKeyboardArrowUp } from "react-icons/md";

function Filter() {
  const [palette, setPalette] = useRecoilState(paletteState);
  const [defaultSelectValue, setDefaultSelectValue] = useState(0);
  const [baseColor, setBaseColor] = useState<IColor>({
    hue: 0,
    saturation: 0,
    lightness: 0,
  });
  const { hue, saturation, lightness } = baseColor;

  useEffect(() => {
    const harmonyIndex = Object.keys(EColorHarmonies)
      .filter((key) => isNaN(Number(key)))
      .findIndex(
        (colorHarmonyName) => colorHarmonyName === palette.harmonyName
      );
    setDefaultSelectValue(harmonyIndex);

    const foundBaseColor = palette.colors.find((color) => color.isBaseColor);
    if (!foundBaseColor) return;
    setBaseColor(foundBaseColor);
  }, [palette]);

  const onChange = (event: ChangeEvent) => {
    const eventTarget = event.target as HTMLSelectElement;
    setPalette(
      generatePalette({
        colorHarmony: +eventTarget.value,
        baseColor,
        baseColorIndex: palette.colors.findIndex((color) => color.isBaseColor),
        paletteLength: palette.colors.length,
      })
    );
  };

  return (
    <div className="relative">
      <select
        onChange={onChange}
        style={{
          background: `hsl(${hue},${saturation}%,${lightness}%)`,
          color: lightness > 50 ? "black" : "white",
        }}
        className="text-lg p-2 pr-10 rounded-xl shadow-md appearance-none"
        value={defaultSelectValue}
      >
        {Object.keys(EColorHarmonies)
          .filter((key) => isNaN(Number(key)))
          .map((colorHarmonyName, index) => (
            <option className="relative" key={colorHarmonyName} value={index}>
              {colorHarmonyName}
            </option>
          ))}
      </select>
      <span
        style={{ color: lightness > 50 ? "black" : "white" }}
        className="absolute flex justify-center items-center 
        top-0 bottom-0 right-0 my-auto p-2 text-lg pointer-events-none"
      >
        <MdOutlineKeyboardArrowUp />
      </span>
    </div>
  );
}

export default Filter;
