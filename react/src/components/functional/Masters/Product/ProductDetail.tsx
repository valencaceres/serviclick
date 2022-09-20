import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  MasterDetail,
  Title,
  Left,
  Center,
  Right,
  Detail,
  Buttons,
} from "../../../layout/MasterDetail";
import {
  Component,
  Row,
  Cell,
  CellSeparator,
  CellAlign,
} from "../../../layout/Generic";

import Navigate, { Home, Back } from "../../../ui/Navigate";
import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import CheckBox from "../../../ui/CheckBox";
import Button from "../../../ui/Button";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
} from "../../../ui/Table";
import Icon, { icons } from "../../../ui/Icon";
import { Modal, Window } from "../../../ui/Modal";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  CoverageT,
  resetProduct,
  setProduct,
  getProduct,
} from "../../../../redux/slices/productSlice";
import {
  listFamilies,
  getFamily,
  resetFamily,
} from "../../../../redux/slices/familySlice";

import { genetateUUID } from "../../../../utils/functions";

import { frecuencyList, termList } from "../../../../data/masters";

type FamilyValuesDetailT = {
  id: string;
  name: string;
  isChecked: boolean;
};

const ProductDetail = ({
  saveProduct,
  isLoadingSave,
  setIsLoadingSave,
}: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const coverageInitialState = {
    id: "",
    name: "",
    amount: "",
    maximum: "",
    lack: "",
    events: "",
  };

  const { list: familyList, family } = useAppSelector(
    (state) => state.familySlice
  );

  const { product } = useAppSelector((state) => state.productSlice);

  const [coverage, setCoverage] = useState<CoverageT>(coverageInitialState);
  const [familyValues, setFamilyValues] = useState<FamilyValuesDetailT[]>([]);

  const [isCompleteCoverageItem, setIsCompleteCoverageItem] = useState(false);
  const [isCompleteProduct, setIsCompleteProduct] = useState(false);

  const [showModalCoverage, setShowModalCoverage] = useState(false);
  const [showModalFamilyValues, setShowModalFamilyValues] = useState(false);

  const clearValues = () => {
    setCoverage(coverageInitialState);
    dispatch(resetProduct());
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
          };
        } else {
          return item;
        }
      });
    } else {
      coverages = [
        ...product.coverages,
        {
          id: genetateUUID(),
          name: coverage.name,
          amount: coverage.amount,
          maximum: coverage.maximum,
          lack: coverage.lack,
          events: coverage.events,
        },
      ];
    }

    handleValue("coverages", coverages);
    setShowModalCoverage(false);
  };

  const deleteCoverage = (coverageToDelete: CoverageT) => {
    handleValue(
      "coverages",
      product.coverages.filter(
        (item) =>
          item.name.toLowerCase() !== coverageToDelete.name.toLowerCase()
      )
    );
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
    dispatch(setProduct(state));
  };

  const handleChangeFamily = (e: any) => {
    handleValue("family_id", e.target.value);
    dispatch(e.target.value === "" ? resetFamily() : getFamily(e.target.value));
  };

  const handleChangeName = (e: any) => {
    handleValue("name", e.target.value);
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

  const handleChangebeneficiaries = (e: any) => {
    handleValue("beneficiaries", e.target.value);
  };

  const handleAddCoverage = () => {
    setIsCompleteCoverageItem(false);
    setCoverage(coverageInitialState);
    setShowModalCoverage(true);
  };

  const handleEditCoverage = (coverageToEdit: CoverageT) => {
    setCoverage(coverageToEdit);
    setShowModalCoverage(true);
  };

  const handleAddFamilyValues = () => {
    setShowModalFamilyValues(true);
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

  const handleClickBack = () => {
    navigate("/masters/products");
  };

  const setClosedModalCoverage = () => {
    setShowModalCoverage(false);
  };

  const setClosedModalFamilyValues = () => {
    setShowModalFamilyValues(false);
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

  const checkProductComplete = () => {
    return (
      product.family_id !== "" &&
      product.name !== "" &&
      product.cost > 0 &&
      product.price.customer > 0 &&
      product.price.company > 0 &&
      product.frequency !== "" &&
      product.term !== "" &&
      product.coverages.length > 0 &&
      product.familyValues.length > 0
    );
  };

  const handleClickSave = () => {
    setIsLoadingSave(true);
    saveProduct();
  };

  useEffect(() => {
    dispatch(listFamilies());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
  }, [id]);

  useEffect(() => {
    setFamilyValues(
      family.values.map((item: FamilyValuesDetailT) => ({
        id: item.id,
        name: item.name,
        isChecked: false,
      }))
    );
    dispatch(setProduct({ ...product, familyValues: [] }));
  }, [family]);

  useEffect(() => {
    setIsCompleteCoverageItem(checkCoverageItemComplete());
  }, [coverage]);

  useEffect(() => {
    setIsCompleteProduct(checkProductComplete());
  }, [product]);

  return (
    <Fragment>
      <MasterDetail>
        <Title>
          <Left>
            <Navigate>
              <Home />
              <Back onClick={handleClickBack} />
            </Navigate>
          </Left>
          <Center>Producto</Center>
          <Right></Right>
        </Title>
        <Detail>
          <Component>
            <Row>
              <Cell>
                <Row>
                  <Cell>
                    <ComboBox
                      id="txtProductFamily"
                      label="Familia"
                      width="310px"
                      value={product.family_id}
                      onChange={handleChangeFamily}
                      placeHolder=":: Seleccione familia ::"
                      data={familyList}
                      dataValue="id"
                      dataText="name"
                    />
                  </Cell>
                  <Cell>
                    <InputText
                      id="txtProductBeneficiaries"
                      label="Cargas"
                      width="100px"
                      value={product.beneficiaries}
                      onChange={handleChangebeneficiaries}
                      onBlur={handleChangebeneficiaries}
                    />
                  </Cell>
                </Row>
                <InputText
                  id="txtProductName"
                  label="Nombre"
                  width="415px"
                  value={product.name}
                  onChange={handleChangeName}
                  onBlur={handleChangeName}
                />
              </Cell>
              <CellSeparator></CellSeparator>
              <Cell>
                <Row>
                  <Cell>
                    <InputText
                      id="txtProductCost"
                      type="number"
                      label="Costo técnico ($)"
                      width="200px"
                      value={product.cost}
                      onChange={handleChangeCost}
                      onBlur={handleChangeCost}
                    />
                    <CheckBox
                      label="Afecto"
                      width="200px"
                      value={product.isSubject}
                      onChange={handleCheckSubject}
                    />
                  </Cell>
                  <Cell>
                    <InputText
                      id="txtProductPublicPrice"
                      type="number"
                      label="Valor al público ($)"
                      width="200px"
                      value={product.price.customer}
                      onChange={handleChangePricePublic}
                      onBlur={handleChangePricePublic}
                    />
                    <InputText
                      id="txtProductCompanyPrice"
                      type="number"
                      label="Valor empresa ($)"
                      width="200px"
                      value={product.price.company}
                      onChange={handleChangePriceCompany}
                      onBlur={handleChangePriceCompany}
                    />
                  </Cell>
                  <CellSeparator />
                  <Cell>
                    <ComboBox
                      id="txtProductFrecuency"
                      label="Frecuencia"
                      width="300px"
                      value={product.frequency}
                      onChange={handleChangeFrequency}
                      placeHolder=":: Seleccione frecuencia ::"
                      data={frecuencyList}
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
                      data={termList}
                      dataValue="id"
                      dataText="name"
                    />
                  </Cell>
                </Row>
              </Cell>
            </Row>
            <Row>
              <CellSeparator></CellSeparator>
            </Row>
            <Row>
              <Cell>
                <Table width="940px" height="214px">
                  <TableHeader>
                    <TableCell width="270px">Servicio</TableCell>
                    <TableCell width="160px">Monto</TableCell>
                    <TableCell width="250px">Límite</TableCell>
                    <TableCell width="70px" alt="Inicio de vigencia en díasx">
                      Inicio
                    </TableCell>
                    <TableCell width="176px">Eventos</TableCell>
                  </TableHeader>
                  <TableDetail>
                    {product.coverages.map((coverageItem: any, idx: number) => (
                      <TableRow key={idx}>
                        <TableCell width="270px">{coverageItem.name}</TableCell>
                        <TableCell width="160px">
                          {coverageItem.amount}
                        </TableCell>
                        <TableCell width="250px">
                          {coverageItem.maximum}
                        </TableCell>
                        <TableCell width="70px">{coverageItem.lack}</TableCell>
                        <TableCell width="170px">
                          {coverageItem.events}
                          <TableIcons>
                            <Icon
                              iconName={icons.faPen}
                              onClick={() => handleEditCoverage(coverageItem)}
                            />
                            <Icon
                              iconName={icons.faTrashAlt}
                              onClick={() => {
                                deleteCoverage(coverageItem);
                              }}
                            />
                          </TableIcons>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableDetail>
                </Table>
                <CellAlign align="right">
                  <Button
                    type="sub"
                    text="Agregar"
                    icon="plus"
                    onClick={handleAddCoverage}
                    width="150px"
                  />
                </CellAlign>
              </Cell>
              <CellSeparator></CellSeparator>
              <Cell>
                <Table width="300px" height="214px">
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
                <CellAlign align="right">
                  <Button
                    type="sub"
                    text="Asignar"
                    icon="pen"
                    onClick={handleAddFamilyValues}
                    width="150px"
                    enabled={family.id}
                  />
                </CellAlign>
              </Cell>
            </Row>
          </Component>
        </Detail>
        <Buttons>
          <Button text="Nuevo" width="200px" onClick={clearValues} />
          <Button
            text="Registrar"
            width="200px"
            onClick={handleClickSave}
            enabled={isCompleteProduct}
            loading={isLoadingSave}
          />
        </Buttons>
      </MasterDetail>
      <Modal showModal={showModalCoverage}>
        <Window title="Servicio" setClosed={setClosedModalCoverage}>
          <Component>
            <Row>
              <Cell>
                <InputText
                  id="txtProductCoverageName"
                  label="Servicio"
                  width="445px"
                  value={coverage.name}
                  onChange={(e: any) =>
                    setCoverage({ ...coverage, name: e.target.value })
                  }
                />
                <Row>
                  <Cell>
                    <InputText
                      id="txtProductCoverageAmount"
                      label="Monto"
                      width="220px"
                      value={coverage.amount}
                      onChange={(e: any) =>
                        setCoverage({ ...coverage, amount: e.target.value })
                      }
                      onClick={() =>
                        setCoverage({ ...coverage, amount: "Ilimitado" })
                      }
                      icon="infinity"
                    />
                  </Cell>
                  <Cell>
                    <InputText
                      id="txtProductCoverageMaximum"
                      label="Límite"
                      width="220px"
                      value={coverage.maximum}
                      onChange={(e: any) =>
                        setCoverage({ ...coverage, maximum: e.target.value })
                      }
                      onClick={() =>
                        setCoverage({ ...coverage, maximum: "Ilimitado" })
                      }
                      icon="infinity"
                    />
                  </Cell>
                </Row>
                <Row>
                  <Cell>
                    <InputText
                      id="txtProductCoverageLack"
                      label="Inicio vigencia (días)"
                      width="220px"
                      value={coverage.lack}
                      onChange={(e: any) =>
                        setCoverage({ ...coverage, lack: e.target.value })
                      }
                      onClick={() =>
                        setCoverage({ ...coverage, lack: "Ilimitado" })
                      }
                      icon="infinity"
                    />
                  </Cell>
                  <Cell>
                    <InputText
                      id="txtProductCoverageEvents"
                      label="Eventos (cantidad)"
                      width="220px"
                      value={coverage.events}
                      onChange={(e: any) =>
                        setCoverage({ ...coverage, events: e.target.value })
                      }
                      onClick={() =>
                        setCoverage({ ...coverage, events: "Ilimitado" })
                      }
                      icon="infinity"
                    />
                  </Cell>
                </Row>
              </Cell>
            </Row>
            <Row>
              <CellSeparator />
            </Row>
            <Row>
              <Cell>
                <Button
                  text="Registrar"
                  width="200px"
                  onClick={saveCoverage}
                  enabled={isCompleteCoverageItem}
                />
              </Cell>
            </Row>
          </Component>
        </Window>
      </Modal>
      <Modal showModal={showModalFamilyValues}>
        <Window title="Campos" setClosed={setClosedModalFamilyValues}>
          <Component>
            <Row>
              <Cell>
                {familyValues.map((value, idx: number) => (
                  <CheckBox
                    key={idx}
                    label={value.name}
                    width="auto"
                    value={value.isChecked}
                    onChange={() => handleCheckFamilyValue(value.id)}
                  />
                ))}
              </Cell>
            </Row>
            <Row>
              <Cell>
                <CellSeparator />
              </Cell>
            </Row>
            <Row>
              <Cell>
                <Button
                  text="Registrar"
                  width="200px"
                  onClick={saveFamilyValues}
                />
              </Cell>
            </Row>
          </Component>
        </Window>
      </Modal>
    </Fragment>
  );
};

export default ProductDetail;
