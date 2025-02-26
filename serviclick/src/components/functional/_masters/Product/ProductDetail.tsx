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
  TableCellEnd,
} from "../../../ui/Table";
import ButtonIcon from "../../../ui/ButtonIcon";
import TextArea from "../../../ui/TextArea/TextArea";
import ModalWindow from "../../../ui/ModalWindow";

import { useFamily, useAssistance, useProduct } from "../../../../hooks";

import { frequencyList, termList } from "../../../../data/masters";
import ProductAssistance from "./ProductAssistance";
import { LoadingMessage, SuccessMessage } from "../../../ui/LoadingMessage";

export type CoverageT = {
  id: string;
  name: string;
  amount: string;
  maximum: string;
  lack: string;
  events: string;
  isCombined: boolean;
};

const ProductDetail = ({ setEnableSave, isSaving, setIsSaving }: any) => {
  const { product, setProduct, productLoading, families } = useProduct();
  const {
    list: listFamilies,
    getById: getFamilyById,
    reset: resetFamily,
  } = useFamily();

  const initialDataAssistance = {
    line_order: 0,
    id: "",
    name: "",
    amount: 0,
    maximum: "",
    events: 0,
    lack: 0,
    currency: "",
  };

  const [familySelected, setFamilySelected] = useState(false);
  const [showModalAssistance, setShowModalAssistance] = useState(false);
  const [assistanceData, setAssistanceData] = useState(initialDataAssistance);

  const formatAmount = (amount: string, currency: string) => {
    if (amount === "0") {
      return "";
    }
    if (currency === "P") {
      return `$${parseInt(amount).toLocaleString("en-US").replace(",", ".")}`;
    } else {
      return `${amount} UF`;
    }
  };

  const handleValue = (field: string, value: any) => {
    const state = { ...product, [field]: value };
    setProduct(state);
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

  const handleChangeTitle = (e: any) => {
    handleValue("title", e.target.value);
  };

  const handleChangeSubTitle = (e: any) => {
    handleValue("subTitle", e.target.value);
  };

  const handleChangeAlias = (e: any) => {
    handleValue("alias", e.target.value);
  };

  const handleChangePromotional = (e: any) => {
    handleValue("promotional", e.target.value);
  };

  const handleChangeDescription = (e: any) => {
    handleValue("description", e.target.value);
  };

  const handleChangeTerritorialScope = (e: any) => {
    handleValue("territorialScope", e.target.value);
  };

  const handleChangeHiringConditions = (e: any) => {
    handleValue("hiringConditions", e.target.value);
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

  const handleChangeFrequency = (e: any) => {
    handleValue("frequency", e.target.value);
  };

  const handleChangeTerm = (e: any) => {
    handleValue("term", e.target.value);
  };

  const handleClickAddAssistance = () => {
    setAssistanceData(initialDataAssistance);
    setShowModalAssistance(true);
  };

  const handleClickEditAssistance = (assistanceItem: any) => {
    setAssistanceData(assistanceItem);
    setShowModalAssistance(true);
  };

  const handleClickDeleteAssistance = (assistanceItem: any) => {
    setProduct({
      ...product,
      assistances: [
        ...product.assistances.filter(
          (item: any) => item.id !== assistanceItem.id
        ),
      ],
    });
  };

  useEffect(() => {
    setEnableSave(
      product.family_id !== "" &&
        product.name !== "" &&
        product.beneficiaries.toString() !== "" &&
        // product.cost > 0 &&
        // product.price.company > 0 &&
        // product.price.customer > 0 &&
        // product.frequency !== "" &&
        product.term > 0
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
        <ContentCell gap="5px">
          <ContentRow gap="5px">
            <ComboBox
              id="txtProductFamily"
              label="Familia"
              width="310px"
              value={product.family_id}
              onChange={handleChangeFamily}
              placeHolder=":: Seleccione familia ::"
              data={families}
              dataValue="id"
              dataText="name"
            />
            <InputText
              id="txtProductName"
              label="Nombre"
              width="638px"
              value={product.name}
              onChange={handleChangeName}
              onBlur={handleChangeName}
            />
          </ContentRow>
          <ContentRow gap="5px">
            <InputText
              id="txtTitle"
              label="Título"
              width="310px"
              value={product.title}
              onChange={handleChangeTitle}
            />
            <InputText
              id="txtSubTitle"
              label="Sub título"
              width="333px"
              value={product.subTitle}
              onChange={handleChangeSubTitle}
            />
            <InputText
              id="txtAlias"
              label="Alianza"
              width="300px"
              value={product.alias}
              onChange={handleChangeAlias}
            />
          </ContentRow>
          <TextArea
            id="txtName"
            label="Descripción Promocional"
            width="953px"
            height="70px"
            value={product.promotional}
            onChange={handleChangePromotional}
          />
          <TextArea
            id="txtName"
            label="Descripción Formal"
            width="953px"
            height="150px"
            value={product.description}
            onChange={handleChangeDescription}
          />
          <ContentRow gap="5px">
            <TextArea
              id="txtName"
              label="Ambito regional"
              width="100%"
              height="200px"
              value={product.territorialScope}
              onChange={handleChangeTerritorialScope}
            />
            <TextArea
              id="txtName"
              label="Condiciones de contratación"
              width="100%"
              height="200px"
              value={product.hiringConditions}
              onChange={handleChangeHiringConditions}
            />
          </ContentRow>
        </ContentCell>
        <ContentCell gap="5px">
          <ContentRow gap="5px" align="space-between">
            <ContentRow gap="5px">
              <InputText
                id="txtProductBeneficiaries"
                label="N° Cargas máximo"
                width="200px"
                value={product.beneficiaries.toString()}
                onChange={handleChangeBeneficiaries}
                onBlur={handleChangeBeneficiaries}
              />
              <InputText
                id="txtProductBeneficiaries"
                label="N° mínimo beneficiarios"
                width="200px"
                value={product.minInsuredCompanyPrice.toString()}
                onChange={handleChangeMinInsuredCompanyPrice}
                onBlur={handleChangeMinInsuredCompanyPrice}
              />
            </ContentRow>
            <ContentRow gap="20px">
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
                width="90px"
                value={product.isSubject}
                onChange={handleCheckSubject}
              />
            </ContentRow>
          </ContentRow>
          <ContentRow gap="5px" align="space-between">
            <ComboBox
              id="txtProductFrecuency"
              label="Frecuencia"
              width="405px"
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
              width="200px"
              value={product.dueDay.toString()}
              onChange={handleChangeDueDay}
              onBlur={handleChangeDueDay}
            />
            <ComboBox
              id="txtProductTerm"
              label="Duración (meses)"
              width="310px"
              value={product.term.toString()}
              onChange={handleChangeTerm}
              placeHolder=":: Seleccione duración ::"
              data={termList}
              dataValue="id"
              dataText="name"
            />
          </ContentRow>
        </ContentCell>
        <ContentCell gap="5px">
          <Table width="953px" height="347px">
            <TableHeader>
              <TableCell width="350px">Servicio</TableCell>
              <TableCell width="100px">Monto</TableCell>
              <TableCell width="240px">Límite</TableCell>
              <TableCell width="85px">Eventos</TableCell>
              <TableCell width="85px">Carencia</TableCell>
              <TableCell width="70px"></TableCell>
              <TableCellEnd />
            </TableHeader>
            <TableDetail>
              {product.assistances.map((item: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell width="350px">{item.name}</TableCell>
                  <TableCell width="100px" align="center">
                    {formatAmount(item.amount, item.currency)}
                  </TableCell>
                  <TableCell width="240px" align="center">
                    {item.maximum}
                  </TableCell>
                  <TableCell width="85px" align="center">
                    {item.events === 0 ? "Ilimitado" : item.events}
                  </TableCell>
                  <TableCell width="85px" align="center">
                    {item.lack}
                  </TableCell>
                  <TableCell width="68px" align="center">
                    <TableIcons>
                      <Icon
                        iconName="edit"
                        onClick={() =>
                          handleClickEditAssistance({
                            line_order: idx + 1,
                            ...item,
                          })
                        }
                      />
                      <Icon
                        iconName="delete"
                        onClick={() => handleClickDeleteAssistance(item)}
                      />
                    </TableIcons>
                  </TableCell>
                </TableRow>
              ))}
            </TableDetail>
          </Table>
          <ContentRow gap="10px" align="space-between">
            <ContentCellSummary>{`${product.assistances.length} servicios`}</ContentCellSummary>
            <ButtonIcon
              iconName="add"
              color="gray"
              onClick={handleClickAddAssistance}
            />
          </ContentRow>
        </ContentCell>
      </ContentCell>
      <ModalWindow
        showModal={showModalAssistance}
        setClosed={() => setShowModalAssistance(false)}
        title="Asistencia">
        <ProductAssistance
          assistanceData={assistanceData}
          setAssistanceData={setAssistanceData}
          setShowModalAssistance={setShowModalAssistance}
        />
      </ModalWindow>
      {productLoading ? (
        <LoadingMessage showModal={productLoading} />
      ) : (
        isSaving && (
          <SuccessMessage showModal={!productLoading} callback={() => {}}>
            Producto registrado correctamente
          </SuccessMessage>
        )
      )}
    </Fragment>
  );
};

export default ProductDetail;
