import React from "react";

import { Modal, Window } from "@/components/ui/Modal";
import { useEffect } from "react";

const ModalWindow = ({ showModal, setClosed, title, children }: any) => {
  return (
    <Modal showModal={showModal}>
      <Window
        title={title}
        setClosed={setClosed}
        className={showModal ? "fadeInDown" : "fadeOutUp"}>
        {children}
      </Window>
    </Modal>
  );
};

export default ModalWindow;
