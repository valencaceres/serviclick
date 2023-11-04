import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";
import { ContentHalfRow } from "~/components/layout/ResponsiveContent";
import CaseFormService from "~/components/functional/Case/CaseFormService";
import CaseStageList from "~/components/functional/Case/CaseStageList";

import CaseFormNew from "../../components/functional/Case/CaseFormNew";
import { ContentCell } from "~/components/layout/Content";
const NewCasePage = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <ContentHalfRow>
        <CaseFormNew thisCase={null} />
        <ContentCell gap="20px">
          <CaseStageList setShowModal={setShowModal} showModal={showModal} />
        </ContentCell>
      </ContentHalfRow>
    </Fragment>
  );
};

export default NewCasePage;
