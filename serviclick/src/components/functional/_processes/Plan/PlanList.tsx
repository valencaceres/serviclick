import { useState, Fragment } from "react";

import {
  ContentCell,
  ContentRow,
  ContentCellSummary,
} from "../../../layout/Content";

import InputText from "../../../ui/InputText";
import ComboBox from "../../../ui/ComboBox";
import ButtonIcon from "../../../ui/ButtonIcon";
import {
  Table,
  TableHeader,
  TableDetail,
  TableRow,
  TableCell,
  TableIcons,
} from "../../../ui/Table";
import Icon from "../../../ui/Icon";

import { useFamily, useProduct } from "../../../../hooks";

const PlanList = ({ editPlan }: any) => {
  const {
    getAllProducts,
    productList,
    getProductByFamilyId,
    setProduct,
    product,
  } = useProduct();
  const { list: listFamilies } = useFamily();

  const initialSearchForm = {
    family: { value: "", isValid: true },
    searchText: { value: "", isValid: true },
  };

  const [search, setSearch] = useState(initialSearchForm);
  const [showWarningDelete, setShowWarningDelete] = useState(false);

  const handleChangeFamily = (e: any) => {
    setSearch({
      ...search,
      family: { value: e.target.value, isValid: true },
    });
  };

  const handleChangeSearchText = (e: any) => {
    setSearch({
      ...search,
      searchText: { value: e.target.value, isValid: true },
    });
  };

  const handleClickSearch = () => {
    search.family.value !== ""
      ? getProductByFamilyId(
          search.family.value,
          "020579a3-8461-45ec-994b-ad22ff8e3275"
        )
      : getAllProducts("020579a3-8461-45ec-994b-ad22ff8e3275");
  };

  return (
    <Fragment>
      <ContentCell gap="10px">
        <ContentRow gap="10px" align="center">
          <ComboBox
            label="Familia"
            width="300px"
            value={search.family.value}
            onChange={handleChangeFamily}
            placeHolder=":: Seleccione familia ::"
            data={listFamilies}
            dataValue="id"
            dataText="name"
          />
          <InputText
            label="Texto a buscar"
            width="640px"
            value={search.searchText.value}
            onChange={handleChangeSearchText}
          />
          <ButtonIcon
            iconName="search"
            color="gray"
            onClick={handleClickSearch}
          />
        </ContentRow>
        <Table width="1000px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="260px">Familia</TableCell>
            <TableCell width="350px">Nombre</TableCell>
            <TableCell width="120px">Público</TableCell>
            <TableCell width="186px">Empresa</TableCell>
          </TableHeader>
          <TableDetail>
            {productList.map((product: any, idx: number) => (
              <TableRow key={idx} className={"deleted"}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="260px">{product.family_name}</TableCell>
                <TableCell width="350px">{product.name}</TableCell>
                <TableCell width="120px" align="flex-end">
                  {product.planPrice.customer}
                </TableCell>
                <TableCell width="110px" align="flex-end">
                  {product.planPrice.company}
                </TableCell>
                <TableCell width="68px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="edit"
                      onClick={() => editPlan(product.id)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-end">
          <ContentCellSummary>{`${productList.length} registros`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
    </Fragment>
  );
};

export default PlanList;
