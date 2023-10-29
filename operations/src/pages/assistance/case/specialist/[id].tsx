import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { ContentHalfRow } from "~/components/layout/ResponsiveContent";
import CaseStageList from "~/components/functional/Case/CaseStageList";

import CaseFormSpecialist from "~/components/functional/Case/CaseFormSpecialist";
import { ContentCell } from "~/components/layout/Content";
const Applicant = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <ContentHalfRow>
        <CaseFormSpecialist />
        <ContentCell gap="20px">
          <CaseStageList setShowModal={setShowModal} showModal={showModal} />
        </ContentCell>
      </ContentHalfRow>
    </Fragment>
  );
};

export default Applicant;
