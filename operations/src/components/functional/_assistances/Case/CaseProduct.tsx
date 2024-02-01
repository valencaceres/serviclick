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
import { useRouter } from "next/router";
import { useCase, useRetail } from "~/store/hooks";
import { useUser } from "@clerk/nextjs";
import { IApplicant } from "../../../../interfaces/applicant";
import { IRetProduct } from "~/interfaces/retail";
import { IProduct, IRetail } from "~/interfaces/case";
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
    resetCaseId,
    retails,
  } = useCase();
  const { retailList, getAll, resetRetail } = useRetail();
  const { user } = useUser();

  const [applicant, setApplicant] = useState<IApplicant>();
  const [hasLoadedServices, setHasLoadedServices] = useState<boolean>(false);
  const [productList, setProductList] = useState<IRetProduct[]>([]);
  const [retail, setRetail] = useState<IRetail | null>(null);
  const [productListFiltered, setProcuctListFiltered] = useState<IProduct[]>(
    []
  );
  const router = useRouter();
  const isValidAmount = !(
    caseValue?.assistance?.assigned?.currency === "$" &&
    caseValue?.assistance?.used.total_amount >=
      caseValue?.assistance?.assigned?.amount
  );

  const uniqueRetailIds = new Set<string>();
  const uniqueRetails: IRetail[] = retails.filter((retail) => {
    if (!uniqueRetailIds.has(retail?.id)) {
      uniqueRetailIds.add(retail?.id);
      return true;
    }
    return false;
  });
  const uniqueProductIds = new Set<string>();
  const uniqueProducts: IProduct[] =
    products?.filter((product) => {
      if (!uniqueProductIds.has(product.id)) {
        uniqueProductIds.add(product.id);
        return true;
      }
      return false;
    }) || [];

  const handleChangeProduct = (e: any) => {
    getServicesAndValues({
      insured_id: caseValue?.insured.id,
      beneficiary_id: caseValue?.beneficiary?.id || null,
      retail_id: caseValue?.retail?.id || null,
      customer_id: caseValue?.customer.id,
      product_id: e.target.value,
      assistance_id: null,
    });
    if (productList && productList.length > 0) {
      const selectedProduct = productList.find(
        (item) => item.id === e.target.value
      );

      setCase({
        ...caseValue,
        user_id: user?.id || "",
        product: {
          id: selectedProduct?.id || caseValue?.product?.id,
          name: selectedProduct?.name || caseValue?.product?.name,
          productPlan_id: caseValue.productplan_id ?? "",
          agent_id: caseValue.product.agent_id ?? "",
        },
        productplan_id:
          selectedProduct?.productplan_id || caseValue?.productplan_id,
      });
    } else if (uniqueProducts) {
      const selectedProduct = uniqueProducts.find(
        (item) => item.id === e.target.value
      );
      setCase({
        ...caseValue,
        user_id: user?.id || "",
        product: selectedProduct || caseValue.product,
      });
    }
  };
  const handleChangeRetail = (e: any) => {
    if (caseValue?.type === "C") {
      if (retailList) {
        const selectedRetail = retailList.find(
          (item) => item.id === e.target.value
        );
        setCase({
          ...caseValue,
          retail: {
            id: selectedRetail?.id || "",
            name: selectedRetail?.name || "",
            rut: selectedRetail?.rut || "",
          },
        });
        if (selectedRetail) {
          setProductList(selectedRetail.products || []);
        }
      }
    } else {
      if (uniqueRetails) {
        const selectedRetail = uniqueRetails.find(
          (item) => item.id === e.target.value
        );
        setCase({
          ...caseValue,
          retail: {
            id: selectedRetail?.id || "",
            name: selectedRetail?.name || "",
            rut: selectedRetail?.rut || "",
          },
        });
        if (selectedRetail) {
          const filteredProducts = uniqueProducts.filter(
            (product) => product.agent_id === selectedRetail.id
          );

          setProcuctListFiltered(filteredProducts);
        }
      }
    }
  };

  const handleChangeAssistance = (e: any) => {
    if (assistances) {
      const selectedAssistance = assistances.find(
        (item) => item.id === e.target.value
      );

      getServicesAndValues({
        insured_id: caseValue?.insured.id || null,
        beneficiary_id: caseValue?.beneficiary?.id || null,
        retail_id: caseValue?.retail?.id || null,
        customer_id: caseValue?.customer.id || null,
        product_id: caseValue?.product.id,
        assistance_id: selectedAssistance?.id || null,
      });
      setCase({
        ...caseValue,
        assistance: selectedAssistance || caseValue?.assistance,
      });
    }
  };
  useEffect(() => {
    if (caseId && !hasLoadedServices) {
      getServicesAndValues({
        insured_id: caseValue?.insured?.id || null,
        beneficiary_id: caseValue?.beneficiary?.id || null,
        retail_id: caseValue?.retail?.id || null,
        customer_id: caseValue?.customer?.id || null,
        product_id: caseValue?.product?.id,
        assistance_id: null,
      });
    }
    if (assistances && assistances?.length > 0 && !hasLoadedServices) {
      setHasLoadedServices(true);
    }
  }, [caseId, caseValue, hasLoadedServices, assistances]);

  useEffect(() => {
    if (router.query.id === "new") {
      resetCaseId();
    }
  }, [router.query.id, resetCaseId]);
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
    if (caseValue?.assistance?.id !== "" && caseValue?.product?.id !== "") {
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
        caseValue?.type === "I"
          ? caseValue?.insured
          : caseValue?.type === "C"
          ? caseValue?.beneficiary &&
            Object.keys(caseValue.beneficiary).length > 0 &&
            caseValue.beneficiary.name !== ""
            ? caseValue?.beneficiary
            : caseValue?.insured
          : caseValue?.beneficiary;
      if (applicant) {
        setApplicant(applicant);
      }
    }
    setIsEnabledSave(true);
  }, [caseValue?.insured, caseValue?.beneficiary, setIsEnabledSave]);

  useEffect(() => {
    if (caseValue?.type === "C" && caseValue?.retail === null) {
      getAll();
    } else {
      resetRetail();
    }
  }, [caseValue?.retail, caseValue?.type]);

  useEffect(() => {
    setRetail(caseValue?.retail ?? null);
  }, []);

  useEffect(() => {
    if (caseValue?.retail === null) {
      const filteredProducts = uniqueProducts.filter(
        (product) => product.agent_id === uniqueRetails[0]?.id
      );
      setProcuctListFiltered(filteredProducts);
    }
    if (caseValue.retail !== null && router.query.id === "new") {
      const filteredProducts = uniqueProducts.filter(
        (product) => product.agent_id === caseValue.retail?.id
      );
      setProcuctListFiltered(filteredProducts);
    }
  }, []);

  useEffect(() => {
    setCase({
      ...caseValue,
      user_id: user?.id || "",
      retail: {
        id: uniqueRetails[0]?.id || "",
        name: uniqueRetails[0]?.name || "",
        rut: uniqueRetails[0]?.rut || "",
      },
    });
  }, [retails]);

  return (
    <ContentCell gap="20px">
      <ContentCell gap="5px">
        {router.query.id === "new" &&
          (caseValue?.type === "C" && caseId.retail === null ? (
            <ComboBox
              id="assistance"
              label="Origen"
              placeHolder=":: Seleccione un origen ::"
              value={
                caseValue && caseValue.retail ? caseValue.retail.id || "" : ""
              }
              onChange={handleChangeRetail}
              width="530px"
              data={retailList}
              dataValue={"id"}
              dataText={"name"}
            />
          ) : (
            <ComboBox
              id="assistance"
              label="Origen"
              placeHolder=":: Seleccione una origen ::"
              value={
                caseValue && caseValue.retail ? caseValue.retail.id || "" : ""
              }
              onChange={handleChangeRetail}
              width="530px"
              data={uniqueRetails}
              enabled={uniqueRetails.length > 1 ? true : false}
              dataValue={"id"}
              dataText={"name"}
            />
          ))}
        {router.query.id !== "new" && (
          <>
            {caseValue?.retail &&
              caseValue?.retail?.rut !== caseValue.customer?.rut && (
                <InputText
                  id="retail"
                  label="Origen"
                  type="text"
                  value={caseValue?.retail?.name || ""}
                  width="530px"
                />
              )}
          </>
        )}

        {caseValue?.customer?.rut !== caseValue?.insured?.rut &&
          caseValue?.type !== "C" && (
            <InputText
              id="customer"
              label="Titular"
              type="text"
              value={caseValue ? caseValue.customer?.name || "" : ""}
              width="530px"
              disabled={itWasFound}
            />
          )}
        {caseValue?.type === "C" &&
          caseValue.insured.rut !== caseValue.customer.rut && (
            <InputText
              id="insured"
              label="Titular"
              type="text"
              value={
                caseValue
                  ? `${caseValue?.insured?.name} ${caseValue?.insured?.paternalLastName} ${caseValue?.insured?.maternalLastName}` ||
                    ""
                  : ""
              }
              width="530px"
              disabled={itWasFound}
            />
          )}
        {caseValue?.type != "B" && (
          <InputText
            label="Beneficiario"
            type="text"
            value={
              caseValue
                ? `${applicant?.name} ${applicant?.paternalLastName} ${applicant?.maternalLastName}` ||
                  ""
                : ""
            }
            width="530px"
          />
        )}
        {caseValue?.type === "B" && (
          <InputText
            id="insured"
            label="Titular"
            type="text"
            value={
              caseValue
                ? `${caseValue?.insured?.name} ${caseValue?.insured?.paternalLastName} ${caseValue?.insured?.maternalLastName}` ||
                  ""
                : ""
            }
            width="530px"
            disabled={itWasFound}
          />
        )}
        {caseValue?.type === "B" && (
          <InputText
            label="Beneficiario"
            type="text"
            value={
              caseValue
                ? `${caseValue?.beneficiary?.name} ${caseValue?.beneficiary?.paternalLastName} ${caseValue?.beneficiary?.maternalLastName}` ||
                  ""
                : ""
            }
            width="530px"
          />
        )}
      </ContentCell>
      <ContentCell gap="5px">
        {caseValue?.case_id !== null ? (
          <Fragment>
            <InputText
              id="product"
              label="Producto"
              type="text"
              value={caseValue?.product?.name}
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
              data={caseValue.type === "C" ? productList : productListFiltered}
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
            caseValue && caseValue?.assistance
              ? caseValue?.assistance.id || ""
              : ""
          }
          onChange={handleChangeAssistance}
          width="530px"
          data={assistances}
          dataValue={"id"}
          dataText={"name"}
          enabled={
            caseValue?.case_id === "" ||
            caseValue?.case_id === null ||
            (caseValue?.assistance?.id !== "" &&
              user?.publicMetadata?.roles?.operaciones === "admin")
          }
        />
        <ContentRow gap="5px">
          <InputText
            id="assistance"
            label={
              caseValue?.assistance?.assigned?.currency === "U"
                ? "Monto Disponible (UF)"
                : "Monto Disponible ($)"
            }
            type="text"
            value={caseValue?.assistance?.assigned?.amount.toString()}
            width="190px"
            disabled={itWasFound}
            isValid={isValidAmount}
          />
          <InputText
            id="events"
            label="Eventos"
            type="text"
            value={caseValue?.assistance?.assigned?.events.toString()}
            width="120px"
            disabled={itWasFound}
          />
          <InputText
            id="limit"
            label="Límite"
            type="text"
            value={caseValue?.assistance?.assigned?.maximum.toString()}
            width="210px"
            disabled={itWasFound}
          />
        </ContentRow>
        <ContentRow gap="5px">
          <InputText
            id="assistance"
            label="Monto utilizado ($)"
            type="text"
            value={caseValue?.assistance?.used?.total_amount?.toString()}
            width="190px"
            disabled={itWasFound}
          />
          <InputText
            id="events"
            label="Eventos usados"
            type="text"
            value={caseValue?.assistance?.used?.events?.toString()}
            width="120px"
            isValid={
              caseValue?.assistance?.used?.events <=
              caseValue?.assistance?.assigned?.events
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
          {caseValue?.values && caseValue?.values?.length > 0 ? (
            Array.isArray(caseValue?.values) &&
            caseValue?.values
              .filter(
                (value, index, self) =>
                  self.findIndex((v) => v.id === value.id) === index
              ) // Filtra elementos con IDs únicos
              .map((item, idx: number) => (
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
