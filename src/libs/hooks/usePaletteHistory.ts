import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { futurePalettesState, paletteState, pastPalettesState } from "../atoms";

export default function usePaletteHistory() {
  const [palette, setPalette] = useRecoilState(paletteState);
  const [pastPalettes, setPastPalettes] = useRecoilState(pastPalettesState);
  const [futurePalettes, setFuturePalettes] =
    useRecoilState(futurePalettesState);

  const [baseColor, setBaseColor] = useState(
    palette.colors.find((color) => color.isBaseColor)
  );
  const [baseColorIndex, setBaseColorIndex] = useState(
    palette.colors.findIndex((color) => color.isBaseColor)
  );

  const checkIsUndoPossible = () => pastPalettes.length > 0;
  const checkIsRedoPossible = () => futurePalettes.length > 0;

  const [isUndoPossible, setIsUndoPossble] = useState(checkIsUndoPossible());
  const [isRedoPossible, setISRedoPossible] = useState(checkIsRedoPossible());

  useEffect(() => {
    setBaseColor(palette.colors.find((color) => color.isBaseColor));
    setBaseColorIndex(palette.colors.findIndex((color) => color.isBaseColor));
    setIsUndoPossble(checkIsUndoPossible());
    setISRedoPossible(checkIsRedoPossible());
  }, [palette]);

  return {
    palette,
    setPalette,
    pastPalettes,
    setPastPalettes,
    futurePalettes,
    setFuturePalettes,
    isUndoPossible,
    isRedoPossible,
    baseColor,
    baseColorIndex,
  };
}
