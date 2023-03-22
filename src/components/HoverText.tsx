import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cls } from "../libs/utils";
import { useMousePosition } from "@kims-hooks/use-mouse-position";

export default function HoverText() {
  const { x, y } = useMousePosition();
  const [hoverText, setHoverText] = useState<string>();
  const [textLeft, setTextLeft] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const isPointer = window.getComputedStyle(target)["cursor"] === "pointer";
      const isGrab = window.getComputedStyle(target)["cursor"] === "grab";

      if (isPointer || isGrab) {
        setHoverText(target.dataset.hoverText);
        setTextLeft(target.dataset.hoverTextLeft ? true : false);
      } else {
        setHoverText(undefined);
      }
    };
    document.addEventListener("mouseover", handleMouseOver);

    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, []);

  return (
    <AnimatePresence>
      {hoverText && (
        <motion.div
          key={hoverText}
          ref={ref}
          initial={{
            opacity: 0,
            scale: 0,
            x,
            y,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x,
            y,
          }}
          exit={{
            opacity: 0,
            scale: 0,
            x,
            y,
            transition: {
              delay: 0.1,
            },
          }}
          className="fixed top-0 left-0 z-[50000]"
        >
          <div
            className={
              "absolute bg-gradient-to-b from-slate-100 to-white text-sm pointer-events-none rounded-xl p-2 shadow-lg whitespace-nowrap -top-3 -translate-y-[100%] " +
              cls(
                textLeft
                  ? "rounded-br-none -translate-x-[100%] -left-3"
                  : "rounded-bl-none left-3"
              )
            }
          >
            {hoverText}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
