import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Body, Content, Footer } from "../../../layout/Generic";

import Person from "../../entities/Person";
import Company from "../../entities/Company";

import Button from "../../../ui/Button/Button";
import Loading from "../../../ui/Loading";

import {
  useUI,
  useContractor,
  useProduct,
  useLead,
} from "../../../../store/hooks";

import {
  IFieldFormCustomerType,
  IFieldFormString,
} from "../../../../interfaces/form";

interface ICustomerForm {
  customerType: IFieldFormCustomerType;
  rut: IFieldFormString;
  name: IFieldFormString;
  paternalLastName: IFieldFormString;
  maternalLastName: IFieldFormString;
  companyName: IFieldFormString;
  legalRepresentative: IFieldFormString;
  line: IFieldFormString;
  address: IFieldFormString;
  district: IFieldFormString;
  email: IFieldFormString;
  phone: IFieldFormString;
}

const Contractor = () => {
  const router = useRouter();

  const { ui } = useUI();
  const { getContractorByRut, contractor } = useContractor();
  const { product } = useProduct();
  const { createLead, setLead, lead, leadIsLoading } = useLead();

  const [completedForm, setCompletedForm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const setLeadContractor = (data: any) => {
    setLead({
      ...lead,
      agent_id: ui.agent.id,
      customer: {
        ...lead.customer,
        id: data.id || "",
        rut: data.rut,
        name: data.name,
        paternalLastName: data.paternalLastName,
        maternalLastName: data.maternalLastName,
        address: data.address,
        district: data.district,
        email: data.email,
        phone: data.phone,
      },
      product: {
        id: product.id,
        price: product.plan.price,
        currency_code: "P",
        frequency_code: product.plan.frequencyCode,
        productPlan_id: product.plan.planId,
      },
      subscription: false,
      send: false,
    });
  };

  const getByRut = (rut: string) => {
    getContractorByRut(rut, "P");
  };

  const handleClickRegister = () => {
    setIsProcessing(true);
    createLead({
      ...lead,
    });
  };

  useEffect(() => {
    if (contractor.rut) {
      setLeadContractor(contractor);
    }
  }, [contractor.rut]);

  useEffect(() => {
    if (lead.id !== "" && leadIsLoading === false && isProcessing === true) {
      router.push(
        `/insured?productPlanId=${ui.product.productPlan_id}&leadId=${lead.id}`
      );
      setIsProcessing(false);
    }
  }, [lead.id, leadIsLoading, isProcessing]);

  return (
    <Body>
      <Content>
        <Person
          data={lead.customer}
          setData={setLeadContractor}
          setCompletedForm={setCompletedForm}
          getByRut={getByRut}
        />
      </Content>
      <Footer>
        <Button
          text="Registrar"
          onClick={handleClickRegister}
          width="200px"
          enabled={completedForm}></Button>
      </Footer>
      {leadIsLoading && <Loading />}
    </Body>
  );
};

export default Contractor;
