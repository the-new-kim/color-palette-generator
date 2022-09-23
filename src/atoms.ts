import { atom } from "recoil";
import { generatePalette } from "./helpers";
import { IColor, IPalette } from "./types";

const defaultPalette = generatePalette({});

export const paletteState = atom<IPalette>({
  key: "paletteState",
  default: defaultPalette,
});

export const baseColorState = atom<IColor | null>({
  key: "baseColorState",
  default: null,
});
