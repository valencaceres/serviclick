import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";
import { ContentHalfRow } from "~/components/layout/ResponsiveContent";
import CaseFormService from "~/components/functional/Case/CaseFormService";
import CaseStageList from "~/components/functional/Case/CaseStageList";

import CaseForm from "~/components/functional/Case/CaseFormNew";
import { ContentCell } from "~/components/layout/Content";
import { Modal, Window } from "~/components/ui/Modal";
import CaseNotes from "~/components/functional/Case/CaseChat";
const Applicant = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const setClosed = () => setShowModal(false);

  return (
    <Fragment>
      <ContentHalfRow>
        <CaseForm />
        <ContentCell gap="20px">
          <CaseStageList setShowModal={setShowModal} showModal={showModal} />
        </ContentCell>
      </ContentHalfRow>
      <Modal showModal={showModal}>
        <Window setClosed={setClosed}>
          <CaseNotes />
        </Window>
      </Modal>
    </Fragment>
  );
};

export default Applicant;
