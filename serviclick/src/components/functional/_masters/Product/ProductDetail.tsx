import { useState } from "react";

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

import { useFamily, useProduct } from "../../../../hooks";
import ButtonIcon from "../../../ui/ButtonIcon";

import { frequencyList, termList } from "../../../../data/masters";

const ProductDetail = () => {
  const { product } = useProduct();
  const { list: listFamilies } = useFamily();

  const [showModalCoverage, setShowModalCoverage] = useState(false);

  const handleValue = (field: string, value: any) => {
    const state = { ...product, [field]: value };
    //dispatch(setProduct(state));
  };

  const handleChangeFamily = (e: any) => {
    handleValue("family_id", e.target.value);
    //dispatch(e.target.value === "" ? resetFamily() : getFamily(e.target.value));
  };

  const handleChangeName = (e: any) => {
    handleValue("name", e.target.value);
  };

  const handleChangebeneficiaries = (e: any) => {
    handleValue("beneficiaries", e.target.value);
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
    //setCoverage(coverageToEdit);
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

  return (
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
              onChange={handleChangebeneficiaries}
              onBlur={handleChangebeneficiaries}
            />
          </ContentRow>
          <InputText
            id="txtProductName"
            label="Nombre"
            width="415px"
            value={product.name}
            onChange={handleChangeName}
            onBlur={handleChangeName}
          />
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
              label="Valor al público ($)"
              width="200px"
              value={product.price.customer.toString()}
              onChange={handleChangePricePublic}
              onBlur={handleChangePricePublic}
            />
            <InputText
              id="txtProductCompanyPrice"
              type="number"
              label="Valor empresa ($)"
              width="200px"
              value={product.price.company.toString()}
              onChange={handleChangePriceCompany}
              onBlur={handleChangePriceCompany}
            />
          </ContentCell>
        </ContentRow>
        <ContentCell gap="5px">
          <ComboBox
            id="txtProductFrecuency"
            label="Frecuencia"
            width="270px"
            value={product.frequency}
            onChange={handleChangeFrequency}
            placeHolder=":: Seleccione frecuencia ::"
            data={frequencyList}
            dataValue="id"
            dataText="name"
          />
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
                  <TableCell width="70px">{coverageItem.lack}</TableCell>
                  <TableCell width="160px">
                    {coverageItem.events}
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
            <ButtonIcon iconName="add" color="gray" />
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
          <ButtonIcon iconName="edit" color="gray" />
        </ContentCell>
      </ContentRow>
    </ContentCell>
  );
};

export default ProductDetail;
