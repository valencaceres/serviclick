import { useEffect, useState } from "react";
import None from "@/components/functional/wizard/None/None";
import { useRouter } from "next/router";
import { useUI, useProduct, useLead, useAgent } from "@/store/hooks";
import { stages, IStage } from "@/data/stage";
import StepBar from "@/components/functional/stepbar/index";

const StagePage = () => {
  const router = useRouter();
  const { setUI, ui } = useUI();
  const { product, getByPlanId } = useProduct();
  const { lead, getLeadById } = useLead();
  const { getProcessById } = useAgent();

  const [component, setComponent] = useState(<None />);

  const { stage, productPlanId, leadId, userId } = router.query;

  const showBeneficiariesStep =
    product.beneficiaries && product.beneficiaries > 0;

  // Filtra las etapas para determinar qué etapas mostrar

  useEffect(() => {
    if (router.isReady) {
      const currentStage = stages.find((item) => item.code === stage);
      if (currentStage) {
        setUI({ ...ui, stage: currentStage });
        setComponent(currentStage.component);

        if (productPlanId) {
          getByPlanId(productPlanId.toString());
          getProcessById(productPlanId.toString());
        }

        if (leadId) {
          getLeadById(leadId.toString());
        }
      }
    }
  }, [router]);
  useEffect(() => {
    setUI({
      ...ui,
      customerType: product.plan.customerType === "customer" ? "p" : "c",
      agent: { ...ui.agent, id: product.plan.agentId },
      userId: userId ? userId.toString() : "",
      product: { ...ui.product, productPlan_id: product.plan.id },
    });
  }, [product]);

  const filteredStages = stages.filter(
    (item: any) => item.code !== "product" || productPlanId
  );
  const filteredProducts = filteredStages.filter(
    (item: any) => item.code !== "beneficiaries" || showBeneficiariesStep
  );
  return (
    <div>
      <div className="relative">
        <div
          className={` hidden md:block absolute top-4 md:top-12 left-20 ${
            router?.query?.stage === "payment" ? "z-10" : ""
          }`}
        >
          <StepBar
            steps={filteredProducts}
            currentStep={stage as string}
            productPlanId={productPlanId as string}
            beneficiaries={product.beneficiaries}
            lead={lead}
          />
        </div>
      </div>
      <div className="md:hidden">
        <StepBar
          steps={filteredProducts}
          currentStep={stage as string}
          productPlanId={productPlanId as string}
          beneficiaries={product.beneficiaries}
          lead={lead}
        />
      </div>
      {component}
    </div>
  );
};

export default StagePage;
