import { atom } from "recoil";

export interface IColor {
  hue: number;
  saturation: number;
  lightness: number;
}

interface IPalette {
  colors: IColor[];
}

const defaultPalette: IPalette = {
  colors: [
    {
      hue: Math.floor(Math.random() * 359),
      saturation: Math.floor(Math.random() * 100),
      lightness: Math.floor(Math.random() * 100),
    },
    {
      hue: Math.floor(Math.random() * 359),
      saturation: Math.floor(Math.random() * 100),
      lightness: Math.floor(Math.random() * 100),
    },
    {
      hue: Math.floor(Math.random() * 359),
      saturation: Math.floor(Math.random() * 100),
      lightness: Math.floor(Math.random() * 100),
    },
  ],
};

// Filter Enum & Filter State Atom

export const paletteState = atom({
  key: "paletteState",
  default: defaultPalette,
});
