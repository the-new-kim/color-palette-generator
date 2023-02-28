import { useSetRecoilState } from "recoil";
import { paletteState } from "../libs/atoms";
import { IColor } from "../libs/types";
import { HSLToHex } from "../libs/helpers";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HslColor, HslColorPicker } from "react-colorful";
import toast from "react-hot-toast";

import { TbTrashX, TbColorPicker, TbX, TbCopy } from "react-icons/tb";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { BiMoveHorizontal } from "react-icons/bi";
import { DraggableProvided } from "react-beautiful-dnd";
import { Trash } from "phosphor-react";

interface IColorProps {
  color: IColor;
  index: number;
  magic: DraggableProvided;
}

function Color({ color, index, magic }: IColorProps) {
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
    navigator.clipboard.writeText(`#${hexCode}`);
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
      text-lg mg:text-xl lg:text-2xl
      [&>li]:cursor-pointer [&>li]:p-3 [&>li]:mb-1 [&>li]:relative [&>li]:z-10"
      >
        <li
          // className="before:content-['remove'] hover:before:opacity-100"
          data-hover-text="Remove"
          onClick={removeColor}
        >
          <Trash className="pointer-events-none" />
        </li>
        <li
          {...magic.dragHandleProps}
          data-hover-text="Drag"

          // className="before:content-['drag'] hover:before:opacity-100 !cursor-grab"
        >
          <BiMoveHorizontal className="pointer-events-none" />
        </li>
        <li
          // className="before:content-['color_picker'] hover:before:opacity-100"
          data-hover-text="Color picker"
          onClick={cancelChangeColor}
        >
          <TbColorPicker className="pointer-events-none" />
        </li>

        <li
          // className="before:content-['copy_hex_code'] hover:before:opacity-100"
          data-hover-text="Hex code"
          onClick={() => copyHexCode(HSLToHex(hue, saturation, lightness))}
        >
          <TbCopy className="pointer-events-none" />
        </li>
        <li
          // className="before:content-['set_as_base_color'] hover:before:opacity-100"
          data-hover-text="Set as base color"
          onClick={changeBaseColor}
        >
          {isBaseColor ? (
            <AiTwotoneStar className="!opacity-100 pointer-events-none" />
          ) : (
            <AiOutlineStar className="pointer-events-none" />
          )}
        </li>
      </ul>
      <AnimatePresence>
        {pickerOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="z-20 fixed md:absolute w-full h-full top-0 left-0 flex justify-center items-center pointer-events-none"
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
    </div>
  );
}

export default Color;
