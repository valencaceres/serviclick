import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import None from "@/components/functional/wizard/None/None";

import { stages } from "@/data/stage";

import { useUI, useProduct, useLead } from "@/store/hooks";

const StagePage = () => {
  const router = useRouter();

  const { setUI, ui } = useUI();
  const { product, getByPlanId } = useProduct();
  const { lead, getLeadById } = useLead();

  const [component, setComponent] = useState(None);

  useEffect(() => {
    if (router.isReady) {
      const { stage, productPlanId, leadId } = router.query;

      if (stages.some((item) => item.code === stage)) {
        const stageItem = stages.filter((item) => item.code == stage)[0];

        setUI({ ...ui, stage: stageItem });
        setComponent(stageItem.component);

        if (productPlanId) {
          getByPlanId(productPlanId.toString());
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
      product: { ...ui.product, productPlan_id: product.plan.id },
    });
  }, [product]);

  return component;
};

export default StagePage;
