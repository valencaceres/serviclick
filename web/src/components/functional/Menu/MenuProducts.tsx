import Wizard, { Title, Content, Buttons } from "../../layout/Wizard";

import Navigate, { Back } from "../../ui/Navigate";
import { MenuButtons, MenuItem } from "../../ui/MenuButtons";

import { useUI, useFamily, useProduct } from "../../../redux/hooks";

const MenuProducts = ({ handleClickBack, handleClickOption }: any) => {
  const { agentId } = useUI();
  const { productList, getProductById } = useProduct();
  const { family } = useFamily();

  return (
    <Wizard>
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
            <MenuItem
              key={idx}
              onClick={() => getProductById(product.id, agentId)}>
              {product.name}
            </MenuItem>
          ))}
        </MenuButtons>
      </Content>
    </Wizard>
  );
};

export default MenuProducts;
