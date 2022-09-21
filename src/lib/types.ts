export enum ColorHarmonies {
  Complementary,
  Triadic,
  Tetradic,
  Square,
  Analogous,
  Neutral,
}

export interface IColor {
  hue: number;
  saturation: number;
  lightness: number;
}

export interface IPalette {
  colors: IColor[];
}
