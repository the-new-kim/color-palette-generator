import { EColorHarmonies, ELightness, ESaturation, IColor } from "./types";

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

export const generateSingleColor = ({
  hue,
  saturation,
  lightness,
  isBaseColor = false,
}: {
  hue?: number;
  saturation?: number | ESaturation;
  lightness?: number | ELightness;
  isBaseColor: boolean;
}) => {
  if (typeof hue === "undefined") {
    hue = Math.floor(Math.random() * 360);
  }

  if (typeof saturation === "undefined") {
    // 📝 Defualt : 10 ~ 100%  not too low
    saturation = Math.floor(Math.random() * 90) + 10;
  }
  //
  else if (saturation === ESaturation.HIGH) {
    saturation = Math.floor(Math.random() * 33) + 67; // 66 ~ 100
  } else if (saturation === ESaturation.MIDDLE) {
    saturation = Math.floor(Math.random() * 32) + 33; // 34 ~ 65
  } else if (saturation === ESaturation.LOW) {
    saturation = Math.floor(Math.random() * 33); // 0 ~ 33
  }

  // else .....get saturation directly as a number

  if (typeof lightness === "undefined") {
    // 📝 Defualt : 10 ~ 90% not too dark not too bright
    lightness = Math.floor(Math.random() * 80) + 10;
  }
  //
  else if (lightness === ELightness.LIGHT) {
    lightness = Math.floor(Math.random() * 20) + 60; // 60 ~ 80
  } else if (lightness === ELightness.MEDIUM) {
    lightness = Math.floor(Math.random() * 20) + 40; // 40 ~ 60
  } else if (lightness === ELightness.DARK) {
    lightness = Math.floor(Math.random() * 20) + 20; // 20 ~ 40
  }

  // else .....get lightness directly as a number

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

export const generatePalette = ({
  baseColor,
  baseColorIndex = 0,
  paletteLength = 5,
  colorHarmony,
}: {
  baseColor?: IColor;
  baseColorIndex?: number;
  paletteLength?: number;
  colorHarmony?: EColorHarmonies;
}) => {
  let colors: IColor[] = [];
  let harmonyName = "";

  if (typeof baseColor === "undefined") {
    baseColor = generateSingleColor({ isBaseColor: true });
  }

  if (typeof colorHarmony === "undefined") {
    const keys = Object.keys(EColorHarmonies).filter((key) =>
      isNaN(Number(key))
    );
    const length = keys.length;
    const randomIndex = Math.floor(Math.random() * length);
    colorHarmony = randomIndex;
  }

  harmonyName = EColorHarmonies[colorHarmony];

  if (colorHarmony === EColorHarmonies.COMPLEMENTARY) {
    colors = generateMultipleColors(baseColor, [180], paletteLength);
  } else if (colorHarmony === EColorHarmonies.TRIADIC) {
    colors = generateMultipleColors(baseColor, [120], paletteLength);
  } else if (colorHarmony === EColorHarmonies.TETRIADIC) {
    colors = generateMultipleColors(baseColor, [60, 120], paletteLength);
  } else if (colorHarmony === EColorHarmonies.SQUARE) {
    colors = generateMultipleColors(baseColor, [90], paletteLength);
  } else if (colorHarmony === EColorHarmonies.ANALOGOUS) {
    colors = generateMultipleColors(baseColor, [30], paletteLength);
  } else if (colorHarmony === EColorHarmonies.NEUTRAL) {
    colors = generateMultipleColors(baseColor, [15], paletteLength);
  } else if (colorHarmony === EColorHarmonies.MONOCHROMATIC) {
    colors = generateMultipleColors(baseColor, [0], paletteLength);
  }

  colors.splice(baseColorIndex, 0, baseColor);

  return { colors, harmonyName };
};
