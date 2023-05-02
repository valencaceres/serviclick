import { useEffect, useState } from "react";

import TextArea from "../../ui/TextArea/TextArea";
import { ContentCell } from "../../layout/Content";
import { CaseDescription } from "./CaseDescription";

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
      <CaseDescription thisCase={thisCase} />
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
