import { ColorHarmonies, IColor } from "./types";

export const generateLightness = () => {
  ///////// 💡 brightness range.... dark, light, medium or 10~30%, 40~80% ...
};

export const generateRandomColor = () => {
  return {
    hue: Math.floor(Math.random() * 360),
    saturation: Math.floor(Math.random() * 40) + 60, ////// ❗ not too low 50 ~ 100% ?
    lightness: Math.floor(Math.random() * 60) + 20, ////// ❗ not too dark not too bright in default mode... 20 ~ 80%?
  };
};

interface IGeneratePaletteProps {
  primaryColor?: IColor;
  colorHarmony?: ColorHarmonies;
}

export const generatePalette = ({
  primaryColor,
  colorHarmony,
}: IGeneratePaletteProps) => {
  let colors = [];

  if (typeof primaryColor === "undefined") {
    primaryColor = generateRandomColor();
  }

  colors.push(primaryColor);

  if (typeof colorHarmony === "undefined") {
    const keys = Object.keys(ColorHarmonies).filter((key) =>
      isNaN(Number(key))
    );
    const length = keys.length;
    const randomIndex = Math.floor(Math.random() * length);
    colorHarmony = randomIndex;
  }

  ////// 💡 looperFn( paletteLength, period ) => { ...
  //////                 if(period > paletteLenght) .....
  //////   let i = 0  index % period && i+=15  >>>> hue + 15 deg every period ?

  if (colorHarmony === ColorHarmonies.Complementary) {
    const hue = primaryColor.hue + 180;

    const complementaryColor: IColor = {
      ...primaryColor,
      hue,
    };
    colors.push(complementaryColor);
  } else if (colorHarmony === ColorHarmonies.Triadic) {
    // generate and push colors
  } else if (colorHarmony === ColorHarmonies.Tetradic) {
    // generate and push colors
  } else if (colorHarmony === ColorHarmonies.Square) {
    // generate and push colors
  } else if (colorHarmony === ColorHarmonies.Analogous) {
    // generate and push colors
  } else if (colorHarmony === ColorHarmonies.Neutral) {
    // generate and push colors
  }

  return { colors };
};
