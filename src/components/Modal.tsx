import { X } from "phosphor-react";
import React, { ReactNode } from "react";

interface IModalProps {
  children: ReactNode;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ children, setShowModal }: IModalProps) {
  return (
    <div
      onClick={() => setShowModal(false)}
      className="fixed top-0 left-0 right-0 bottom-0 m-auto w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.2)] z-50"
    >
      <div className="z-50 max-w-2xl">{children}</div>
    </div>
  );
}

export default Modal;
