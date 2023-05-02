import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { ContentCell } from "../../layout/Content";
import TextArea from "../../ui/TextArea/TextArea";
import { CaseDescription } from "./CaseDescription";

const CaseFormRejected = ({ thisCase }: any) => {
  const router = useRouter();
  const [justification, setJustification] = useState<string>("");

  useEffect(() => {
    if (thisCase) {
      setJustification(
        thisCase?.stages.find((s: any) => s.stage === "Rechazado")?.description
      );
    }
  }, [thisCase]);

  return (
    <form>
      <ContentCell gap="20px">
      <CaseDescription thisCase={thisCase} />
        <ContentCell gap="20px">
          <TextArea
            label="Justificación"
            value={justification}
            width="525px"
            height="100px"
            disabled
          />
        </ContentCell>
      </ContentCell>
    </form>
  );
};

export default CaseFormRejected;
