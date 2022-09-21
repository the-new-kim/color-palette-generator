import { useState } from "react";
import { useRecoilState } from "recoil";
import { paletteState } from "../atoms";
import Color from "./Color";
import ColorPicker from "./ColorPicker";
import Modal from "./Modal";

export interface IColorPickerState {
  state: boolean;
}

function Palette() {
  const [palette, setPalette] = useRecoilState(paletteState);
  console.log(palette);

  const [colorPickerOpen, setColorPickerOpen] = useState<boolean>(false);

  return (
    <section
      className="relative overflow-hidden w-screen bg-slate-400 
    flex flex-col items-center justify-center flex-grow"
    >
      <div className="flex flex-grow w-full">
        {palette.colors.map((color, index) => (
          <Color key={index} color={color} />
        ))}
      </div>
      <div className="bg-white h-56 w-full flex justify-between items-center">
        <div>Filter</div>
        <div onClick={() => setColorPickerOpen((prev) => !prev)}>
          Color Picker
        </div>
      </div>
      {colorPickerOpen && (
        <Modal
          setState={setColorPickerOpen}
          child={<ColorPicker setState={setColorPickerOpen} />}
        />
      )}
    </section>
  );
}

export default Palette;
