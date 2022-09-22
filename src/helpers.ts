import { EColorHarmonies, ELightness, ESaturation, IColor } from "./types";

export const generateSingleColor = ({
  hue,
  saturation,
  lightness,
}: {
  hue?: number;
  saturation?: number | ESaturation;
  lightness?: number | ELightness;
}) => {
  if (typeof hue === "undefined") {
    hue = Math.floor(Math.random() * 360);
  }

  if (typeof saturation === "undefined") {
    // 📝 Defualt : 40 ~ 100%  not too low
    saturation = Math.floor(Math.random() * 80) + 20;
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
    // 📝 Defualt : 20 ~ 80% not too dark not too bright
    lightness = Math.floor(Math.random() * 60) + 20;
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
  console.log(hue, saturation, lightness);
  return { hue, saturation, lightness };
};

export const generateMultipleColors = (
  paletteLenght: number,
  hueDegreePatterns: number[],
  primaryColor: IColor
) => {
  const { hue, saturation, lightness } = primaryColor;

  let colors = [primaryColor];
  let currentIndex = 0;
  let currentHue = hue;

  for (let i = 0; i < paletteLenght - 1; i++) {
    if (i < hueDegreePatterns.length - 1) {
      currentIndex += 1;
    } else {
      currentIndex = 0;
    }
    currentHue += hueDegreePatterns[currentIndex];

    ////////❗ looper if paletteLenth is bigger than patterns length...

    // Filter ?

    // Random ?

    // const color = generateSingleColor({
    //   hue: currentHue,
    // });
    // colors.push(color);

    // Default: Saturation & Lightness are same as primary
    const color = generateSingleColor({
      hue: currentHue,
      saturation,
      lightness,
    });

    colors.push(color);
  }

  return colors;
};

export const generatePalette = ({
  primaryColor,
  colorHarmony,
}: {
  primaryColor?: IColor;
  colorHarmony?: EColorHarmonies;
}) => {
  let colors: IColor[] = [];
  let harmonyName = "";

  if (typeof primaryColor === "undefined") {
    primaryColor = generateSingleColor({});
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
    colors = generateMultipleColors(2, [180], primaryColor);
  } else if (colorHarmony === EColorHarmonies.TRIADIC) {
    colors = generateMultipleColors(3, [120], primaryColor);
  } else if (colorHarmony === EColorHarmonies.TETRIADIC) {
    colors = generateMultipleColors(4, [60, 120], primaryColor);
  } else if (colorHarmony === EColorHarmonies.SQUARE) {
    colors = generateMultipleColors(4, [90], primaryColor);
  } else if (colorHarmony === EColorHarmonies.ANALOGOUS) {
    colors = generateMultipleColors(3, [30], primaryColor);
  } else if (colorHarmony === EColorHarmonies.NEUTRAL) {
    colors = generateMultipleColors(3, [15], primaryColor);
  }

  return { colors, harmonyName };
};
