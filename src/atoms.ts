import { atom } from "recoil";
import { generatePalette } from "./helpers";
import { IPalette } from "./types";

const defaultPalette = generatePalette({});

export const paletteState = atom<IPalette>({
  key: "paletteState",
  default: defaultPalette,
});
