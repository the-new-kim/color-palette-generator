import { Toaster } from "react-hot-toast";
import HoverText from "./components/HoverText";
import { Helmet } from "react-helmet";

import Palette from "./components/Palette";
import Nav from "./components/Nav";
import { useRecoilValue } from "recoil";
import { paletteState } from "./libs/atoms";
import { useEffect } from "react";
import usePaletteHistory from "./libs/hooks/usePaletteHistory";

function App() {
  return (
    <div className="text-lg mg:text-xl lg:text-2xl">
      <Helmet>
        <title>Color palette generagtro</title>
      </Helmet>
      <main className="fixed top-0 left-0 flex w-full h-screen overflow-hidden">
        <Palette />
      </main>
      <Nav />
      <Toaster position="top-center" containerClassName="m-10" />
      <HoverText />
    </div>
  );
}

export default App;
