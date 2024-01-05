import { attachmentStore } from "../zustand/index";

const useAttachment = () => {
  const { attachment, attach, isLoading, isError, error } = attachmentStore(
    (state) => ({
      attachment: state.attachment,
      attach: state.attach,
      isLoading: state.isLoading,
      isError: state.isError,
      error: state.error,
    })
  );

  const { resetAttach, resetDocuments, getDocumentsById, getAttachByiD } =
    attachmentStore();

  return {
    attach,
    attachment,
    resetAttach,
    resetDocuments,
    getDocumentsById,
    getAttachByiD,
    isLoading,
    isError,
    error,
  };
};

export default useAttachment;
