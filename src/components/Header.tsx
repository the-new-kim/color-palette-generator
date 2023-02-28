import { Aperture, ArrowArcLeft, ArrowArcRight, Camera } from "phosphor-react";
import { useState } from "react";
import Modal from "./Modal";
import UploadForm from "./UploadForm";

function Header() {
  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <header className="flex justify-between items-center w-full z-10 bg-white p-5">
        <ul className="flex items-center [&>*]:mr-3 [&>*]:cursor-pointer">
          <li data-hover-text="Redo">
            <ArrowArcLeft className="pointer-events-none" />
          </li>
          <li data-hover-text="Undo">
            <ArrowArcRight className="pointer-events-none" />
          </li>
          <li data-hover-text="Photo">
            <Camera onClick={toggleShowModal} className="pointer-events-none" />
          </li>
          <li data-hover-text="Generate Method">
            <Aperture className="pointer-events-none" />
          </li>
        </ul>
      </header>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <UploadForm />
        </Modal>
      )}
    </>
  );
}

export default Header;
