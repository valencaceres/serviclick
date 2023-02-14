import { Fragment } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import { LoadingMessage } from "../../../ui/LoadingMessage";

import SpecialistForm from "./SpecialistForm";
import SpecialistSpecialties from "./SpecialistSpecialties";
import SpecialistDistricts from "./SpecialistDistricts";

import { useSpecialist } from "../../../../store/hooks";

const SpecialistDetail = ({ setEnableSave }: any) => {
  const { specialistIsLoading } = useSpecialist();

  return (
    <Fragment>
      <ContentCell gap="5px" className="fade-in-fwd">
        <ContentRow gap="25px">
          <SpecialistForm setEnableSave={setEnableSave} />
          <SpecialistSpecialties />
          <SpecialistDistricts />
        </ContentRow>
      </ContentCell>
      <LoadingMessage showModal={specialistIsLoading} />
    </Fragment>
  );
};

export default SpecialistDetail;
