import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { Document, Page } from "react-pdf";
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
import { useCase } from "~/store/hooks/useCase";
import ButtonIcon from "~/components/ui/ButtonIcon";
import FloatMenu from "~/components/ui/FloatMenu";
interface IAssistance {
  id: string;
  name: string;
  amount: string;
  currency: string;
  maximum: string;
  lack: string;
  events: string;
}

interface IProduct {
  id: string;
  lead_id: string;
  subscription_id?: string;
  insured_id: string;
  name: string;
  assistance: IAssistance;
  created_at: string;
  start_date: string;
  end_date: string;
}

const CaseFormService = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { caseValue, getById, isLoading } = useCase();
  const idCase = router.query.id as string;
  console.log(idCase);
  useEffect(() => {
    getById(idCase);
  }, []);
  console.log(caseValue);

  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.roles?.operaciones === "admin";
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

  const { data: ufValue } = useQueryUF().useGetUFValue();

  const { setTitleUI, filters } = useUI();

  useEffect(() => {
    setTitleUI(`Caso N°${router.pathname === "/assistance/case/product"}`);
  }, [router]);

  /*   const { data: pdfProductPlan } =
   useQueryProduct().useGetContractByProductPlanId(
    productId,
      thisCase?.contractor_id 
      "1a6d08b0-f27a-4de0-8e1d-855bead4282f",
      "7ea804e5-6de1-4e60-affc-f5b31af90ba3"
    );  */

  /*   const pdfBase64 = Buffer.from(pdfProductPlan).toString("base64");
  const pdfDataUrl = `data:application/pdf;base64,${pdfBase64}`;
  console.log(pdfDataUrl); */

  const handleClickSave = () => {
    router.push(`/assistance/case/attachment/${idCase}`);
  };
  const handleClickBack = () => {
    router.push(`/assistance/case/insured/${idCase}`);
  };
  const handleClickHome = () => {
    router.push(`/case/insured/${idCase}`);
  };
  return (
    <div>
      <ContentCell gap="5px">
        <ContentCell gap="5px">
          <ContentCell gap="20px">
            <div className="flex flex-col gap-[5px]">
              {caseValue?.customer && caseValue?.customer ? (
                <InputText
                  label="Cliente"
                  className="capitalize"
                  value={
                    isLoading
                      ? "Cargando..."
                      : caseValue?.customer?.name ||
                        `${caseValue?.customer?.name}`
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
                        `${caseValue?.insured?.name} ${caseValue?.insured?.paternallastname}`
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
                        `${caseValue?.beneficiary?.name} ${caseValue?.beneficiary?.paternallastname}`
                  }
                  disabled
                />
              )}
            </div>
            <div>
              <InputText
                label="Producto"
                type="text"
                value={caseValue?.product?.name || ""}
                disabled={true}
              />
            </div>
          </ContentCell>
          <InputText
            label="Servicio"
            type="text"
            value={caseValue?.assistance?.name || ""}
            disabled={true}
          />

          <>
            <ContentRow gap="5px">
              <InputText
                label={
                  caseValue?.assistance?.assigned?.currency === "U"
                    ? "Monto Autorizado (UF)"
                    : "Monto Autorizado ($)"
                }
                value={
                  caseValue
                    ? caseValue.assistance?.assigned?.currency === "P"
                      ? caseValue.assistance?.assigned?.amount.toLocaleString(
                          "es-CL",
                          {
                            style: "currency",
                            currency: "CLP",
                          }
                        )
                      : ""
                    : ""
                }
                type="text"
                width={`${
                  Number(caseValue?.assistance?.assigned.events) !== 0
                    ? "152px"
                    : "286px"
                }`}
                disabled
              />
              {Number(caseValue?.assistance?.assigned.events) !== 0 && (
                <InputText
                  label="Eventos"
                  value={
                    caseValue
                      ? (caseValue?.assistance?.assigned.events ?? 0).toString()
                      : "0"
                  }
                  type="number"
                  width="129px"
                  disabled
                />
              )}
              <InputText
                label="Límite"
                value={
                  caseValue?.assistance?.assigned.maximum ||
                  "No hay información"
                }
                type="text"
                width="234px"
                disabled
              />{" "}
            </ContentRow>
            <ContentRow gap="5px">
              <InputText
                label={
                  caseValue?.assistance?.assigned.currency === "U"
                    ? "Monto Utilizado (UF)"
                    : "Monto Utilizado ($)"
                }
                value={
                  caseValue && caseValue.assistance?.assigned.currency === "P"
                    ? caseValue.assistance?.assigned.amount.toLocaleString(
                        "es-CL",
                        {
                          style: "currency",
                          currency: "CLP",
                        }
                      )
                    : ""
                }
                type="text"
                width={`${
                  Number(caseValue?.assistance?.assigned.events) !== 0
                    ? "152px"
                    : "286px"
                }`}
                disabled
              />
              {Number(caseValue?.assistance?.assigned.events) !== 0 && (
                <InputText
                  label="Eventos utilizados"
                  value={
                    caseValue
                      ? (caseValue.assistance?.used.events || 0).toString()
                      : "0"
                  }
                  type="number"
                  width="129px"
                  disabled
                />
              )}
            </ContentRow>
          </>
        </ContentCell>

        <CaseServiceTable
          product={caseValue?.product}
          assistance={caseValue?.assistance}
          formValues={caseValue?.values}
          setFormValues={setFormValues}
        />
      </ContentCell>
      <LoadingMessage />
      <Fragment>
        <FloatMenu>
          <ButtonIcon iconName="home" onClick={handleClickHome} />
          <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
          <ButtonIcon
            iconName="save"
            onClick={() => {
              handleClickSave();
            }}
          />
        </FloatMenu>
      </Fragment>
    </div>
  );
};

export default CaseFormService;
