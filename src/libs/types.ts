export enum EColorHarmonies {
  COMPLEMENTARY,
  TRIADIC,
  TETRIADIC,
  SQUARE,
  ANALOGOUS,
  NEUTRAL,
  MONOCHROMATIC,
}

export enum ESaturation {
  HIGH, // 66 ~ 100
  MIDDLE, // 34 ~ 65
  LOW, // 0 ~ 33
}

export enum ELightness {
  LIGHT, // 60~80
  MEDIUM, // 40~60
  DARK, // 20~40
}

export interface IColor {
  hue: number;
  saturation: number;
  lightness: number;
  isBaseColor?: boolean;
}

export interface IPalette {
  colors: IColor[];
  harmonyName: string;
}

export interface ILocalstorageHistory {
  currentIndex: number;
  palettes: IPalette[];
}

export interface IPaletteHistory {
  past: IPalette[];
  current: IPalette | null;
  future: IPalette[];
}
