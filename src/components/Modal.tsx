import { AnimatePresence, motion } from "framer-motion";
import { X } from "phosphor-react";
import { ReactNode, useEffect } from "react";
import { fadeInOutVariants } from "../libs/variants";

interface IModalProps {
  children: ReactNode;
  showing: boolean;
  setShowing: React.Dispatch<React.SetStateAction<boolean>>;
  layoutId?: string;
}

export default function Modal({
  children,
  showing,
  setShowing,
  layoutId,
}: IModalProps) {
  const closeModal = () => {
    setShowing(false);
  };

  const onModalClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (!showing) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        setShowing(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showing]);

  return (
    <AnimatePresence>
      {showing && (
        <motion.div
          variants={fadeInOutVariants}
          initial="fadeOut"
          animate="fadeIn"
          exit="fadeOut"
          onClick={closeModal}
          className="fixed top-0 left-0 w-full min-h-screen h-full bg-[rgba(0,0,0,0.3)] z-50 flex justify-center items-center overflow-y-auto"
        >
          <motion.div
            onClick={onModalClick}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            layoutId={layoutId}
            className="absolute top-0 left-0 right-0 bottom-0 m-auto max-w-2xl w-fit max-h-fit bg-white p-5 z-50 rounded-lg shadow-lg"
          >
            <header className="mb-3 w-full flex justify-end items-center">
              <X
                onClick={closeModal}
                className="cursor-pointer z-50 text-base"
              />
            </header>
            <div className="px-5 pb-3">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
