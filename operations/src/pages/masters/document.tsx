import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { DocumentList } from "../../components/functional/_masters/Document";

import { useUI, useFamily, useDocument } from "../../hooks";

const Document = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAll } = useFamily();
  const { getFamilies, getAllDocuments, resetDocument } = useDocument();

  const [showModal, setShowModal] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    listAll();
    getFamilies();
    getAllDocuments();
  };

  const handleClickNew = () => {
    resetDocument();
    setShowModal(true);
  };

  useEffect(() => {
    setTitleUI("Especialidades");
    listAll();
    getFamilies();
    getAllDocuments();
  }, []);

  return (
    <Fragment>
      <DocumentList setShowModal={setShowModal} showModal={showModal} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default Document;
