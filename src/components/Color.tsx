import { useSetRecoilState } from "recoil";
import { paletteState } from "../atoms";
import { IColor } from "../types";
import { HSLToHex } from "../helpers";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HslColor, HslColorPicker } from "react-colorful";
import toast from "react-hot-toast";

import { TbTrashX, TbColorPicker, TbX, TbCopy } from "react-icons/tb";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

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

  const copyHexCode = (hexCode: string) => {
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

  const changeBaseColor = () => {
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
      opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out

    [&>li]:cursor-pointer [&>li]:mb-5 [&>li]:text-3xl [&>li]:relative [&>li]:z-10

    [&>li]:before:absolute [&>li]:before:-top-[90%] [&>li]:before:left-full 
    [&>li]:before:p-2 [&>li]:before:rounded-lg [&>li]:before:rounded-bl-none [&>li]:before:shadow-lg 

    [&>li]:before:bg-white [&>li]:before:text-black [&>li]:before:text-sm [&>li]:before:whitespace-nowrap
    [&>li]:before:opacity-0
    [&>li]:before:transition-opacity [&>li]:before:duration-700 [&>li]:before:ease-out
      "
      >
        <li
          className="before:content-['remove'] hover:before:opacity-100"
          onClick={removeColor}
        >
          <TbTrashX />
        </li>
        {/* <li>Move</li> */}
        <li
          className="before:content-['color_picker'] hover:before:opacity-100"
          onClick={cancelChangeColor}
        >
          <TbColorPicker />
        </li>

        <li
          className="before:content-['copy_hex_code'] hover:before:opacity-100"
          onClick={() => copyHexCode(HSLToHex(hue, saturation, lightness))}
        >
          <TbCopy />
        </li>
        <li
          className="before:content-['set_as_base_color'] hover:before:opacity-100"
          onClick={changeBaseColor}
        >
          {isBaseColor ? (
            <AiTwotoneStar className="!opacity-100" />
          ) : (
            <AiOutlineStar />
          )}
        </li>
      </ul>
      <AnimatePresence>
        {pickerOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="z-20 absolute w-full h-full top-0 left-0 flex justify-center items-center pointer-events-none"
          >
            <div className="relative flex flex-col bg-white rounded-xl shadow-xl pointer-events-auto">
              <div className="flex justify-end">
                <button
                  onClick={cancelChangeColor}
                  className="flex justify-center items-center p-2 text-black text-xl"
                >
                  <TbX />
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

      {/* {isBaseColor && (
        <motion.div
          className="z-20 absolute bottom-0 left-0 right-0 m-auto w-full flex justify-center items-center"
          layoutId="baseColor"
        >
          ⭐
        </motion.div>
      )} */}
    </div>
  );
}

export default Color;
