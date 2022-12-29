import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import { ValueList } from "../../components/functional/_masters/Value";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { useUI, useFamily, useValueType, useValue } from "../../hooks";

const Value = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAll } = useFamily();
  const { getAllValueTypes } = useValueType();
  const { getValueFamilies, getAllValues, resetValue } = useValue();

  const [showModal, setShowModal] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllValues();
  };

  const handleClickNew = () => {
    resetValue();
    getValueFamilies();
    listAll();
    getAllValueTypes();
    setShowModal(true);
  };

  useEffect(() => {
    setTitleUI("Valores");
    getValueFamilies();
    listAll();
    getAllValues();
  }, []);

  return (
    <Fragment>
      <ValueList setShowModal={setShowModal} showModal={showModal} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default Value;
