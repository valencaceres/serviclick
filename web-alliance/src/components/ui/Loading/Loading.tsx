import Image from "next/image";
import React from "react";
import { Modal } from "../Modal";

const Loading = () => {
  return (
    <Modal showModal={true}>
      <Image
        alt="Espere..."
        src="/images/icons/loading.svg"
        width="256"
        height="256"
      />
    </Modal>
  );
};

export default Loading;
