import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";
import { ContentHalfRow } from "~/components/layout/ResponsiveContent";
import CaseStageList from "~/components/functional/Case/CaseStageList";
import { useUI } from "~/hooks";

import CaseFormAttachment from "~/components/functional/Case/CaseFormAttachment";
import { ContentCell } from "~/components/layout/Content";
const Applicant = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <ContentHalfRow>
        <CaseFormAttachment />
        <ContentCell gap="20px">
          <CaseStageList setShowModal={setShowModal} showModal={showModal} />
        </ContentCell>
      </ContentHalfRow>
    </Fragment>
  );
};

export default Applicant;
