import {
  Aperture,
  ArrowArcLeft,
  ArrowArcRight,
  ArrowsClockwise,
  Camera,
} from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  baseColorIndexState,
  baseColorState,
  navHeightState,
} from "../libs/atoms";
import usePaletteHistory from "../libs/hooks/usePaletteHistory";

import useElementSize from "../libs/hooks/userElementSize";

import { generatePalette } from "../libs/utils";
import GenerateMethod from "./GenerateMethod";
import Modal from "./Modal";

export default function Nav() {
  const setNavHeight = useSetRecoilState(navHeightState);
  const {
    palette,
    setPalette,
    pastPalettes,
    setPastPalettes,
    futurePalettes,
    setFuturePalettes,
    isUndoPossible,
    isRedoPossible,
  } = usePaletteHistory();

  const [baseColorIndex, setBaseColorIndex] =
    useRecoilState(baseColorIndexState);

  const [baseColor, setBaseColor] = useRecoilState(baseColorState);

  const navRef = useRef<HTMLElement>(null);
  const size = useElementSize(navRef);

  const [showGenerateMethod, setShowGenerateMethod] = useState(false);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(size.clientHeight);
    }
  }, [navRef, size]);

  const toggleShowGenerateMethod = () => {
    setShowGenerateMethod((prev) => !prev);
  };

  const onRandomClick = () => {
    // setPastPalettes((prev) => [...prev, palette]);
    // setFuturePalettes([]);
    // const newPalette = generatePalette();
    // setPalette(newPalette);

    setPastPalettes((prev) => [...prev, palette]);
    setFuturePalettes([]);

    setPalette(
      generatePalette(
        baseColor,
        palette.colors.findIndex((color) => color.isBaseColor),
        palette.colors.length
      )
    );
  };

  const onUndoClick = () => {
    if (!isUndoPossible()) return;

    setFuturePalettes((prev) => [palette, ...prev]);
    setPalette(pastPalettes[pastPalettes.length - 1]);
    setPastPalettes((prev) => prev.slice(0, prev.length - 1));
  };

  const onRedoClick = () => {
    if (!isRedoPossible()) return;

    setPastPalettes((prev) => [...prev, palette]);
    setPalette(futurePalettes[0]);
    setFuturePalettes((prev) => prev.slice(1, prev.length));
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed bottom-0 left-0 z-[10000] w-full bg-white p-5"
      >
        <ul className="flex items-center [&>*]:mr-3 [&>*]:cursor-pointer">
          <li data-hover-text="Undo" onClick={onUndoClick}>
            <ArrowArcLeft className="pointer-events-none" />
          </li>
          <li data-hover-text="Redo" onClick={onRedoClick}>
            <ArrowArcRight className="pointer-events-none" />
          </li>
          <li data-hover-text="Photo">
            <Camera className="pointer-events-none" />
          </li>
          <li
            data-hover-text="Generate method"
            onClick={toggleShowGenerateMethod}
          >
            <Aperture className="pointer-events-none" />
          </li>
          <li data-hover-text="Generate random colors" onClick={onRandomClick}>
            <ArrowsClockwise className="pointer-events-none" />
          </li>
        </ul>
      </nav>

      <Modal showing={showGenerateMethod} setShowing={setShowGenerateMethod}>
        <GenerateMethod />
      </Modal>
    </>
  );
}
