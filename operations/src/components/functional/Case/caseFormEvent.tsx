import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { Document, Page } from "react-pdf";
import ComboBox from "../../ui/ComboBox";
import { ContentCell, ContentRow } from "../../layout/Content";
import { LoadingMessage } from "../../ui/LoadingMessage";
import InputText from "../../ui/InputText";
import TextArea from "../../ui/TextArea/TextArea";
import CaseServiceTable from "./CaseServiceTable";
import { Modal, Window } from "~/components/ui/Modal";
import {
  useQueryAssistances,
  useQueryCase,
  useQueryContractor,
  useQueryLead,
  useQueryStage,
  useQueryUF,
  useQueryProduct,
} from "../../../hooks/query";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "~/components/ui/ButtonC";
import { useDistrict } from "~/hooks";
import { useUI } from "~/hooks";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useCase } from "~/store/hooks";
import ButtonIcon from "~/components/ui/ButtonIcon";
import FloatMenu from "~/components/ui/FloatMenu";

const CaseFormService = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    caseValue,
    getRetails,
    getById,
    getServicesAndValues,
    retailList,
    upsert,
    isLoading,
  } = useCase();
  const idCase = router?.query?.id;
  useEffect(() => {
    getRetails();
    getById(idCase as string);
  }, []);
  console.log(caseValue);

  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [district, setDistrict] = useState<string>("");
  const [stage, setStage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data: newCaseNumber } = useQueryCase().useGetNewCaseNumber();
  const { list: districtList } = useDistrict();

  const { user } = useUser();

  const { setTitleUI, filters } = useUI();
  const eventDateSend =
    eventDate instanceof Date ? eventDate.toISOString() : "";

  useEffect(() => {
    setTitleUI("Caso datos del evento");
  }, [router, newCaseNumber]);
  useEffect(() => {
    setDescription(caseValue.event?.description || "");
  }, [caseValue]);

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.push(`/assistance/case/product/${idCase as string}`);
  };
  return (
    <div className="w-1/2 lg:w-2/6">
      <ContentCell gap="20px">
        <div className="flex flex-col gap-[5px]">
          {caseValue?.customer && caseValue?.customer ? (
            <InputText
              label="Cliente"
              className="capitalize"
              value={
                isLoading
                  ? "Cargando..."
                  : caseValue?.customer?.name || `${caseValue?.customer?.name} `
              }
              disabled
            />
          ) : (
            <InputText
              label="Titular"
              className="capitalize"
              value={
                isLoading
                  ? "Cargando..."
                  : caseValue?.insured?.name ||
                    `${caseValue?.insured?.name} ${caseValue?.insured?.paternalLastName}`
              }
              disabled
            />
          )}
          {caseValue?.retail && caseValue?.retail && (
            <InputText
              label="Empresa"
              className="capitalize"
              value={
                isLoading
                  ? "Cargando..."
                  : caseValue?.retail?.name || `${caseValue?.retail?.name} `
              }
              disabled
            />
          )}

          {caseValue?.beneficiary?.name && (
            <InputText
              label="Beneficiario"
              className="capitalize"
              value={
                isLoading
                  ? "Cargando..."
                  : caseValue?.beneficiary?.name ||
                    `${caseValue?.beneficiary?.name} ${caseValue?.beneficiary?.paternalLastName}`
              }
              disabled
            />
          )}
        </div>
        <div className="flex flex-col gap-[5px]">
          <InputText
            label="Producto"
            type="text"
            value={caseValue?.product?.name ?? ""}
            disabled={true}
          />
          <InputText
            label="Servicio"
            type="text"
            value={caseValue?.assistance?.name ?? ""}
            disabled={true}
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <ContentRow gap="5px">
            <InputText
              label="Fecha del evento"
              value={
                eventDate instanceof Date && !isNaN(eventDate.getTime())
                  ? eventDate.toISOString().substring(0, 10)
                  : ""
              }
              type="date"
              width="234px"
              onChange={(e: any) => setEventDate(new Date(e.target.value))}
            />
            <ComboBox
              label="Comuna del evento"
              placeHolder="Seleccione comuna"
              width="286px"
              data={districtList}
              dataText="district_name"
              dataValue="district_name"
              value={district}
              onChange={(e: any) => setDistrict(e.target.value)}
            />
          </ContentRow>
          <TextArea
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            label="Descripción del evento"
            width="525px"
            height="110px"
          />
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </ContentCell>

      <LoadingMessage />
      <Fragment>
        <FloatMenu>
          <ButtonIcon iconName="home" onClick={handleClickHome} />
          <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
          <ButtonIcon iconName="save" onClick={() => {}} />
        </FloatMenu>
      </Fragment>
    </div>
  );
};

export default CaseFormService;
