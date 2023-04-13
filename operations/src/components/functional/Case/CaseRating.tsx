import { useEffect, useState } from "react";

import { ContentCell } from "../../layout/Content";
import InputText from "../../ui/InputText";
import TextArea from "../../ui/TextArea/TextArea";

const CaseRating = ({ thisCase }: any) => {
  const [action, setAction] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    if (thisCase?.stages?.find((c: any) => c?.stage === "Calificación")) {
      setAction("Calificar");
      setComment(
        thisCase?.stages?.find((c: any) => c?.stage === "Calificación")
          ?.description
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
        <ContentCell gap="5px">
          <TextArea
            label="Comentario"
            value={comment}
            onChange={(e: any) => setComment(e.target.value)}
            width="525px"
            disabled
            height="100px"
          />
        </ContentCell>
      </ContentCell>
    </form>
  );
};

export default CaseRating;
