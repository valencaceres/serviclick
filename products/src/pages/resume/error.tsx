import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import SaleError from "@/components/functional/resume/SaleError";

import { useLead } from "@/store/hooks";

const LinkResumePage = () => {
  const router = useRouter();

  const { getLeadBySubscriptionId } = useLead();

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;

      if (id) {
        getLeadBySubscriptionId(parseInt(id.toString()));
      }
    }
  }, [router]);

  return router.isReady && <SaleError />;
};

export default LinkResumePage;
