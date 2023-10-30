import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";
import { ContentHalfRow } from "~/components/layout/ResponsiveContent";
import CaseStageList from "~/components/functional/Case/CaseStageList";
import { useUI } from "~/hooks";

import CaseFormRefund from "~/components/functional/Case/CaseFormRefund";
import { ContentCell } from "~/components/layout/Content";
import CaseNotes from "~/components/functional/Case/CaseChat";
import { Modal, Window } from "~/components/ui/Modal";
import { useCase } from "~/store/hooks/useCase";
const Applicant = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const setClosed = () => setShowModal(false);
  const id = router.query.id;

  const { getById, caseValue } = useCase();
  useEffect(() => {
    if (typeof id === "string") {
      getById(id);
    }
  }, [id]);
  return (
    <Fragment>
      <ContentHalfRow>
        <CaseFormRefund />
        <ContentCell gap="20px">
          <CaseStageList
            caseValue={caseValue}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        </ContentCell>
      </ContentHalfRow>
      <Modal showModal={showModal}>
        <Window setClosed={setClosed}>
          <CaseNotes thisCase={caseValue} />
        </Window>
      </Modal>
    </Fragment>
  );
};

export default Applicant;
