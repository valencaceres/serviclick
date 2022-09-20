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

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getProduct } from "../../../redux/slices/productSlice";
import { setStage } from "../../../redux/slices/stageSlice";
import {
  setLeadProduct,
  getLeadBySubscriptionId,
  resetLead,
} from "../../../redux/slices/leadSlice";

const Value: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { product } = useAppSelector((state) => state.productSlice);
  const { stage } = useAppSelector((state) => state.stageSlice);
  const { lead } = useAppSelector((state) => state.leadSlice);

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
    dispatch(resetLead());
  }, [dispatch]);

  useEffect(() => {
    if (router.isReady) {
      const { stage, id, type } = router.query;
      dispatch(getProduct(id ? id.toString() : ""));
      dispatch(setStage({ name: stage, type }));
      setIsLoaded(true);
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (product.id && stage) {
      dispatch(
        setLeadProduct({
          id: product.id,
          price: product.price[stage.type],
          currency_code: product.currency,
          frequency_code: product.frequency,
          productPlan_id: product.plans.filter(
            (plan) => plan.type === stage.type
          )[0].plan_id,
        })
      );
    }
  }, [dispatch, product, stage]);

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
