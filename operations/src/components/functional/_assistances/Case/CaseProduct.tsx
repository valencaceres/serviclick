import React, { useState, useEffect, Fragment } from "react";

import { ContentCell, ContentRow } from "../../../layout/Content";

import {
  InputText,
  ComboBox,
  RadioButtonGroup,
  RadioButtonItem,
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableCellEnd,
  TableIcons,
  TableCellText,
} from "~/components/ui";

import { useCase } from "~/store/hooks";
import { useUser } from "@clerk/nextjs";
import { IApplicant } from "../../../../interfaces/applicant";

interface ICaseProductProps {
  setIsEnabledSave: (isEnabled: boolean) => void;
  itWasFound: boolean;
}

const CaseProduct = ({ setIsEnabledSave, itWasFound }: ICaseProductProps) => {
  const {
    caseValue,
    setCase,
    products,
    assistances,
    getServicesAndValues,
    caseId,
  } = useCase();
  const { user } = useUser();

  const [applicant, setApplicant] = useState<IApplicant>();
  const [hasLoadedServices, setHasLoadedServices] = useState<boolean>(false);

  const isValidAmount = !(
    caseValue?.assistance.assigned.currency === "$" &&
    caseValue.assistance.used.total_amount >=
      caseValue.assistance.assigned.amount
  );

  const handleChangeProduct = (e: any) => {
    getServicesAndValues({
      insured_id: caseValue.insured.id,
      beneficiary_id: caseValue.beneficiary?.id || null,
      retail_id: caseValue.retail?.id || null,
      customer_id: caseValue.customer.id,
      product_id: e.target.value,
      assistance_id: null,
    });
    if (products) {
      const selectedProduct = products.find(
        (item) => item.id === e.target.value
      );
      setCase({
        ...caseValue,
        user_id: user?.id || "",
        product: selectedProduct || caseValue.product,
      });
    }
  };

  const handleChangeAssistance = (e: any) => {
    if (assistances) {
      const selectedAssistance = assistances.find(
        (item) => item.id === e.target.value
      );
      setCase({
        ...caseValue,
        assistance: selectedAssistance || caseValue.assistance,
      });
    }
  };
  useEffect(() => {
    if (caseId && !hasLoadedServices) {
      getServicesAndValues({
        insured_id: caseValue.insured.id,
        beneficiary_id: caseValue.beneficiary?.id || null,
        retail_id: caseValue.retail?.id || null,
        customer_id: caseValue.customer.id,
        product_id: caseValue.product.id,
        assistance_id: null,
      });
    }
    if (assistances && assistances?.length > 0 && !hasLoadedServices) {
      setHasLoadedServices(true);
    }
  }, [caseId, caseValue, hasLoadedServices, assistances]);

  const handleChangeValue = (e: any, id: string) => {
    if (Array.isArray(caseValue.values)) {
      const values = caseValue.values.map((item) => {
        if (item.id === id) {
          item.value = e.target.value || "";
        }
        return item;
      });
      setCase({ ...caseValue, values });
    }
  };

  const checkCompleteFields = () => {
    if (caseValue.assistance.id !== "" && caseValue.product.id !== "") {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setIsEnabledSave(checkCompleteFields());
  }, [caseValue, setIsEnabledSave]);
  useEffect(() => {
    if (caseValue) {
      const applicant =
        caseValue?.type === "I" ? caseValue.insured : caseValue.beneficiary;
      if (applicant) {
        setApplicant(applicant);
      }
    }
    setIsEnabledSave(true);
  }, [caseValue.insured, caseValue.beneficiary, setIsEnabledSave]);

  return (
    <ContentCell gap="20px">
      <ContentCell gap="5px">
        {caseValue.retail?.rut !== caseValue.customer.rut && (
          <InputText
            id="retail"
            label="Empresa"
            type="text"
            value={caseValue ? caseValue.retail?.name || "" : ""}
            width="530px"
            disabled={itWasFound}
          />
        )}
        {caseValue.customer.rut !== caseValue.insured.rut && (
          <InputText
            id="customer"
            label="Titular"
            type="text"
            value={caseValue ? caseValue.customer?.name || "" : ""}
            width="530px"
            disabled={itWasFound}
          />
        )}
        {caseValue.type === "C" && (
          <InputText
            id="insured"
            label="Titular"
            type="text"
            value={
              caseValue
                ? `${caseValue.insured?.name} ${caseValue.insured?.paternalLastName} ${caseValue.insured?.maternalLastName}` ||
                  ""
                : ""
            }
            width="530px"
            disabled={itWasFound}
          />
        )}
        <InputText
          id="applicant"
          label="Beneficiario"
          type="text"
          value={
            caseValue
              ? `${applicant?.name} ${applicant?.paternalLastName} ${applicant?.maternalLastName}` ||
                ""
              : ""
          }
          width="530px"
          disabled={itWasFound}
        />
      </ContentCell>
      <ContentCell gap="5px">
        {caseValue.case_id !== null ? (
          <Fragment>
            <InputText
              id="product"
              label="Producto"
              type="text"
              value={caseValue.product.name}
              width="530px"
              disabled={itWasFound}
            />
          </Fragment>
        ) : (
          <Fragment>
            <ComboBox
              id="producto"
              label="Producto"
              placeHolder=":: Seleccione un producto ::"
              value={
                caseValue && caseValue.product ? caseValue.product.id || "" : ""
              }
              onChange={handleChangeProduct}
              width="530px"
              data={products}
              dataValue={"id"}
              dataText={"name"}
              enabled={!itWasFound}
            />
          </Fragment>
        )}
        <ComboBox
          id="assistance"
          label="Asistencia"
          placeHolder=":: Seleccione una asistencia ::"
          value={
            caseValue && caseValue.assistance
              ? caseValue.assistance.id || ""
              : ""
          }
          onChange={handleChangeAssistance}
          width="530px"
          data={assistances}
          dataValue={"id"}
          dataText={"name"}
          enabled={user?.publicMetadata?.roles?.operaciones === "admin"}
        />
        <ContentRow gap="5px">
          <InputText
            id="assistance"
            label={
              caseValue?.assistance.assigned.currency === "U"
                ? "Monto Disponible (UF)"
                : "Monto Disponible ($)"
            }
            type="text"
            value={caseValue.assistance.assigned.amount.toString()}
            width="190px"
            disabled={itWasFound}
            isValid={isValidAmount}
          />
          <InputText
            id="events"
            label="Eventos"
            type="text"
            value={caseValue.assistance.assigned.events.toString()}
            width="120px"
            disabled={itWasFound}
          />
          <InputText
            id="limit"
            label="Límite"
            type="text"
            value={caseValue.assistance.assigned.maximum.toString()}
            width="210px"
            disabled={itWasFound}
          />
        </ContentRow>
        <ContentRow gap="5px">
          <InputText
            id="assistance"
            label="Monto utilizado ($)"
            type="text"
            value={caseValue.assistance.used.total_amount.toString()}
            width="190px"
            disabled={itWasFound}
          />
          <InputText
            id="events"
            label="Eventos usados"
            type="text"
            value={caseValue.assistance.used.events.toString()}
            width="120px"
            isValid={
              caseValue.assistance.used.events <=
              caseValue.assistance.assigned.events
            }
            disabled={itWasFound}
          />
        </ContentRow>
      </ContentCell>
      <Table height="287px">
        <TableHeader>
          <TableCell width="250px" align="center">
            Dato
          </TableCell>
          <TableCell width="270px">Valor</TableCell>
          <TableCellEnd />
        </TableHeader>
        <TableDetail>
          {caseValue.values &&
          caseValue.values.length > 0 &&
          caseValue.values.length > 0 ? (
            Array.isArray(caseValue.values) &&
            caseValue.values.map((item, idx: number) => (
              <TableRow key={item.id}>
                <TableCell width="250px" align="left">
                  <b>{item.name}</b>
                </TableCell>
                <TableCell width="270px" align="left">
                  <TableCellText
                    placeholder="Ingrese valor"
                    value={item.value || ""}
                    onChange={(e: any) => handleChangeValue(e, item.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell width="510px" align="center">
                No hay datos disponibles en este momento
              </TableCell>
            </TableRow>
          )}
        </TableDetail>
      </Table>
    </ContentCell>
  );
};

export default CaseProduct;
