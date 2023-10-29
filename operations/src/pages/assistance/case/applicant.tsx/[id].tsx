import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";
import { ContentHalfRow } from "~/components/layout/ResponsiveContent";
import CaseFormService from "~/components/functional/Case/CaseFormService";
import CaseStageList from "~/components/functional/Case/CaseStageList";

import CaseForm from "~/components/functional/Case/CaseFormNew";
import { ContentCell } from "~/components/layout/Content";
const Applicant = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <ContentHalfRow>
        <CaseForm />
        <ContentCell gap="20px">
          <CaseStageList setShowModal={setShowModal} showModal={showModal} />
        </ContentCell>
      </ContentHalfRow>
    </Fragment>
  );
};

export default Applicant;
