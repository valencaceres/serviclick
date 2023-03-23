import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

import Button from "../../ui/Button";
import ComboBox from "../../ui/ComboBox";
import { ContentCell, ContentRow } from "../../layout/Content";
import { LoadingMessage } from "../../ui/LoadingMessage";
import InputText from "../../ui/InputText";
import TextArea from "../../ui/TextArea/TextArea";
import CaseServiceTable from "./CaseServiceTable";

import { useCase } from "../../../store/hooks/useCase";
import { useQueryCase, useQueryStage } from "../../../hooks/query";
import { setStage } from "../../../redux/slices/stageSlice";

const CaseFormService = ({ thisCase }: any) => {
  const router = useRouter();
  const [assistance, setAssistance] = useState<any>(null);
  const [product, setProduct] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [stage, setStage] = useState<string>("");
  const { data } = useCase();
  const queryClient = useQueryClient();

  const assistances = data.products.map((item: any) => item.assistance);

  const { data: stageData } = useQueryStage().useGetAll();
  const { mutate: updateCase } = useQueryCase().useCreate();
  useEffect(() => {
    setProduct(
      data.products.find((item: any) => item.assistance.id === assistance)
    );
  }, [assistance]);

  const handleAddService = () => {
    if (assistance && product && description) {
      return updateCase(
        {
          applicant: {
            id: thisCase?.applicant_id,
          },
          number: thisCase?.case_number,
          product_id: product?.id,
          assistance_id: assistance,
          stage_id: stage,
          user_id: "0a53d2b2-574d-4a64-995b-56fe056a7b5c",
          description,
        },
        {
          onSuccess: () => {
            router.push(`/case/${thisCase?.case_id}/registro de servicio`);
            queryClient.invalidateQueries(["case", thisCase?.case_id]);
          },
        }
      );
    }
    alert("Debe completar todos los campos");
  };

  useEffect(() => {
    setStage(
      stageData?.find((s: any) => s.name === "Registro de servicio")?.id || ""
    );
  }, [thisCase]);

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
                  product?.assistance.currency === "P"
                    ? parseInt(product?.assistance.amount).toLocaleString(
                        "es-CL",
                        {
                          style: "currency",
                          currency: "CLP",
                        }
                      )
                    : product?.assistance.amount + " UF" || ""
                }
                type="text"
                width="152px"
                disabled
              />
              <InputText
                label="Eventos restantes"
                value={product?.assistance.events || ""}
                type="number"
                width="129px"
                disabled
              />
              <InputText
                label="Límite"
                value={product?.assistance.maximum || ""}
                type="text"
                width="234px"
                disabled
              />
            </ContentRow>
          ) : null}
        </ContentCell>
        {assistance ? (
          <Fragment>
            <h2 className="text-md font-semibold text-secondary-500">
              {product?.name}
            </h2>
            <CaseServiceTable product={product} />
            <TextArea
              value={description || ""}
              onChange={(e: any) => setDescription(e.target.value)}
              label="Descripción del evento"
              width="525px"
              height="110px"
            />
          </Fragment>
        ) : null}
        <Button text="Continuar" onClick={handleAddService} />
      </ContentCell>
      <LoadingMessage />
    </div>
  );
};

export default CaseFormService;
