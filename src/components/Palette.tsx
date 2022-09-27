import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import { paletteState } from "../atoms";
import AddColorBtn from "./AddColorBtn";

import Color from "./Color";

function Palette() {
  const palette = useRecoilValue(paletteState);
  const onDragEnd = () => {
    console.log("drag end");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full flex flex-col items-center justify-center flex-grow">
        <Droppable droppableId={palette.harmonyName} direction="horizontal">
          {(magic) => (
            <div
              ref={magic.innerRef}
              {...magic.droppableProps}
              className="flex-grow w-full flex flex-wrap"
              // style={{
              //   display: "grid",
              //   gridTemplateColumns: `repeat(${palette.colors.length}, 1fr)`,
              //   gridRow: 1,
              // }}
            >
              {palette.colors.map((color, index) => (
                <Draggable
                  draggableId={palette.harmonyName.toLocaleLowerCase() + index}
                  index={index}
                  key={palette.harmonyName.toLocaleLowerCase() + index}
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
                      <Color index={index} color={color} magic={magic} />
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
      </div>
    </DragDropContext>
  );
}

export default Palette;
