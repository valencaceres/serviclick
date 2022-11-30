import { useState, Fragment } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ButtonIcon from "../../../ui/ButtonIcon";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
  TableCellEnd,
} from "../../../ui/Table";
import Icon from "../../../ui/Icon";
import { Modal, Window } from "../../../ui/Modal";

import { UserDetail } from ".";

import useUser from "../../../../hooks/useUser";
import ModalWarning from "../../../ui/ModalWarning";

const UserList = ({ setShowModal, showModal }: any) => {
  const { userList, createUser, deleteUserById, resetUser, setUser, user } =
    useUser();

  const initialDataUserForm = {
    rut: { value: "", isValid: true },
    name: { value: "", isValid: true },
    paternalLastName: { value: "", isValid: true },
    maternalLastName: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phone: { value: "", isValid: true },
  };

  const [search, setSearch] = useState("");
  const [showWarningDelete, setShowWarningDelete] = useState(false);
  const [userForm, setUserForm] = useState(initialDataUserForm);

  const editUser = (user: any) => {
    setUser(user);
    setUserForm({
      id: { value: user.id, isValid: true },
      rut: { value: user.rut, isValid: true },
      name: { value: user.name, isValid: true },
      paternalLastName: { value: user.paternalLastName, isValid: true },
      maternalLastName: { value: user.maternalLastName, isValid: true },
      email: { value: user.email, isValid: true },
      phone: { value: user.phone, isValid: true },
      isValid: { value: user.isValid, isValid: true },
    });
    setShowModal(true);
  };

  const setClosed = () => {
    resetUser();
    setShowModal(false);
  };

  const saveUser = () => {
    setUser({
      id: user.id || "",
      rut: userForm.rut.value,
      name: userForm.name.value,
      paternalLastName: userForm.paternalLastName.value,
      maternalLastName: userForm.maternalLastName.value,
      email: userForm.email.value,
      phone: userForm.phone.value,
      isValid: true,
    });
    createUser({
      id: user.id || "",
      rut: userForm.rut.value,
      name: userForm.name.value,
      paternalLastName: userForm.paternalLastName.value,
      maternalLastName: userForm.maternalLastName.value,
      email: userForm.email.value,
      phone: userForm.phone.value,
      isValid: true,
    });
    setShowModal(false);
  };

  const setClosedWarningDelete = () => {
    setShowWarningDelete(false);
  };

  const handleClickDelete = (item: any) => {
    setUser(item);
    setShowWarningDelete(true);
  };

  const handleClickDeleteOK = () => {
    deleteUserById(user.id);
    setShowWarningDelete(false);
  };

  return (
    <Fragment>
      <ContentCell gap="10px">
        <ContentRow gap="10px" align="center">
          <InputText
            label="Texto a buscar"
            width="375px"
            value={search}
            onChange={setSearch}
          />
          <ButtonIcon iconName="search" color="gray" />
        </ContentRow>
        <Table width="757px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="350px">Nombre</TableCell>
            <TableCell width="250px">e-mail</TableCell>
            <TableCell width="68px"></TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {userList.map((item: any, idx: number) => (
              <TableRow key={idx} className={"deleted"}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="350px">
                  {item.name} {item.paternalLastName} {item.maternalLastName}
                </TableCell>
                <TableCell width="250px">{item.email}</TableCell>
                <TableCell width="68px">
                  <TableIcons>
                    <Icon iconName="edit" onClick={() => editUser(item)} />
                    <Icon
                      iconName="delete"
                      onClick={() => handleClickDelete(item.id)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow gap="10px" align="flex-end">
          <ContentCellSummary>{`${userList.length} usuarios`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <Modal showModal={showModal}>
        <Window title="Usuario" setClosed={setClosed}>
          <UserDetail
            userForm={userForm}
            setUserForm={setUserForm}
            saveUser={saveUser}
          />
        </Window>
      </Modal>
      <ModalWarning
        showModal={showWarningDelete}
        title="Eliminación de usuario"
        message={`Está seguro de eliminar el usuario ${user.name}`}
        setClosed={setClosedWarningDelete}
        iconName="warning"
        buttons={[
          { text: "No", function: setClosedWarningDelete },
          { text: "Si", function: () => handleClickDeleteOK() },
        ]}
      />
    </Fragment>
  );
};

export default UserList;
