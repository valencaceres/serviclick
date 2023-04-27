import { useRouter } from "next/router";
import { useState, useEffect, Fragment } from "react";

import ContractorForm from "./ContractorForm";
import ContractorProduct from "./ContractorProduct";
import ContractorInsured from "./ContractorInsured";
import ContractorBeneficiaries from "./ContractorBeneficiaries";
import ContractorSubscriptionList from "./ContractorSubscriptionList";
import ContractorSubscription from "./ContractorSubscription";
import ContractorModal from "./ContractorModal";

import {
  ContentCell,
  ContentCellSummary,
  ContentRow,
} from "../../../layout/Content";

import { LoadingMessage } from "../../../ui/LoadingMessage";
import { Section } from "../../../ui/Section";

import ButtonIcon from "../../../ui/ButtonIcon";

import { useContractor } from "../../../../hooks";

import { contractor } from "../../../../interfaces";

const ContractorDetail = ({ contractor }: any) => {
  const { pathname } = useRouter();
  const { contractorLoading, getSubscriptionById } = useContractor();

  const [showContractorModal, setShowContractorModal] = useState(false);

  const handleSuscriptionRowClick = (item: contractor.ISubscription) => {
    getSubscriptionById(item.subscription_id);
  };

  return (
    <Fragment>
      <ContentCell align="center" gap="20px">
        <ContentRow gap="20px">
          <ContentCell gap="5px">
            <Section title="Datos del Contratante" width="350px" />
            <ContractorForm contractor={contractor} />
            <ContentRow align="right" gap="5px">
              {pathname !== "entities/contractor/new" && (
                <ButtonIcon
                  iconName="edit"
                  color="gray"
                  onClick={() => setShowContractorModal(true)}
                />
              )}
            </ContentRow>
          </ContentCell>
          <ContentCell gap="5px">
            <Section title="Suscripciones" width="485px" />
            <ContractorSubscriptionList
              contractor={contractor}
              subscriptionClick={handleSuscriptionRowClick}
            />
          </ContentCell>
        </ContentRow>
        <ContentCell gap="5px">
          <Section title="Detalle del producto" width="855px" />
          <ContractorProduct contractor={contractor} />
        </ContentCell>
        <ContentCell gap="5px">
          <Section title="Beneficiarios" width="855px" />
          <ContractorInsured contractor={contractor} />
        </ContentCell>
        <ContentCell gap="5px">
          <Section title="Cargas" width="855px" />
          <ContractorBeneficiaries contractor={contractor} />
        </ContentCell>
        <ContentCell gap="5px">
          <Section title="Detalle de la suscripción" width="855px" />
          <ContractorSubscription contractor={contractor} />
        </ContentCell>
      </ContentCell>
      <LoadingMessage showModal={contractorLoading} />
      <ContractorModal
        showContractorModal={showContractorModal}
        setShowContractorModal={setShowContractorModal}
      />
    </Fragment>
  );
};

export default ContractorDetail;
