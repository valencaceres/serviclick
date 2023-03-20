import { useState } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";
import Button from "../../../ui/Button";
import ComboBox from "../../../ui/ComboBox";

import { useRouter } from "next/router";
import { LoadingMessage } from "../../../ui/LoadingMessage";
import InputText from "../../../ui/InputText";

const CaseFormNew = () => {
  const router = useRouter();
  const [assistance, setAssistance] = useState<any>(null);

  const handleClickNext = () => {
    router.push(`/assistances/case/support?id=${assistance}`);
  };

  return (
    <div>
      <ContentCell gap="20px">
        <ContentRow gap="5px">
          <InputText
            label="N° Caso"
            value={"1"}
            type="text"
            disabled={true}
            onChange={() => {}}
            width="260px"
          />
          <InputText
            label="Fecha/hora de apertura"
            value={"2021-01-01 12:00:00"}
            type="text"
            disabled={true}
            onChange={() => {}}
            width="260px"
          />
        </ContentRow>
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

export default CaseFormNew;
