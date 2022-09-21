import { atom } from "recoil";
import { generatePalette } from "./lib/helpers";
import { ColorHarmonies, IPalette } from "./lib/types";

const defaultPalette = generatePalette({
  colorHarmony: ColorHarmonies.Complementary,
});

export const paletteState = atom<IPalette>({
  key: "paletteState",
  default: defaultPalette,
});
