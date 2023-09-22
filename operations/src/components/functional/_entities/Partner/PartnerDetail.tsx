import { Fragment, useState } from "react";

import PartnerSpecialtiesList from "./PartnerSpecialtiesList";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { LoadingMessage } from "../../../ui/LoadingMessage";
import ModalWindow from "../../../ui/ModalWindow";

import PartnerForm from "./PartnerForm";
import PartnerSpecialties from "./PartnerSpecialties";

import { usePartner } from "../../../../store/hooks";

const PartnerDetail = ({ setEnableSave }: any) => {
  const { partnerIsLoading } = usePartner();

  const [showSpecialitiesListModal, setShowSpecialitiesListModal] =
    useState(false);

  return (
    <Fragment>
      <ContentCell gap="5px" className="fade-in-fwd">
        <ContentRow gap="25px">
          <PartnerForm setEnableSave={setEnableSave} />
          <PartnerSpecialties
            setShowSpecialitiesModal={setShowSpecialitiesListModal}
          />
        </ContentRow>
      </ContentCell>
      <LoadingMessage showModal={partnerIsLoading} />
      <ModalWindow
        showModal={showSpecialitiesListModal}
        setClosed={() => {
          setShowSpecialitiesListModal(false);
        }}
        title="Alianzas"
      >
        <PartnerSpecialtiesList setShow={setShowSpecialitiesListModal} />
      </ModalWindow>
    </Fragment>
  );
};

export default PartnerDetail;
