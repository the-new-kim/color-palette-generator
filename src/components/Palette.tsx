import { useRecoilValue } from "recoil";
import { paletteState } from "../atoms";
import AddColorBtn from "./AddColorBtn";

import Color from "./Color";

function Palette() {
  const palette = useRecoilValue(paletteState);

  return (
    <div className="w-full flex flex-col items-center justify-center flex-grow">
      <div className="flex flex-grow w-full">
        {palette.colors.map((color, index) => (
          <div key={"palette" + index} className="relative flex flex-grow">
            {index === 0 ? (
              <AddColorBtn index={index} isFirstChild />
            ) : (
              <AddColorBtn index={index} />
            )}
            <Color index={index} color={color} />
            {index === palette.colors.length - 1 && (
              <AddColorBtn index={palette.colors.length} isLastChild />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Palette;
