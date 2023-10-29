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
import { useCase } from "~/store/hooks/useCase";
import ButtonIcon from "~/components/ui/ButtonIcon";
import FloatMenu from "~/components/ui/FloatMenu";
import { useToast } from "~/components/ui/use-toast";
import CaseDocumentsTable from "./CaseDocumentsTable";

const CaseFormRefund = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { caseData, caseValue, getById, upsert } = useCase();
  const idCase = router?.query?.id;
  useEffect(() => {
    getById(idCase as string);
  }, []);
  const { toast } = useToast();
  const { data: ufValue } = useQueryUF().useGetUFValue();

  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [amountRefund, setAmountRefund] = useState("");
  const { user } = useUser();
  const { mutate: uploadDocuments, isLoading } =
    useQueryCase().useUploadDocument();
  const { setTitleUI, filters } = useUI();

  useEffect(() => {
    const statusText = caseValue?.refund?.status
      ? caseValue?.refund?.status
      : "";
    setTitleUI(`Caso - Devolución IMED ${statusText}`);
  }, [caseValue]);

  const handleAddRefound = async () => {
    try {
      upsert({
        alliance: caseValue?.alliance,
        assistance_id: caseValue?.assistance?.id ?? "",
        beneficiary: caseValue?.beneficiary,
        case_number: caseValue?.case_number,
        case_id: idCase as string,
        cost: caseValue?.cost,
        customer: caseValue?.customer,
        event: caseValue?.event,
        files: caseValue?.files,
        history: caseValue?.history,
        insured: caseValue?.insured,
        is_active: false,
        lead_id: caseValue?.lead_id,
        procedure_id: caseValue?.procedure_id,
        product: caseValue?.product,
        products: caseValue?.products,
        refund_amount: parseFloat(amountRefund),
        retail: caseValue?.retail,
        retails: caseValue?.retails,
        specialist: caseValue?.specialist,
        type: caseValue?.type,
        user_id: user?.id as string,
        values: caseValue?.values,
      });
    } catch (e) {
      setError("Faltaron campos");
    }
  };

  console.log(caseValue);
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.push(`/assistance/case/attachment/${idCase as string}`);
  };
  const handleClickSave = () => {
    handleAddRefound();
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
                  : caseData?.customer?.name || `${caseValue?.customer?.name} `
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
          <div className="flex flex-col gap-[5px]">
            <InputText
              value="Reembolso"
              label="Devolución IMED"
              disabled={true}
            />
          </div>
          <ContentRow gap="5px">
            <InputText
              label={
                caseValue?.assistance?.assigned?.currency === "U"
                  ? "Monto Disponible (UF)"
                  : "Monto Disponible ($)"
              }
              value={
                caseValue?.assistance?.assigned
                  ? caseValue?.assistance?.assigned?.currency === "P"
                    ? caseValue?.assistance?.assigned.amount.toLocaleString(
                        "es-CL",
                        {
                          style: "currency",
                          currency: "CLP",
                        }
                      )
                    : (
                        caseValue?.assistance?.assigned.amount *
                        ufValue?.serie[0].valor
                      ).toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })
                  : caseValue?.assistance?.assigned?.currency === "P"
                  ? (caseValue?.assistance?.assigned?.amount).toLocaleString(
                      "es-CL",
                      {
                        style: "currency",
                        currency: "CLP",
                      }
                    )
                  : (
                      caseValue?.assistance?.assigned?.amount! *
                      ufValue?.serie[0].valor
                    ).toLocaleString("es-CL", {
                      style: "currency",
                      currency: "CLP",
                    })
              }
              type="text"
              width={`${
                Number(caseValue?.assistance?.assigned?.events) !== 0
                  ? "152px"
                  : "286px"
              }`}
              disabled
            />
            {Number(caseValue?.assistance?.assigned?.events) !== 0 && (
              <InputText
                label="Eventos restantes"
                value={
                  caseValue?.assistance?.assigned?.events
                    ? caseValue?.assistance?.assigned?.events.toString()
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
                caseValue?.assistance?.assigned?.maximum || "No hay información"
              }
              type="text"
              width="234px"
              disabled
            />{" "}
          </ContentRow>
          <ContentRow gap="5px">
            {caseValue?.refund?.amount && caseValue?.refund.status ? (
              <>
                <InputText
                  label="Monto solicitado ($)"
                  value={(caseValue?.refund?.amount).toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                  type="text"
                  width="260px"
                  disabled={true}
                />
                <InputText
                  label="Monto solicitado ($)"
                  value={caseValue?.refund?.status}
                  type="text"
                  width="260px"
                  disabled={true}
                />
              </>
            ) : (
              <InputText
                label="Monto solicitado ($)"
                value={amountRefund}
                type="number"
                width="260px"
                onChange={(e: any) => setAmountRefund(e.target.value)}
              />
            )}
          </ContentRow>
          {caseValue?.refund?.comment && (
            <InputText
              label="Motivo"
              value={caseValue?.refund?.comment}
              type="text"
              width="260px"
              disabled={true}
            />
          )}
        </div>
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

export default CaseFormRefund;
