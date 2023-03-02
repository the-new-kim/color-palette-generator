import { useRecoilState } from "recoil";
import { futurePalettesState, paletteState, pastPalettesState } from "../atoms";

export default function usePaletteHistory() {
  const [palette, setPalette] = useRecoilState(paletteState);
  const [pastPalettes, setPastPalettes] = useRecoilState(pastPalettesState);
  const [futurePalettes, setFuturePalettes] =
    useRecoilState(futurePalettesState);

  const isUndoPossible = () => pastPalettes.length > 0;
  const isRedoPossible = () => futurePalettes.length > 0;

  return {
    palette,
    setPalette,
    pastPalettes,
    setPastPalettes,
    futurePalettes,
    setFuturePalettes,
    isUndoPossible,
    isRedoPossible,
  };
}
