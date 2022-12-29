import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import { ValueTypeList } from "../../components/functional/_masters/ValueType";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { useUI, useValueType } from "../../hooks";

const ValueType = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { getAllValueTypes, resetValueTypeAll } = useValueType();

  const [showModal, setShowModal] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllValueTypes();
  };

  const handleClickNew = () => {
    resetValueTypeAll();
    setShowModal(true);
  };

  useEffect(() => {
    setTitleUI("Tipos de valor");
    getAllValueTypes();
  }, []);

  return (
    <Fragment>
      <ValueTypeList setShowModal={setShowModal} showModal={showModal} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        {/* <ButtonIcon iconName="add" onClick={handleClickNew} /> */}
      </FloatMenu>
    </Fragment>
  );
};

export default ValueType;
