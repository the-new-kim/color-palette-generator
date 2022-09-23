import { Dispatch, ReactNode } from "react";

interface IModalProps {
  setState: Dispatch<boolean>;
  child: ReactNode;
}

function Modal({ setState, child }: IModalProps) {
  return (
    <div
      onClick={() => {
        setState(false);
      }}
      className="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)]
      flex justify-center items-center z-50
      "
    >
      <div className="flex justify-center items-center w-[50vw] h-[50vh] max-w-screen-md">
        {child}
      </div>
    </div>
  );
}

export default Modal;
