import { useState } from "react";

import { useAppSelector } from "../../../../redux/hooks";

import { Content, ContentCell, ContentRow } from "../../../layout/Content";

import InputText from "../../../ui/InputText";
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

const ProductList = ({ addProduct, editProduct, deleteProduct }: any) => {
  const { list } = useAppSelector((state) => state.productSlice);

  const [search, setSearch] = useState("");

  return (
    <ContentCell gap="10px">
      <ContentRow gap="10px" align="center">
        <InputText
          label="Texto a buscar"
          width="700px"
          value={search}
          onChange={setSearch}
        />
        <ButtonIcon iconName="search" />
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
      <div>{`${list.length} registros`}</div>
      <ButtonIcon iconName="add" onClick={addProduct} />
    </ContentCell>
  );
};

export default ProductList;
