import { useState } from "react";

import { useAppSelector } from "../../../../redux/hooks";

import {
  MasterList,
  Title,
  Search,
  List,
  Buttons,
  Summary,
  Pages,
  Actions,
} from "../../../layout/MasterList";

import InputText from "../../../ui/InputText";
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

const ProductList = ({ addProduct, editProduct, deleteProduct }: any) => {
  const { list } = useAppSelector((state) => state.productSlice);

  const [search, setSearch] = useState("");

  return (
    <MasterList>
      <Title>Productos</Title>
      <Search>
        <InputText
          label="Texto a buscar"
          icon="search"
          width="700px"
          value={search}
          onChange={setSearch}
        />
      </Search>
      <List>
        <Table width="1200px">
          <TableHeader>
            <TableCell width="70px" align="center">
              #
            </TableCell>
            <TableCell width="350px">Familia</TableCell>
            <TableCell width="460px">Nombre</TableCell>
            <TableCell width="120px">Público</TableCell>
            <TableCell width="186px">Empresa</TableCell>
          </TableHeader>
          <TableDetail>
            {list.map((product: any, idx: number) => (
              <TableRow key={idx} className={"deleted"}>
                <TableCell width="70px" align="center">
                  {idx + 1}
                </TableCell>
                <TableCell width="350px">{product.family_name}</TableCell>
                <TableCell width="460px">{product.name}</TableCell>
                <TableCell width="120px">{product.customerprice}</TableCell>
                <TableCell width="180px">
                  {product.companyprice}
                  <TableIcons>
                    <Icon
                      iconName={icons.faPen}
                      onClick={() => editProduct(product.id)}
                    />
                    <Icon
                      iconName={icons.faTrashAlt}
                      onClick={() => deleteProduct(product.id)}
                    />
                  </TableIcons>
                </TableCell>
              </TableRow>
            ))}
          </TableDetail>
        </Table>
      </List>
      <Buttons>
        <Summary>{`${list.length} registros`}</Summary>
        <Pages></Pages>
        <Actions>
          <Button text="" icon="plus" onClick={addProduct} />
        </Actions>
      </Buttons>
    </MasterList>
  );
};

export default ProductList;
