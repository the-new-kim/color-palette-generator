import { useSetRecoilState } from "recoil";
import { paletteState } from "../atoms";
import { getAverage } from "../helpers";

import { TbPlus } from "react-icons/tb";

interface IAddColorBtnProps {
  isFirstChild?: boolean;
  isLastChild?: boolean;
  index: number;
}

function AddColorBtn({ isFirstChild, isLastChild, index }: IAddColorBtnProps) {
  const setPalette = useSetRecoilState(paletteState);

  const addColor = (btnIndex: number) => {
    setPalette((oldPalette) => {
      let newPalette = { ...oldPalette };
      let colors = [...oldPalette.colors];
      const currentColor = isLastChild
        ? colors[btnIndex - 1]
        : colors[btnIndex];
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
    });
  };

  return (
    <div
      className={`group z-10
      absolute top-0 bottom-0 m-auto flex justify-center items-center 
      ${isLastChild ? "right-0" : "left-0"} 
      ${!isFirstChild && !isLastChild && "translate-x-[-50%]"}
      `}
    >
      <div
        className="bg-white w-10 h-10 rounded-full flex justify-center items-center shadow-lg
        opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out cursor-pointer"
        onClick={() => addColor(index)}
      >
        <TbPlus />
      </div>
    </div>
  );
}

export default AddColorBtn;
