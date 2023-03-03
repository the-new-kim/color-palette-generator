import { atom } from "recoil";
import { generatePalette } from "./utils";
import { IColor, IPalette } from "./types";

export const paletteState = atom<IPalette>({
  key: "paletteState",
  default: generatePalette(),
});

export const pastPalettesState = atom<IPalette[]>({
  key: "pastPalettesState",
  default: [],
});

export const futurePalettesState = atom<IPalette[]>({
  key: "futurePalettesState",
  default: [],
});

export const navHeightState = atom<number>({
  key: "navHeightState",
  default: 0,
});
