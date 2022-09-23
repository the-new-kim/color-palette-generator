import { useRecoilState, useRecoilValue } from "recoil";
import { baseColorState, paletteState } from "../atoms";
import { generatePalette } from "../helpers";
import { EColorHarmonies } from "../types";
import { motion } from "framer-motion";

function Filter() {
  const [palette, setPalette] = useRecoilState(paletteState);
  const baseColor = useRecoilValue(baseColorState);

  return (
    <ul className="z-10 bg-white text-xl">
      {Object.keys(EColorHarmonies)
        .filter((key) => isNaN(Number(key)))
        .map((colorHarmonyName, index) => (
          <li className="relative" key={colorHarmonyName}>
            <span
              className="cursor-pointer px-3 text-white mix-blend-difference font-thin"
              onClick={() =>
                setPalette(
                  generatePalette({
                    colorHarmony: index,
                    baseColor: baseColor || undefined,
                  })
                )
              }
            >
              {colorHarmonyName}
            </span>
            {palette.harmonyName === colorHarmonyName && (
              <motion.span
                style={{
                  background: `hsl(${baseColor ? baseColor.hue : 0},${
                    baseColor ? baseColor.saturation : 0
                  }%,${baseColor ? baseColor.lightness : 0}%)`,
                }}
                className="absolute top-0 bottom-0 left-0 w-full -z-10"
                layoutId="activeHarmony"
              ></motion.span>
            )}
          </li>
        ))}
    </ul>
  );
}

export default Filter;
