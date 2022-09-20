enum ColorType {
  none = "NONE",
}

//⭐️ Color Harmonies

//COMPLEMENTARY COLORS
//TRIADIC COLORS
//TETRADIC COLORS ====> 60 degrees 4 pooints
//ANALOGOUS COLORS  ====> 30 degrees apart
//NEUTRAL COLORS  ===> 15 degrees apart
//Monochromatic

//⭐️ Color Shades, Tints and Tones

//COLOR SHADES =====> Adding Black |||| lightness ⬇️
//COLOR TINTS =====> Adding White ||||| lightness ⬆️
//COLOR TONES ====> Adding Gray ||||| saturation ⬇️ lightness ⬆️

export const generateRandomColor = () => {
  // Random
  // return Math.floor(Math.random() * 255);
  // Pastel? Light?
  // return Math.floor(Math.random() * 150) + 100;
  // Dark
  return Math.floor(Math.random() * 100);
};
