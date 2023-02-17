import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import Link from "@/components/functional/resume/Link";

import { useLead } from "../../store/hooks";

const LinkResumePage = () => {
  const router = useRouter();

  const { getLeadById } = useLead();

  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      const { leadId, success } = router.query;

      if (leadId && success) {
        setIsSuccess(eval(success.toString()));
        getLeadById(leadId.toString());
      }
    }
  }, [router]);

  return router.isReady && <Link success={isSuccess} />;
};

export default LinkResumePage;
