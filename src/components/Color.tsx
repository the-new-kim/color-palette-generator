import { MouseEvent, useEffect, useRef, useState } from "react";
import { HslColor, HslColorPicker } from "react-colorful";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import { paletteState } from "../atoms";
import { HSLToHex } from "../helpers";
import { IColor } from "../types";
import { AnimatePresence, motion } from "framer-motion";

interface IColorProps {
  color: IColor;
  index: number;
}

function Color({ color, index }: IColorProps) {
  const setPalette = useSetRecoilState(paletteState);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [hsl, setHsl] = useState<IColor>({ ...color });
  const { hue, saturation, lightness, isBaseColor } = hsl;

  const togglePickerOpen = () => {
    setPickerOpen((prev) => !prev);
  };
  const pickerBtnRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setHsl({
      hue: color.hue,
      saturation: color.saturation,
      lightness: color.lightness,
      isBaseColor: color.isBaseColor,
    });
  }, [color, index]);

  const removeColor = () => {
    setPalette((oldPalette) => {
      let newPalette = { ...oldPalette };
      let colors = [...oldPalette.colors];

      if (colors[index].isBaseColor) {
        const newBaseColorIndex = !colors[index + 1]
          ? index - 1
          : !colors[index - 1]
          ? index + 1
          : index + 1;

        const newBaseColor = {
          ...colors[newBaseColorIndex],
          isBaseColor: true,
        };

        colors.splice(newBaseColorIndex, 1, newBaseColor);
      }

      colors.splice(index, 1);
      newPalette = { ...newPalette, colors };
      return newPalette;
    });
  };

  const copyHexCode = (event: MouseEvent<HTMLLIElement>) => {
    const target = event.target as HTMLLIElement;
    const hexCode = target.innerText;
    navigator.clipboard.writeText(hexCode);
    toast("Copied!");
  };

  const changeBgColor = (event: HslColor) => {
    const { h: hue, s: saturation, l: lightness } = event;
    setHsl({
      hue,
      saturation,
      lightness,
      isBaseColor,
    });
  };

  const cancelChangeColor = () => {
    setHsl({ ...color });
    togglePickerOpen();
  };

  const saveChangeColor = () => {
    setPalette((oldPalette) => {
      let newPalette = { ...oldPalette };
      let colors = [...oldPalette.colors];
      const newColor = { ...hsl };
      colors.splice(index, 1, newColor);
      newPalette = { ...newPalette, colors };
      return newPalette;
    });
    togglePickerOpen();
  };

  const setBaseColor = () => {
    if (isBaseColor) return;

    setPalette((oldPalette) => {
      let colors = [...oldPalette.colors];

      const baseColorIndex = colors.findIndex((color) => color.isBaseColor);

      const oldBaseColor = { ...colors[baseColorIndex], isBaseColor: false };
      const newBaseColor = { ...hsl, isBaseColor: true };

      colors.splice(baseColorIndex, 1, oldBaseColor);
      colors.splice(index, 1, newBaseColor);

      const newPalette = { ...oldPalette, colors };

      return newPalette;
    });
  };

  return (
    <div
      className="group relative flex-grow flex flex-col justify-center items-center"
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
        <li
          className="flex flex-col justify-center items-center"
          onClick={setBaseColor}
        >
          <div>Set as Base Color</div>
        </li>

        <li onClick={removeColor}>Remove</li>
        {/* <li>Move</li> */}
        <li ref={pickerBtnRef} onClick={cancelChangeColor}>
          Color Picker
        </li>

        <li onClick={copyHexCode}>{HSLToHex(hue, saturation, lightness)}</li>
      </ul>
      <AnimatePresence>
        {pickerOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute w-full h-full top-0 left-0 flex justify-center items-center pointer-events-none"
          >
            <div className="z-20 relative flex flex-col bg-white rounded-xl shadow-xl pointer-events-auto">
              <div className="flex justify-end">
                <button
                  onClick={cancelChangeColor}
                  className="flex justify-center items-center p-3 w-8 h-8 text-black"
                >
                  ❌
                </button>
              </div>
              <div className="px-6">
                <HslColorPicker
                  color={{ h: hue, s: saturation, l: lightness }}
                  onChange={changeBgColor}
                />
              </div>
              <div className="flex justify-between px-6">
                <button onClick={cancelChangeColor} className="p-2 text-black">
                  Cancel
                </button>
                <button onClick={saveChangeColor} className="p-2 text-black">
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isBaseColor && (
        <motion.div
          className="z-20 absolute top-full left-0 right-0 m-auto w-full flex justify-center items-center"
          layoutId="baseColor"
        >
          ⭐
        </motion.div>
      )}
    </div>
  );
}

export default Color;
