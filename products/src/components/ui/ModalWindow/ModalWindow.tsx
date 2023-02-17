import { Modal, Window } from "@/components/ui/Modal";

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
