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
  TableCellEnd,
} from "../../../ui/Table";
import Icon from "../../../ui/Icon";
import ModalWarning from "../../../ui/ModalWarning";

import { useProduct } from "../../../../hooks";

const ProductList = ({ editProduct }: any) => {
  const {
    getAllProducts,
    productList,
    getProductByFamilyId,
    setProduct,
    families,
    product,
  } = useProduct();

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
    search.family.value !== ""
      ? getProductByFamilyId(
          search.family.value,
          "020579a3-8461-45ec-994b-ad22ff8e3275"
        )
      : getAllProducts("020579a3-8461-45ec-994b-ad22ff8e3275");
  };

  return (
    <Fragment>
      <ContentCell gap="5px">
        <ContentRow gap="5px" align="center">
          <ComboBox
            label="Familia"
            width="300px"
            value={search.family.value}
            onChange={handleChangeFamily}
            placeHolder=":: Seleccione familia ::"
            data={families}
            dataValue="id"
            dataText="name"
          />
          <InputText
            label="Texto a buscar"
            width="520px"
            value={search.searchText.value}
            onChange={handleChangeSearchText}
          />
          <ButtonIcon
            iconName="search"
            color="gray"
            onClick={handleClickSearch}
          />
        </ContentRow>
        <Table width="871px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="260px">Familia</TableCell>
            <TableCell width="350px">Nombre</TableCell>
            <TableCell width="90px">Día pago</TableCell>
            <TableCell width="80px">Afecto</TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {productList.map((product: any, idx: number) => (
              <TableRow
                key={idx}
                link={true}
                onClick={() => editProduct(product.id)}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="260px">{product.family_name}</TableCell>
                <TableCell width="350px">{product.name}</TableCell>
                <TableCell width="90px" align="center">
                  {product.dueDay === 0 ? "" : product.dueDay}
                </TableCell>
                <TableCell width="80px" align="center">
                  {product.isSubject ? "SI" : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-end">
          <ContentCellSummary>{`${productList.length} productos`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
    </Fragment>
  );
};

export default ProductList;
