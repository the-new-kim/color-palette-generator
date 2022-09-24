import { Toaster } from "react-hot-toast";
import Router from "./Router";

function App() {
  // siteTitle?
  return (
    <>
      {/* Helmet? */}

      <Router />
      <Toaster position="top-center" containerClassName="m-10" />
    </>
  );
}

export default App;
