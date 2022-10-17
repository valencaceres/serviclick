import { useState, useEffect, Fragment } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import CheckBox from "../../../ui/CheckBox";
import Icon from "../../../ui/Icon";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
} from "../../../ui/Table";
import ButtonIcon from "../../../ui/ButtonIcon";
import ModalWindow from "../../../ui/ModalWindow";

import ProductCoverage from "./ProductCoverage";
import ProductFamilyValues from "./ProductFamilyValues";

import { useFamily, useProduct } from "../../../../hooks";

import { frequencyList, termList } from "../../../../data/masters";

import { CoverageT } from "../../../../redux/slices/productSlice";

import { genetateUUID } from "../../../../utils/functions";

type FamilyValuesDetailT = {
  id: string;
  name: string;
  isChecked: boolean;
};

const ProductDetail = ({ setEnableSave }: any) => {
  const { product, set } = useProduct();
  const {
    list: listFamilies,
    getById: getFamilyById,
    reset: resetFamily,
    family,
  } = useFamily();

  const coverageInitialState = {
    id: "",
    name: "",
    amount: "",
    maximum: "",
    lack: "",
    events: "",
    isCombined: false,
  };

  const [coverage, setCoverage] = useState<CoverageT>(coverageInitialState);
  const [familyValues, setFamilyValues] = useState<FamilyValuesDetailT[]>([]);

  const [isCompleteCoverageItem, setIsCompleteCoverageItem] = useState(false);
  const [familySelected, setFamilySelected] = useState(false);

  const [showModalCoverage, setShowModalCoverage] = useState(false);
  const [showModalFamilyValues, setShowModalFamilyValues] = useState(false);

  const setClosedModalCoverage = () => {
    setShowModalCoverage(false);
  };

  const saveCoverage = () => {
    let coverages: CoverageT[];

    if (
      product.coverages.some(
        (item) =>
          item.id === coverage.id ||
          item.name.toLowerCase() === coverage.name.toLowerCase()
      )
    ) {
      coverages = product.coverages.map((item) => {
        if (
          item.id === coverage.id ||
          item.name.toLowerCase() === coverage.name.toLowerCase()
        ) {
          return {
            id: item.id,
            name: coverage.name,
            amount: coverage.amount,
            maximum: coverage.maximum,
            lack: coverage.lack,
            events: coverage.events,
            isCombined: coverage.isCombined,
          };
        } else {
          return {
            ...item,
            amount: coverage.isCombined ? coverage.amount : item.amount,
            isCombined: coverage.isCombined,
          };
        }
      });
    } else {
      coverages = [
        ...product.coverages.map((item: CoverageT) => {
          return {
            ...item,
            amount: coverage.isCombined ? coverage.amount : item.amount,
            isCombined: coverage.isCombined,
          };
        }),
        {
          id: genetateUUID(),
          name: coverage.name,
          amount: coverage.amount,
          maximum: coverage.maximum,
          lack: coverage.lack,
          events: coverage.events,
          isCombined: coverage.isCombined,
        },
      ];
    }

    handleValue("coverages", coverages);
    setShowModalCoverage(false);
  };

  const checkCoverageItemComplete = () => {
    return (
      coverage.name !== "" &&
      coverage.amount !== "" &&
      coverage.maximum !== "" &&
      coverage.lack !== "" &&
      coverage.events !== ""
    );
  };

  const setClosedModalFamilyValues = () => {
    setShowModalFamilyValues(false);
  };

  const saveFamilyValues = () => {
    handleValue(
      "familyValues",
      familyValues
        .filter((value) => value.isChecked)
        .map((value) => ({ familyvalue_id: value.id, name: value.name }))
    );
    setShowModalFamilyValues(false);
  };

  const handleValue = (field: string, value: any) => {
    const state = { ...product, [field]: value };
    set(state);
  };

  const handleChangeFamily = (e: any) => {
    //set({ ...product, familyValues: [] });
    handleValue("family_id", e.target.value);
    if (e.target.value === "") {
      resetFamily();
    } else {
      getFamilyById(e.target.value);
    }
  };

  const handleChangeName = (e: any) => {
    handleValue("name", e.target.value);
  };

  const handleChangeBeneficiaries = (e: any) => {
    handleValue("beneficiaries", e.target.value);
  };

  const handleChangeDueDay = (e: any) => {
    handleValue("dueDay", e.target.value);
  };

  const handleChangeMinInsuredCompanyPrice = (e: any) => {
    handleValue("minInsuredCompanyPrice", e.target.value);
  };

  const handleCheckSubject = () => {
    handleValue("isSubject", !product.isSubject);
  };

  const handleChangeCost = (e: any) => {
    handleValue("cost", e.target.value);
  };

  const handleChangePricePublic = (e: any) => {
    handleValue("price", {
      ...product.price,
      customer: e.target.value,
    });
  };

  const handleChangePriceCompany = (e: any) => {
    handleValue("price", {
      ...product.price,
      company: e.target.value,
    });
  };

  const handleChangeFrequency = (e: any) => {
    handleValue("frequency", e.target.value);
  };

  const handleChangeTerm = (e: any) => {
    handleValue("term", e.target.value);
  };

  const handleEditCoverage = (coverageToEdit: any) => {
    setCoverage(coverageToEdit);
    setShowModalCoverage(true);
  };

  const handleDeleteCoverage = (coverageToDelete: any) => {
    handleValue(
      "coverages",
      product.coverages.filter(
        (item) =>
          item.name.toLowerCase() !== coverageToDelete.name.toLowerCase()
      )
    );
  };

  const handleAddCoverage = () => {
    setIsCompleteCoverageItem(false);
    setCoverage(coverageInitialState);
    setShowModalCoverage(true);
  };

  const handleCheckFamilyValue = (id: string) => {
    setFamilyValues(
      familyValues.map((value: FamilyValuesDetailT) => {
        if (id === value.id) {
          return { id, name: value.name, isChecked: !value.isChecked };
        } else {
          return value;
        }
      })
    );
  };

  const handleAddFamilyValues = () => {
    setShowModalFamilyValues(true);
  };

  useEffect(() => {
    setIsCompleteCoverageItem(checkCoverageItemComplete());
  }, [coverage]);

  useEffect(() => {
    setFamilyValues(
      family.values.map((item) => ({
        id: item.id,
        name: item.name,
        isChecked: false,
      }))
    );
  }, [family]);

  useEffect(() => {
    setEnableSave(
      product.family_id !== "" &&
        product.name !== "" &&
        product.beneficiaries.toString() !== "" &&
        // product.cost > 0 &&
        // product.price.company > 0 &&
        // product.price.customer > 0 &&
        product.frequency !== "" &&
        product.term !== "" &&
        product.coverages.length > 0
    );
  }, [product]);

  useEffect(() => {
    setFamilySelected(product.family_id !== "");
    if (product.family_id !== "") {
      getFamilyById(product.family_id);
    }
  }, [product.family_id]);

  return (
    <Fragment>
      <ContentCell gap="20px">
        <ContentRow gap="20px">
          <ContentCell gap="5px">
            <ContentRow gap="5px">
              <ComboBox
                id="txtProductFamily"
                label="Familia"
                width="310px"
                value={product.family_id}
                onChange={handleChangeFamily}
                placeHolder=":: Seleccione familia ::"
                data={listFamilies}
                dataValue="id"
                dataText="name"
              />
              <InputText
                id="txtProductBeneficiaries"
                label="Cargas"
                width="100px"
                value={product.beneficiaries.toString()}
                onChange={handleChangeBeneficiaries}
                onBlur={handleChangeBeneficiaries}
              />
            </ContentRow>
            <ContentRow gap="5px">
              <InputText
                id="txtProductName"
                label="Nombre"
                width="310px"
                value={product.name}
                onChange={handleChangeName}
                onBlur={handleChangeName}
              />
              <InputText
                id="txtProductBeneficiaries"
                label="Min. aseg."
                width="100px"
                value={product.minInsuredCompanyPrice.toString()}
                onChange={handleChangeMinInsuredCompanyPrice}
                onBlur={handleChangeMinInsuredCompanyPrice}
              />
            </ContentRow>
          </ContentCell>
          <ContentRow gap="5px">
            <ContentCell gap="5px">
              <InputText
                id="txtProductCost"
                type="number"
                label="Costo técnico ($)"
                width="200px"
                value={product.cost.toString()}
                onChange={handleChangeCost}
                onBlur={handleChangeCost}
              />
              <CheckBox
                label="Afecto"
                width="200px"
                value={product.isSubject}
                onChange={handleCheckSubject}
              />
            </ContentCell>
            <ContentCell gap="5px">
              <InputText
                id="txtProductPublicPrice"
                type="number"
                label={`Valor al público ${
                  product.isSubject ? "IVA incluido " : ""
                }($)`}
                width="200px"
                value={product.price.customer.toString()}
                onChange={handleChangePricePublic}
                onBlur={handleChangePricePublic}
              />
              <InputText
                id="txtProductCompanyPrice"
                type="number"
                label={`Valor empresa ${
                  product.isSubject ? "IVA incluido " : ""
                }($)`}
                width="200px"
                value={product.price.company.toString()}
                onChange={handleChangePriceCompany}
                onBlur={handleChangePriceCompany}
              />
            </ContentCell>
          </ContentRow>
          <ContentCell gap="5px">
            <ContentRow gap="5px">
              <ComboBox
                id="txtProductFrecuency"
                label="Frecuencia"
                width="165px"
                value={product.frequency}
                onChange={handleChangeFrequency}
                placeHolder=":: Seleccione frecuencia ::"
                data={frequencyList}
                dataValue="id"
                dataText="name"
              />
              <InputText
                id="txtProductBeneficiaries"
                label="Día de pago"
                width="100px"
                value={product.dueDay.toString()}
                onChange={handleChangeDueDay}
                onBlur={handleChangeDueDay}
              />
            </ContentRow>
            <ComboBox
              id="txtProductTerm"
              label="Duración (meses)"
              width="270px"
              value={product.term}
              onChange={handleChangeTerm}
              placeHolder=":: Seleccione duración ::"
              data={termList}
              dataValue="id"
              dataText="name"
            />
          </ContentCell>
        </ContentRow>
        <ContentRow gap="10px">
          <ContentCell gap="10px" align="flex-end">
            <Table width="910px" height="347px">
              <TableHeader>
                <TableCell width="270px">Servicio</TableCell>
                <TableCell width="150px">Monto</TableCell>
                <TableCell width="240px">Límite</TableCell>
                <TableCell width="70px" alt="Inicio de vigencia en días">
                  Inicio
                </TableCell>
                <TableCell width="166px">Eventos</TableCell>
              </TableHeader>
              <TableDetail>
                {product.coverages.map((coverageItem: any, idx: number) => (
                  <TableRow key={idx}>
                    <TableCell width="270px">{coverageItem.name}</TableCell>
                    <TableCell width="150px">{coverageItem.amount}</TableCell>
                    <TableCell width="240px">{coverageItem.maximum}</TableCell>
                    <TableCell width="70px" align="center">
                      {coverageItem.lack}
                    </TableCell>
                    <TableCell width="90px" align="center">
                      {coverageItem.events}
                    </TableCell>
                    <TableCell width="68px" align="center">
                      <TableIcons>
                        <Icon
                          iconName="edit"
                          onClick={() => handleEditCoverage(coverageItem)}
                        />
                        <Icon
                          iconName="delete"
                          onClick={() => {
                            handleDeleteCoverage(coverageItem);
                          }}
                        />
                      </TableIcons>
                    </TableCell>
                  </TableRow>
                ))}
              </TableDetail>
            </Table>
            <ContentRow gap="10px">
              <ContentCellSummary>{`${product.coverages.length} registros`}</ContentCellSummary>
              <ButtonIcon
                iconName="add"
                color="gray"
                onClick={handleAddCoverage}
              />
            </ContentRow>
          </ContentCell>
          <ContentCell gap="10px" align="flex-end">
            <Table width="210px" height="347px">
              <TableHeader>
                <TableCell width="avaliable">Campos</TableCell>
              </TableHeader>
              <TableDetail>
                {product.familyValues.map((value: any, idx: number) => (
                  <TableRow key={idx} className={"deleted"}>
                    <TableCell width="avaliable">{value.name}</TableCell>
                  </TableRow>
                ))}
              </TableDetail>
            </Table>
            <ButtonIcon
              iconName="edit"
              color="gray"
              onClick={handleAddFamilyValues}
              disabled={!familySelected}
            />
          </ContentCell>
        </ContentRow>
      </ContentCell>
      <ModalWindow
        showModal={showModalCoverage}
        title="Servicio"
        setClosed={setClosedModalCoverage}>
        <ProductCoverage
          setCoverage={setCoverage}
          coverage={coverage}
          saveCoverage={saveCoverage}
          isCompleteCoverageItem={isCompleteCoverageItem}
        />
      </ModalWindow>
      <ModalWindow
        showModal={showModalFamilyValues}
        title="Campos"
        setClosed={setClosedModalFamilyValues}>
        <ProductFamilyValues
          familyValues={familyValues}
          saveFamilyValues={saveFamilyValues}
          handleCheckFamilyValue={handleCheckFamilyValue}
        />
      </ModalWindow>
    </Fragment>
  );
};

export default ProductDetail;
