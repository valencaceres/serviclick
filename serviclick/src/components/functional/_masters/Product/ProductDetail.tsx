import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import CheckBox from "../../../ui/CheckBox";

import { useFamily, useProduct } from "../../../../hooks";

const ProductDetail = () => {
  const { product } = useProduct();
  const { family } = useFamily();

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

  return (
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
            data={[]}
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
          width="300px"
          value={product.frequency}
          onChange={handleChangeFrequency}
          placeHolder=":: Seleccione frecuencia ::"
          data={[]}
          dataValue="id"
          dataText="name"
        />
        <ComboBox
          id="txtProductTerm"
          label="Duración (meses)"
          width="300px"
          value={product.term}
          onChange={handleChangeTerm}
          placeHolder=":: Seleccione duración ::"
          data={[]}
          dataValue="id"
          dataText="name"
        />
      </ContentCell>
    </ContentRow>
  );
};

export default ProductDetail;
