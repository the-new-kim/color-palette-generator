import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { baseColorState, paletteState } from "../atoms";
// import ColorPicker from "../components/ColorPicker";
import Filter from "../components/Filter";
// import Modal from "../components/Modal";
import Palette from "../components/Palette";

function Home() {
  // pageTitle?

  const palette = useRecoilValue(paletteState);
  const [baseColor, setBaseColor] = useRecoilState(baseColorState);
  // const [colorPickerOpen, setColorPickerOpen] = useState<boolean>(false);

  useEffect(() => {
    const base = palette.colors.find((color) => color.isBaseColor);
    if (!base) return;
    setBaseColor(base);
  }, [baseColor, palette.colors, setBaseColor]);

  return (
    <section className="relative overflow-hidden w-full min-h-screen flex flex-col">
      <Palette />

      <div className="h-56 w-full flex justify-between items-center">
        <Filter />
        {/* <div onClick={() => setColorPickerOpen((prev) => !prev)}>
          Color Picker
        </div> */}
      </div>

      {/* {colorPickerOpen && (
        <Modal
          setState={setColorPickerOpen}
          child={<ColorPicker setState={setColorPickerOpen} />}
        />
      )} */}
    </section>
  );
}

export default Home;
