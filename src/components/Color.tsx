import { useRecoilValue } from "recoil";
import { navHeightState } from "../libs/atoms";
import { IColor } from "../libs/types";
import { cls, HSLToHex, removeColor } from "../libs/utils";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HslColor, HslColorPicker } from "react-colorful";
import toast from "react-hot-toast";

import { TbColorPicker, TbX, TbCopy } from "react-icons/tb";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { BiMoveHorizontal } from "react-icons/bi";
import { DraggableProvided } from "react-beautiful-dnd";
import { Trash } from "phosphor-react";
import usePaletteHistory from "../libs/hooks/usePaletteHistory";

interface IColorProps {
  color: IColor;
  index: number;
  magic: DraggableProvided;
  isLastChild?: boolean;
}

function Color({ color, index, magic, isLastChild = false }: IColorProps) {
  const {
    palette,
    setPalette,
    pastPalettes,
    setPastPalettes,
    futurePalettes,
    setFuturePalettes,
    isUndoPossible,
    isRedoPossible,
  } = usePaletteHistory();

  const [pickerOpen, setPickerOpen] = useState(false);
  const [hsl, setHsl] = useState<IColor>({ ...color });
  const { hue, saturation, lightness, isBaseColor } = hsl;
  const navHeight = useRecoilValue(navHeightState);

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

  const onRemoveClick = () => {
    const newPallete = removeColor(index, palette);
    setPastPalettes((prev) => [...prev, palette]);
    setPalette(newPallete);
    setFuturePalettes([]);
  };

  const copyHexCode = async (hexCode: string) => {
    await navigator.clipboard.writeText(`#${hexCode}`);
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
    let newPalette = { ...palette };
    let colors = [...palette.colors];
    const newColor = { ...hsl };
    colors.splice(index, 1, newColor);
    newPalette = { ...newPalette, colors };

    setPastPalettes((prev) => [...prev, palette]);
    setPalette(newPalette);
    setFuturePalettes([]);

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
      className={
        "group relative flex-grow flex flex-col justify-center items-center " +
        cls(lightness > 50 ? "text-black" : "text-white")
      }
    >
      <div
        className="absolute top-0 left-0 bottom-0 right-0 m-auto w-full h-[200%] !-z-50"
        style={{
          background: `hsl(${hue},${saturation}%,${lightness}%)`,
        }}
      />
      <ul
        className="flex flex-col justify-end items-center flex-grow relative pb-10
      opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out
      [&>li]:cursor-pointer [&>li]:p-3 [&>li]:mb-1 [&>li]:relative [&>li]:z-10"
        style={{
          transform: `translateY(${-navHeight}px)`,
        }}
      >
        <li
          data-hover-text="Remove"
          data-hover-text-left={isLastChild ? true : undefined}
          onClick={onRemoveClick}
        >
          <Trash className="pointer-events-none" />
        </li>
        <li
          {...magic.dragHandleProps}
          data-hover-text-left={isLastChild ? true : undefined}
          data-hover-text="Drag"
          style={{ cursor: "grab" }}
          // className="!cursor-grab pointer-events-auto"
        >
          <BiMoveHorizontal className="pointer-events-none" />
        </li>
        <li
          data-hover-text="Color picker"
          data-hover-text-left={isLastChild ? true : undefined}
          onClick={cancelChangeColor}
        >
          <TbColorPicker className="pointer-events-none" />
        </li>

        <li
          data-hover-text="Hex code"
          data-hover-text-left={isLastChild ? true : undefined}
          onClick={() => copyHexCode(HSLToHex(hue, saturation, lightness))}
        >
          <TbCopy className="pointer-events-none" />
        </li>
        <li
          data-hover-text="Set as base color"
          data-hover-text-left={isLastChild ? true : undefined}
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
