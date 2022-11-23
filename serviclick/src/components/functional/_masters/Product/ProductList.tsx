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

const ProductList = ({ editProduct, deleteProduct }: any) => {
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

  const handleClickDelete = (product: any) => {
    setProduct(product);
    setShowWarningDelete(true);
  };

  const handleClickDeleteOK = (product_id: string) => {
    deleteProduct(product_id);
    setShowWarningDelete(false);
  };

  const setClosedWarningDelete = () => {
    setShowWarningDelete(false);
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
            width="590px"
            value={search.searchText.value}
            onChange={handleChangeSearchText}
          />
          <ButtonIcon
            iconName="search"
            color="gray"
            onClick={handleClickSearch}
          />
        </ContentRow>
        <Table width="941px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="260px">Familia</TableCell>
            <TableCell width="350px">Nombre</TableCell>
            <TableCell width="90px">Día pago</TableCell>
            <TableCell width="80px">Afecto</TableCell>
            <TableCell width="68px"></TableCell>
            <TableCellEnd />
          </TableHeader>
          <TableDetail>
            {productList.map((product: any, idx: number) => (
              <TableRow key={idx} className={"deleted"}>
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
                <TableCell width="68px" align="center">
                  <TableIcons>
                    <Icon
                      iconName="edit"
                      onClick={() => editProduct(product.id)}
                    />
                    <Icon
                      iconName="delete"
                      onClick={() => handleClickDelete(product)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
        <ContentRow align="flex-end">
          <ContentCellSummary>{`${productList.length} productos`}</ContentCellSummary>
        </ContentRow>
      </ContentCell>
      <ModalWarning
        showModal={showWarningDelete}
        title="Eliminación de producto"
        message={`Está seguro de eliminar el producto ${product.name}`}
        setClosed={setClosedWarningDelete}
        iconName="warning"
        buttons={[
          { text: "No", function: setClosedWarningDelete },
          { text: "Si", function: () => handleClickDeleteOK(product.id) },
        ]}
      />
    </Fragment>
  );
};

export default ProductList;
