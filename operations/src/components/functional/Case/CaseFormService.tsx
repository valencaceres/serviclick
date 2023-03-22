import { Fragment, useState } from "react";
import { useRouter } from "next/router";

import Button from "../../ui/Button";
import ComboBox from "../../ui/ComboBox";
import { ContentCell, ContentRow } from "../../layout/Content";
import { LoadingMessage } from "../../ui/LoadingMessage";
import InputText from "../../ui/InputText";
import TextArea from "../../ui/TextArea/TextArea";
import CaseServiceTable from "./CaseServiceTable";

import { useCase } from "../../../store/hooks/useCase";

const CaseFormService = () => {
  const router = useRouter();
  const [assistance, setAssistance] = useState<any>(null);
  const [description, setDescription] = useState("");
  const { data } = useCase();

  const assistances = data.products.map((item: any) => item.assistance);

  return (
    <div>
      <ContentCell gap="20px">
        <ContentCell gap="5px">
          <ComboBox
            label="Servicio"
            placeHolder="Seleccione servicio"
            width="525px"
            value={assistance?.name}
            onChange={(e: any) => setAssistance(e.target.value)}
            data={assistances}
            dataText="name"
            dataValue="id"
          />
          {assistance ? (
            <ContentRow gap="5px">
              <InputText
                label="Monto Disponible ($)"
                value={
                  assistances.find((item: any) => item.id === assistance)
                    ?.currency === "P"
                    ? parseInt(
                        assistances.find((item: any) => item.id === assistance)
                          ?.amount
                      ).toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })
                    : assistances.find((item: any) => item.id === assistance)
                        ?.amount + " UF"
                }
                type="text"
                width="152px"
                disabled
              />
              <InputText
                label="Eventos restantes"
                value={
                  assistances.find((item: any) => item.id === assistance)
                    ?.events
                }
                type="number"
                width="129px"
                disabled
              />
              <InputText
                label="Límite"
                value={
                  assistances.find((item: any) => item.id === assistance)
                    ?.maximum
                }
                type="text"
                width="234px"
                disabled
              />
            </ContentRow>
          ) : null}
        </ContentCell>
        {assistance ? (
          <Fragment>
            <CaseServiceTable assistance={assistance} />
            <TextArea
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              label="Descripción del evento"
              width="525px"
              height="110px"
            />
          </Fragment>
        ) : null}
        <Button text="Continuar" onClick={() => {}} />
      </ContentCell>
      <LoadingMessage />
    </div>
  );
};

export default CaseFormService;
