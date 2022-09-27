import { atom } from "recoil";
import { generatePalette } from "./helpers";
import { IPalette } from "./types";

export const paletteState = atom<IPalette>({
  key: "paletteState",
  default: generatePalette({}),
});
