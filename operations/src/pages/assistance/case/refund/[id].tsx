import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";
import { ContentHalfRow } from "~/components/layout/ResponsiveContent";
import CaseStageList from "~/components/functional/Case/CaseStageList";
import { useUI } from "~/hooks";

import CaseFormRefund from "~/components/functional/Case/CaseFormRefund";
import { ContentCell } from "~/components/layout/Content";
const Applicant = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <ContentHalfRow>
        <CaseFormRefund />
        <ContentCell gap="20px">
          <CaseStageList setShowModal={setShowModal} showModal={showModal} />
        </ContentCell>
      </ContentHalfRow>
    </Fragment>
  );
};

export default Applicant;
