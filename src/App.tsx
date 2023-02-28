import { Toaster } from "react-hot-toast";
import CursorFollower from "./components/CursorFollower";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Palette from "./components/Palette";

function App() {
  return (
    <>
      <div className="relative flex flex-col w-full h-screen overflow-x-hidden">
        <Header />
        <main className="flex-grow">
          <Palette />
        </main>
        <Footer />
      </div>
      <Toaster position="top-center" containerClassName="m-10" />
      <CursorFollower />
    </>
  );
}

export default App;
