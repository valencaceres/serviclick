import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Company from "../../../components/functional/Wizard/Company";
import Customer from "../../../components/functional/Wizard/Customer";
import Insured from "../../../components/functional/Wizard/Insured";
import Beneficiary from "../../../components/functional/Wizard/Beneficiary";
import Payment from "../../../components/functional/Wizard/Payment";
import Resume from "../../../components/functional/Wizard/Resume";

import Loading from "../../../components/ui/Loading";

import { useUI, useStage, useProduct, useLead } from "../../../redux/hooks";

const Value: NextPage = () => {
  const router = useRouter();

  const { stage, setStage } = useStage();
  const { getProductByIdWithPrices, product } = useProduct();
  const { lead, setLeadAgent, setLeadProduct, resetLead, getLeadById } =
    useLead();

  const { agentId, setAgentUI } = useUI();

  const [isLoaded, setIsLoaded] = useState(false);

  const nextStage = () => {};

  const registerCompany = () => {
    router.push(stateMachine[stage.name].next);
  };

  const registerCustomer = () => {
    router.push(stateMachine[stage.name].next);
  };

  const registerInsured = () => {
    router.push(stateMachine[stage.name].next);
  };

  const registerBeneficiary = () => {
    router.push(stateMachine[stage.name].next);
  };

  const registerPayment = () => {
    var form = document.createElement("form");
    form.method = "POST";
    form.action = lead.subscription.completion_url;
    form.target = "_self";
    var input = document.createElement("input");
    input.id = "TBK_TOKEN";
    input.name = "TBK_TOKEN";
    input.type = "hidden";
    input.value = lead.subscription.security_token;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    agentId === "" && setAgentUI("020579a3-8461-45ec-994b-ad22ff8e3275");
    resetLead();
    setLeadAgent(agentId);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const { stage, id, type, leadId } = router.query;

      if (
        (stage === "contract" ||
          stage === "insured" ||
          stage === "beneficiary" ||
          stage === "payment" ||
          stage === "resume") &&
        (type === "customer" || type === "company")
      ) {
        setStage({ name: stage, type });

        if (leadId) {
          getLeadById(leadId ? leadId.toString() : "");
        } else {
          getProductByIdWithPrices(id ? id.toString() : "", agentId);
        }
        setIsLoaded(true);
      }
    }
  }, [router]);

  useEffect(() => {
    if (product.id && stage) {
      setLeadProduct({
        id: product.id,
        price: product.plan[stage.type].price,
        currency_code: product.currency,
        frequency_code: product.frequency,
        productPlan_id: product.plan[stage.type].plan_id,
      });
    }
  }, [product, stage]);

  useEffect(() => {
    if (lead.id !== "") {
      setAgentUI(lead.agent_id);
      getProductByIdWithPrices(lead.product.id, lead.agent_id);
    }
  }, [lead.id]);

  const stateMachine = {
    contract: {
      component:
        stage.type === "customer" ? (
          <Customer next={nextStage} register={registerCustomer} />
        ) : (
          <Company next={nextStage} register={registerCompany} />
        ),
      next: `/${
        stage.type === "customer"
          ? product.beneficiaries > 0
            ? "beneficiary"
            : "payment"
          : "insured"
      }/${stage.type}/${product.id}`,
    },
    insured: {
      component: <Insured next={nextStage} register={registerInsured} />,
      next: `/payment/${stage.type}/${product.id}`,
    },
    beneficiary: {
      component: (
        <Beneficiary next={nextStage} register={registerBeneficiary} />
      ),
      next: `/payment/${stage.type}/${product.id}`,
    },
    payment: {
      component: <Payment next={nextStage} register={registerPayment} />,
      next: `/resume/${stage.type}/${product.id}`,
    },
    resume: {
      component: <Resume />,
      next: "https://www.serviclick.cl",
    },
  };

  return product.id && isLoaded ? (
    stateMachine[stage.name].component
  ) : (
    <Loading />
  );
};

export default Value;
