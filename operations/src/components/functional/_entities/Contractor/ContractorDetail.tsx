import { useState, useEffect, Fragment } from "react";

import ContractorFormPerson from "./ContractorFormPerson";
import ContractorFormCompany from "./ContractorFormCompany";

import { ContentCell } from "../../../layout/Content";

import { useContractor } from "../../../../hooks";
import { LoadingMessage } from "../../../ui/LoadingMessage";

const ContractorDetail = ({ setEnableSave }: any) => {
  const { contractor, contractorLoading } = useContractor();

  return (
    <Fragment>
      <ContentCell align="center" gap="30px">
        {contractor.type === "P" ? (
          <ContractorFormPerson setEnableSave={setEnableSave} />
        ) : contractor.type === "C" ? (
          <ContractorFormCompany setEnableSave={setEnableSave} />
        ) : (
          "<p>Loading...</p>"
        )}
      </ContentCell>
      <LoadingMessage showModal={contractorLoading} />
    </Fragment>
  );
};

export default ContractorDetail;
