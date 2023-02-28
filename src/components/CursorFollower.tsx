import { useLayoutEffect, useRef, useState } from "react";
import useMousePosition from "../libs/hooks/useMousePosition";
import { AnimatePresence, motion } from "framer-motion";

export default function CursorFollower() {
  const { x, y } = useMousePosition();
  const [hoverText, setHoverText] = useState<string>();

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      const isPointer = window.getComputedStyle(target)["cursor"] === "pointer";

      if (isPointer) {
        setHoverText(target.dataset.hoverText);
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
          className="bg-gradient-to-b from-slate-100 to-white text-sm fixed top-5 left-5 z-50 pointer-events-none rounded-xl p-2 rounded-tl-none shadow-lg"
        >
          {hoverText}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
