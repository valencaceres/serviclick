import { useState, useEffect } from "react";

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

const ProductList = ({ addProduct, editProduct, deleteProduct }: any) => {
  const { listAll, list, getByFamilyId } = useProduct();
  const { list: listFamilies } = useFamily();

  const initialSearchForm = {
    family: { value: "", isValid: true },
    searchText: { value: "", isValid: true },
  };

  const [search, setSearch] = useState(initialSearchForm);

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
    search.family.value !== "" ? getByFamilyId(search.family.value) : listAll();
  };

  return (
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
          {list.map((product: any, idx: number) => (
            <TableRow key={idx} className={"deleted"}>
              <TableCell width="70px" align="center">
                {idx + 1}
              </TableCell>
              <TableCell width="260px">{product.family_name}</TableCell>
              <TableCell width="350px">{product.name}</TableCell>
              <TableCell width="120px" align="flex-end">
                {product.customerprice}
              </TableCell>
              <TableCell width="180px" align="flex-end">
                {product.companyprice}
                <TableIcons>
                  <Icon
                    iconName="edit"
                    onClick={() => editProduct(product.id)}
                  />
                  <Icon
                    iconName="delete"
                    onClick={() => deleteProduct(product.id)}
                  />
                </TableIcons>
              </TableCell>
            </TableRow>
          ))}
        </TableDetail>
      </Table>
      <ContentRow align="flex-end">
        <ContentCellSummary>{`${list.length} registros`}</ContentCellSummary>
      </ContentRow>
    </ContentCell>
  );
};

export default ProductList;
