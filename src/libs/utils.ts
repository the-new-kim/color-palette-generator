import {
  EGernerateMethods,
  ELightness,
  ESaturation,
  IColor,
  IPalette,
} from "./types";

//https://css-tricks.com/converting-color-spaces-in-javascript/
export const HSLToHex = (
  hue: number,
  saturation: number,
  lightness: number
) => {
  saturation /= 100;
  lightness /= 100;

  let c = (1 - Math.abs(2 * lightness - 1)) * saturation,
    x = c * (1 - Math.abs(((hue / 60) % 2) - 1)),
    m = lightness - c / 2,
    red: number | string = 0,
    green: number | string = 0,
    blue: number | string = 0;

  if (0 <= hue && hue < 60) {
    red = c;
    green = x;
    blue = 0;
  } else if (60 <= hue && hue < 120) {
    red = x;
    green = c;
    blue = 0;
  } else if (120 <= hue && hue < 180) {
    red = 0;
    green = c;
    blue = x;
  } else if (180 <= hue && hue < 240) {
    red = 0;
    green = x;
    blue = c;
  } else if (240 <= hue && hue < 300) {
    red = x;
    green = 0;
    blue = c;
  } else if (300 <= hue && hue < 360) {
    red = c;
    green = 0;
    blue = x;
  }
  // Having obtained RGB, convert channels to hex
  red = Math.round((red + m) * 255).toString(16);
  green = Math.round((green + m) * 255).toString(16);
  blue = Math.round((blue + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (red.length === 1) red = "0" + red;
  if (green.length === 1) green = "0" + green;
  if (blue.length === 1) blue = "0" + blue;

  return red + green + blue;
};

export const getAverage = (numbers: number[]) => {
  let sum = 0;
  numbers.map((number) => (sum += number));
  return Math.floor(sum / numbers.length);
};

interface IGernarateSinglColorVariables {
  hue?: number;
  saturation?: number | ESaturation;
  lightness?: number | ELightness;
  isBaseColor: boolean;
}

export const generateSingleColor = ({
  hue = Math.floor(Math.random() * 360),
  saturation = Math.floor(Math.random() * 90) + 10, // 📝 Defualt : 10 ~ 100%  not too low
  lightness = Math.floor(Math.random() * 80) + 10, // 📝 Defualt : 10 ~ 90% not too dark not too bright
  isBaseColor = false,
}: IGernarateSinglColorVariables) => {
  if (saturation === ESaturation.HIGH) {
    saturation = Math.floor(Math.random() * 33) + 67; // 66 ~ 100
  } else if (saturation === ESaturation.MIDDLE) {
    saturation = Math.floor(Math.random() * 32) + 33; // 34 ~ 65
  } else if (saturation === ESaturation.LOW) {
    saturation = Math.floor(Math.random() * 33); // 0 ~ 33
  }

  if (lightness === ELightness.LIGHT) {
    lightness = Math.floor(Math.random() * 20) + 60; // 60 ~ 80
  } else if (lightness === ELightness.MEDIUM) {
    lightness = Math.floor(Math.random() * 20) + 40; // 40 ~ 60
  } else if (lightness === ELightness.DARK) {
    lightness = Math.floor(Math.random() * 20) + 20; // 20 ~ 40
  }

  return { hue, saturation, lightness, isBaseColor };
};

export const generateMultipleColors = (
  baseColor: IColor,
  hueDegreePatterns: number[],
  paletteLenght: number = 5
) => {
  const { hue } = baseColor;

  let colors = [];
  let currentIndex = 0;
  let currentHue = hue;

  for (let i = 0; i < paletteLenght - 1; i++) {
    if (i < hueDegreePatterns.length - 1) {
      currentIndex += 1;
    } else {
      currentIndex = 0;
    }
    currentHue = (currentHue + hueDegreePatterns[currentIndex]) % 360;

    const color = generateSingleColor({
      hue: currentHue,
      isBaseColor: false,
    });

    colors.push(color);
  }

  return colors;
};

export const getRandomGernateMethodValue = () => {
  const keys = Object.keys(EGernerateMethods).filter((key) =>
    isNaN(Number(key))
  );

  return Math.floor(Math.random() * keys.length);
};

export const generatePalette = (
  baseColor: IColor = generateSingleColor({ isBaseColor: true }),
  baseColorIndex: number = 0,
  paletteLength: number = 5,
  generateMethodValue: EGernerateMethods = getRandomGernateMethodValue()
) => {
  let colors: IColor[] = [];
  let generateMethod;

  console.log("BASE COLOR:", baseColor);

  generateMethod = EGernerateMethods[generateMethodValue];

  if (generateMethodValue === EGernerateMethods.COMPLEMENTARY) {
    colors = generateMultipleColors(baseColor, [180], paletteLength);
  } else if (generateMethodValue === EGernerateMethods.TRIADIC) {
    colors = generateMultipleColors(baseColor, [120], paletteLength);
  } else if (generateMethodValue === EGernerateMethods.TETRIADIC) {
    colors = generateMultipleColors(baseColor, [60, 120], paletteLength);
  } else if (generateMethodValue === EGernerateMethods.SQUARE) {
    colors = generateMultipleColors(baseColor, [90], paletteLength);
  } else if (generateMethodValue === EGernerateMethods.ANALOGOUS) {
    colors = generateMultipleColors(baseColor, [30], paletteLength);
  } else if (generateMethodValue === EGernerateMethods.NEUTRAL) {
    colors = generateMultipleColors(baseColor, [15], paletteLength);
  } else if (generateMethodValue === EGernerateMethods.MONOCHROMATIC) {
    colors = generateMultipleColors(baseColor, [0], paletteLength);
  }

  colors.splice(baseColorIndex, 0, baseColor);

  console.log("COLORS:::", colors);

  return { colors, generateMethod };
};

export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export const makeFirstLetterBig = (text: string) => {
  const firstLetter = text.charAt(0).toUpperCase();
  const rest = text.slice(1).toLocaleLowerCase();

  return firstLetter + rest;
};

export const loadFromLocalStorage = (key: string) => {
  const loadedData = localStorage.getItem(key);
  if (!loadedData) return null;

  return JSON.parse(loadedData);
};

export const saveToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const increseNumber = (value: number, increament: number) => {
  return value + increament;
};

export const createAverageColor = (
  btnIndex: number,
  oldPalette: IPalette,
  isLastChild: boolean,
  isFirstChild: boolean
) => {
  let newPalette = { ...oldPalette };
  let colors = [...oldPalette.colors];
  const currentColor = isLastChild ? colors[btnIndex - 1] : colors[btnIndex];
  const comparisonColor = colors[btnIndex - 1]; // Unnecessary for isLastChild...

  const hue =
    !isFirstChild && !isLastChild
      ? ((currentColor.hue + comparisonColor.hue) / 2) % 360 // ❓ NOT SURE ❓ Ignore saturation and lightness?
      : currentColor.hue; ///////////////////////////////////// or compare the fist and last children?
  const saturation = isFirstChild
    ? Math.max(currentColor.saturation - 5, 0)
    : isLastChild
    ? Math.min(currentColor.saturation + 5, 100)
    : getAverage([currentColor.saturation, comparisonColor.saturation]);
  const lightness = isFirstChild
    ? Math.max(currentColor.lightness - 5, 0)
    : isLastChild
    ? Math.min(currentColor.lightness + 5, 100)
    : getAverage([currentColor.lightness, comparisonColor.lightness]);

  const newColor = { hue, saturation, lightness };
  colors.splice(btnIndex, 0, newColor);
  newPalette = { ...newPalette, colors };

  return newPalette;
};

export const removeColor = (index: number, oldPalette: IPalette) => {
  let newPalette = { ...oldPalette };
  let colors = [...oldPalette.colors];

  if (colors[index].isBaseColor) {
    const newBaseColorIndex = !colors[index + 1]
      ? index - 1
      : !colors[index - 1]
      ? index + 1
      : index + 1;

    const newBaseColor = {
      ...colors[newBaseColorIndex],
      isBaseColor: true,
    };

    colors.splice(newBaseColorIndex, 1, newBaseColor);
  }

  colors.splice(index, 1);
  newPalette = { ...newPalette, colors };
  return newPalette;
};
