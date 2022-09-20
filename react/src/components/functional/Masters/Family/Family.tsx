import { Fragment, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { Modal, Window } from "../../../ui/Modal";
import FamilyList from "./FamilyList";
import FamilyDetail from "./FamilyDetail";

import {
  createFamily,
  updateFamily,
  deleteFamily,
  listFamilies,
  getFamily,
  resetFamily,
} from "../../../../redux/slices/familySlice";

const Family = () => {
  const dispatch = useAppDispatch();

  const { family } = useAppSelector((state) => state.familySlice);

  useEffect(() => {
    dispatch(listFamilies());
  }, [dispatch]);

  const addModal = () => {
    dispatch(resetFamily());
    setShowModal(true);
  };

  const editModal = (family: any) => {
    dispatch(getFamily(family.id));
    setShowModal(true);
  };

  const deleteModal = (id: string) => {
    dispatch(deleteFamily(id));
  };

  const saveFamily = (id: string, name: string, values: any) => {
    if (id === "") {
      dispatch(
        createFamily(
          name,
          values.map((value: any) => value.name)
        )
      );
    } else {
      dispatch(
        updateFamily(
          id,
          name,
          values.map((value: any) => value.name)
        )
      );
    }
    setShowModal(false);
  };

  const setClosed = () => {
    dispatch(resetFamily());
    setShowModal(false);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <FamilyList
        addFamily={addModal}
        editFamily={editModal}
        deleteFamily={deleteModal}
      />
      <Modal showModal={showModal}>
        <Window title="Nueva Familia" setClosed={setClosed}>
          <FamilyDetail saveFamily={saveFamily} />
        </Window>
      </Modal>
    </Fragment>
  );
};

export default Family;
