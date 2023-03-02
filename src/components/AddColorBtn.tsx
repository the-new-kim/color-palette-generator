import { useSetRecoilState } from "recoil";
import { paletteState } from "../libs/atoms";
import { cls, createAverageColor, getAverage } from "../libs/utils";

import { TbPlus } from "react-icons/tb";
import usePaletteHistory from "../libs/hooks/usePaletteHistory";

interface IAddColorBtnProps {
  isFirstChild?: boolean;
  isLastChild?: boolean;
  index: number;
}

function AddColorBtn({
  isFirstChild = false,
  isLastChild = false,
  index,
}: IAddColorBtnProps) {
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

  const onClick = (btnIndex: number) => {
    const newPallete = createAverageColor(
      btnIndex,
      palette,
      isLastChild,
      isFirstChild
    );
    setPastPalettes((prev) => [...prev, palette]);
    setPalette(newPallete);
    setFuturePalettes([]);
  };

  return (
    <div
      className={cls(`group z-10
      absolute top-0 bottom-0 m-auto flex justify-center items-center 
      ${isLastChild ? "right-0" : "left-0"} 
      ${!isFirstChild && !isLastChild && "translate-x-[-50%]"}
      `)}
    >
      <div
        className="bg-white w-10 h-10 rounded-full flex justify-center items-center shadow-lg
        opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out cursor-pointer pointer-events-auto"
        onClick={() => onClick(index)}
        data-hover-text="Add Color"
        data-hover-text-left={isLastChild ? true : undefined}
      >
        <TbPlus className="pointer-events-none" />
      </div>
    </div>
  );
}

export default AddColorBtn;
