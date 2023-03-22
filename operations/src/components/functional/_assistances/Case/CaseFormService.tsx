import { useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";

import { ContentCell, ContentRow } from "../../../layout/Content";
import Button from "../../../ui/Button";
import ComboBox from "../../../ui/ComboBox";

import { useRouter } from "next/router";
import { LoadingMessage } from "../../../ui/LoadingMessage";
import InputText from "../../../ui/InputText";

import { useCase } from "../../../../store/hooks/useCase";

const CaseFormService = () => {
  const router = useRouter();
  const [assistance, setAssistance] = useState<any>(null);
  const { data, getBeneficiaryByRut } = useCase();

  const handleClickNext = () => {
    router.push(`/assistances/case/recordReception?id=${assistance}`);
  };

  return (
    <div>
      <ContentCell gap="20px">
        <ComboBox
          label="Servicio"
          placeHolder="Seleccione servicio"
          width="525px"
          value={""}
          onChange={(e: any) => setAssistance(e.target.value)}
          data={data.products}
          dataText="name"
          dataValue="id"
        />
        <ContentCell gap="5px">
          <ContentRow gap="5px">
            <InputText
              label="Rut"
              value={"12345678-9"}
              type="text"
              onChange={() => {}}
              width="260px"
            />
            <InputText
              label="Fecha de nacimiento"
              value={"2021-01-01"}
              type="text"
              onChange={() => {}}
              width="260px"
            />
          </ContentRow>
          <InputText
            label="Nombres"
            value={"Juan Alejandro"}
            type="text"
            onChange={() => {}}
            width="525px"
          />
          <ContentRow gap="5px">
            <InputText
              label="Apellido paterno"
              value={"Perez"}
              type="text"
              onChange={() => {}}
              width="260px"
            />
            <InputText
              label="Apellido materno"
              value={"Pereira"}
              type="text"
              onChange={() => {}}
              width="260px"
            />
          </ContentRow>
          <InputText
            label="Dirección"
            value={"Av. Siempre Viva 123"}
            type="text"
            onChange={() => {}}
            width="525px"
          />
          <InputText
            label="Comuna"
            value={"Santiago"}
            type="text"
            onChange={() => {}}
            width="525px"
          />
          <ContentRow gap="5px">
            <InputText
              label="Correo electrónico"
              value={"juan@gmail.com"}
              type="email"
              onChange={() => {}}
              width="260px"
            />
            <InputText
              label="Teléfono"
              value={"+56912345678"}
              type="text"
              onChange={() => {}}
              width="260px"
            />
          </ContentRow>
        </ContentCell>
        <ComboBox
          label="Asistencias disponibles"
          width="100%"
          value={""}
          onChange={() => {}}
          placeHolder="Seleccione asistencia"
          data={[]}
          dataValue="id"
          dataText="name"
        />
        <Button text="Continuar" onClick={handleClickNext} />
      </ContentCell>
      <LoadingMessage />
    </div>
  );
};

export default CaseFormService;
