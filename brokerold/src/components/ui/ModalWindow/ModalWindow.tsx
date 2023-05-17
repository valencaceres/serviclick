import React from "react";

import { Modal, Window } from "../Modal";

const ModalWindow = ({ showModal, setClosed, title, children }: any) => {
  return (
    <Modal showModal={showModal}>
      <Window title={title} setClosed={setClosed}>
        {children}
      </Window>
    </Modal>
  );
};

export default ModalWindow;
