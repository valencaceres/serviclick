import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";
import {
  FileFormatList,
  FileFormatDetail,
} from "../../components/functional/_masters/FileFormat";

import { useUI, useFileFormat } from "../../hooks";

const FileFormatPage = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { resetFileFormat, fileFormatIsLoading, getAllFileFormat } =
    useFileFormat();

  const [enableSave, setEnableSave] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllFileFormat();
  };

  const handleClickNew = () => {
    resetFileFormat();
    router.push("/masters/fileFormat?id=new");
  };

  const handleClickBack = () => {
    resetFileFormat();
    router.push("/masters/fileFormat");
  };

  const handleClickSave = () => {};

  useEffect(() => {
    setTitleUI("Formatos importación");
  }, []);

  return router.isReady && router.query.id ? (
    <Fragment>
      <FileFormatDetail />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon
          iconName="save"
          onClick={() => {
            handleClickSave();
          }}
          disabled={!enableSave}
          loading={fileFormatIsLoading}
        />
      </FloatMenu>
    </Fragment>
  ) : (
    <Fragment>
      <FileFormatList />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default FileFormatPage;
