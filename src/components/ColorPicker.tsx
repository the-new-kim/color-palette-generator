import { Dispatch } from "react";

interface IColorPickerProps {
  setState: Dispatch<boolean>;
}

function ColorPicker({ setState }: IColorPickerProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white w-full h-full flex-grow z-10"
    >
      <form>
        <input type="color" />
      </form>

      <span onClick={() => setState(false)}>Close</span>
    </div>
  );
}

export default ColorPicker;
