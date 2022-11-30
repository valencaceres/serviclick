import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import { UserList } from "../../components/functional/_masters/User";

import useUI from "../../hooks/useUI";
import useUser from "../../hooks/useUser";

const User = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { getAllUsers, resetUser } = useUser();

  const [showModal, setShowModal] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllUsers();
  };

  const handleClickNew = () => {
    resetUser();
    setShowModal(true);
  };

  useEffect(() => {
    setTitleUI("Usuarios");
    getAllUsers();
  }, []);

  return (
    <Fragment>
      <UserList setShowModal={setShowModal} showModal={showModal} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
        <ButtonIcon iconName="add" onClick={handleClickNew} />
      </FloatMenu>
    </Fragment>
  );
};

export default User;
