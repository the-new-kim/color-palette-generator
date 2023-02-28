import { ArrowsClockwise } from "phosphor-react";
import HarmonySelector from "./HarmonySelector";

function Footer() {
  return (
    <footer className="w-full flex justify-between items-center p-5 bg-white">
      <HarmonySelector />
      <ArrowsClockwise weight="bold" />
    </footer>
  );
}
export default Footer;
