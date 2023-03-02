import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  baseColorIndexState,
  baseColorState,
  paletteState,
} from "../libs/atoms";
import usePaletteHistory from "../libs/hooks/usePaletteHistory";
import { EColorHarmonies, IColor } from "../libs/types";
import { generatePalette, makeFirstLetterBig } from "../libs/utils";

export default function GenerateMethod() {
  const {
    palette,
    setPalette,
    // pastPalettes,
    setPastPalettes,
    // futurePalettes,
    setFuturePalettes,
    // isUndoPossible,
    // isRedoPossible,
  } = usePaletteHistory();

  const [baseColorIndex, setBaseColorIndex] =
    useRecoilState(baseColorIndexState);

  const [baseColor, setBaseColor] = useRecoilState(baseColorState);

  useEffect(() => {
    const harmonyIndex = Object.keys(EColorHarmonies)
      .filter((key) => isNaN(Number(key)))
      .findIndex(
        (colorHarmonyName) => colorHarmonyName === palette.harmonyName
      );
    setBaseColorIndex(harmonyIndex);

    const foundBaseColor = palette.colors.find((color) => color.isBaseColor);
    if (!foundBaseColor) return;
    setBaseColor(foundBaseColor);
  }, [palette]);

  const onClick = (index: number) => {
    setPastPalettes((prev) => [...prev, palette]);
    setFuturePalettes([]);

    setPalette(
      generatePalette(
        baseColor,
        palette.colors.findIndex((color) => color.isBaseColor),
        palette.colors.length,
        index
      )
    );
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-fit">
        {Object.keys(EColorHarmonies)
          .filter((key) => isNaN(Number(key)))
          .map((colorHarmonyName, index) => (
            <div
              className="relative flex justify-center items-center py-1 px-3 cursor-pointer w-full"
              key={colorHarmonyName}
              onClick={() => onClick(index)}
            >
              <div className="mix-blend-difference text-white">
                {makeFirstLetterBig(colorHarmonyName)}
              </div>
              <AnimatePresence>
                {baseColorIndex === index && (
                  <motion.div
                    key="selected"
                    layoutId="selected"
                    className="w-full h-full absolute top-0 left-0 -z-10 rounded-lg"
                    onAnimationComplete={() => console.log("end")}
                    onAnimationEnd={() => console.log("end")}
                    style={{
                      background: `hsl(${baseColor.hue},${baseColor.saturation}%,${baseColor.lightness}%)`,
                    }}
                  />
                )}
              </AnimatePresence>
            </div>
          ))}
      </div>
    </div>
  );
}
