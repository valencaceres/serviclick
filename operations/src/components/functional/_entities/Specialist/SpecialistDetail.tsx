import { Fragment, useState } from "react";

import SpecialistSpecialtiesList from "./SpecialistSpecialtiesList";
import SpecialistDistrictsList from "./SpecialistDistrictsList";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { LoadingMessage } from "../../../ui/LoadingMessage";
import ModalWindow from "../../../ui/ModalWindow";

import SpecialistForm from "./SpecialistForm";
import SpecialistSpecialties from "./SpecialistSpecialties";
import SpecialistDistricts from "./SpecialistDistricts";

import { useSpecialist } from "../../../../store/hooks";

const SpecialistDetail = ({ setEnableSave }: any) => {
  const { specialistIsLoading } = useSpecialist();

  const [showSpecialitiesListModal, setShowSpecialitiesListModal] =
    useState(false);
  const [showDistrictsListModal, setShowDistrictsListModal] = useState(false);

  return (
    <Fragment>
      <ContentCell gap="5px" className="fade-in-fwd">
        <ContentRow gap="25px">
          <SpecialistForm setEnableSave={setEnableSave} />
          <SpecialistSpecialties
            setShowSpecialitiesModal={setShowSpecialitiesListModal}
          />
          <SpecialistDistricts
            setShowDistrictsModal={setShowSpecialitiesListModal}
          />
        </ContentRow>
      </ContentCell>
      <LoadingMessage showModal={specialistIsLoading} />
      <ModalWindow
        showModal={showSpecialitiesListModal}
        setClosed={() => {
          setShowSpecialitiesListModal(false);
        }}
        title="Especialidades">
        <SpecialistSpecialtiesList setShow={setShowSpecialitiesListModal} />
      </ModalWindow>
      <ModalWindow
        showModal={showDistrictsListModal}
        setClosed={() => {
          setShowDistrictsListModal(false);
        }}
        title="Comunas">
        <SpecialistDistrictsList setShow={setShowDistrictsListModal} />
      </ModalWindow>
    </Fragment>
  );
};

export default SpecialistDetail;
