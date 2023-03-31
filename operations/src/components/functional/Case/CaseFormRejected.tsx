import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { ContentCell } from "../../layout/Content";
import InputText from "../../ui/InputText";
import TextArea from "../../ui/TextArea/TextArea";

const CaseFormRejected = ({ thisCase }: any) => {
  const router = useRouter();
  const { stage } = router.query;
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
        <ContentCell gap="5px">
          <InputText
            label="Cliente"
            value={"Embotelladora Andina S.A."}
            type="text"
            disabled={true}
            width="525px"
          />
          <InputText
            label="Asegurado"
            value={
              thisCase?.applicant_name + " " + thisCase?.applicant_lastname
            }
            type="text"
            disabled={true}
            width="525px"
          />
          <InputText
            label="Servicio"
            value={thisCase?.assistance}
            type="text"
            disabled={true}
            width="525px"
          />
        </ContentCell>
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
