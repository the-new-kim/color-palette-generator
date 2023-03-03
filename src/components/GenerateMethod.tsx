import { AnimatePresence, motion } from "framer-motion";
import usePaletteHistory from "../libs/hooks/usePaletteHistory";
import { EGernerateMethods } from "../libs/types";
import { generatePalette, makeFirstLetterBig } from "../libs/utils";

export default function GenerateMethod() {
  const { palette, setPalette, setPastPalettes, setFuturePalettes, baseColor } =
    usePaletteHistory();

  const onClick = (index: number) => {
    setPastPalettes((prev) => [...prev, palette]);
    setFuturePalettes([]);

    setPalette(
      generatePalette(
        palette.colors.find((color) => color.isBaseColor),
        palette.colors.findIndex((color) => color.isBaseColor),
        palette.colors.length,
        index
      )
    );
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center w-fit">
        {Object.keys(EGernerateMethods)
          .filter((key) => isNaN(Number(key)))
          .map((generateMethod, index) => (
            <div
              className="relative flex justify-center items-center py-1 px-3 cursor-pointer w-full"
              key={generateMethod}
              onClick={() => onClick(index)}
            >
              <div className="mix-blend-difference text-white">
                {makeFirstLetterBig(generateMethod)}
              </div>
              <AnimatePresence>
                {palette.generateMethod === generateMethod && baseColor && (
                  <motion.div
                    key="selected"
                    layoutId="selected"
                    className="w-full h-full absolute top-0 left-0 -z-10 rounded-lg"
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
