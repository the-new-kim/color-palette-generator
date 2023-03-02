import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { paletteState } from "../libs/atoms";
import usePaletteHistory from "../libs/hooks/usePaletteHistory";

import { HSLToHex } from "../libs/utils";
import AddColorBtn from "./AddColorBtn";
import Color from "./Color";

function Palette() {
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

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination || destination.index === source.index) return;

    const colors = [...palette.colors];
    const draggingColor = colors[source.index];
    colors.splice(source.index, 1);
    colors.splice(destination.index, 0, draggingColor);
    const newPalette = { ...palette, colors };

    setPastPalettes((prev) => [...prev, palette]);
    setPalette(newPalette);
    setFuturePalettes([]);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center flex-grow h-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="palette" direction="horizontal">
          {(magic) => (
            <div
              ref={magic.innerRef}
              {...magic.droppableProps}
              className="flex-grow w-full flex flex-wrap"
            >
              {/* ❗❗draggableId & key must be unique. so do not use index of array❗❗ */}
              {palette.colors.map((color, index) => (
                <Draggable
                  draggableId={HSLToHex(
                    color.hue,
                    color.saturation,
                    color.lightness
                  )}
                  key={HSLToHex(color.hue, color.saturation, color.lightness)}
                  index={index}
                >
                  {(magic) => (
                    <div
                      ref={magic.innerRef}
                      {...magic.draggableProps}
                      className="relative flex flex-grow"
                    >
                      {index === 0 ? (
                        <AddColorBtn index={index} isFirstChild />
                      ) : (
                        <AddColorBtn index={index} />
                      )}
                      <Color
                        index={index}
                        color={color}
                        magic={magic}
                        isLastChild={palette.colors.length - 1 === index}
                      />
                      {index === palette.colors.length - 1 && (
                        <AddColorBtn
                          index={palette.colors.length}
                          isLastChild
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {magic.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Palette;
