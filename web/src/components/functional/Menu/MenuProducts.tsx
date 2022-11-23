import HeadPages from "../../layout/HeadPages";
import Wizard, { Title, Content, Buttons } from "../../layout/Wizard";

import Navigate, { Back } from "../../ui/Navigate";
import { MenuButtons, MenuItem } from "../../ui/MenuButtons";

import { useFamily, useProduct } from "../../../redux/hooks";

const MenuProducts = ({ handleClickBack, handleClickOption }: any) => {
  const { productList } = useProduct();
  const { family } = useFamily();

  return (
    <Wizard>
      <HeadPages title="Producto" description="Selección de producto" />
      <Title>
        <Navigate>
          <Back onClick={handleClickBack} />
        </Navigate>
        {family.name}
        <div></div>
      </Title>
      <Content>
        <MenuButtons>
          {productList.map((product: any, idx: number) => (
            <MenuItem key={idx} onClick={() => handleClickOption(product.id)}>
              {product.name}
            </MenuItem>
          ))}
        </MenuButtons>
      </Content>
    </Wizard>
  );
};

export default MenuProducts;
