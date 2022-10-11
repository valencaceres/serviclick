import Wizard, { Title, Content, Buttons } from "../../layout/Wizard";

import Navigate, { Back } from "../../ui/Navigate";
import { MenuButtons, MenuItem } from "../../ui/MenuButtons";

import { useFamily, useProduct } from "../../../redux/hooks";

const MenuProducts = ({ handleClickBack, handleClickOption }: any) => {
  const { list, getById } = useProduct();
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
          {list.map((product: any, idx: number) => (
            <MenuItem key={idx} onClick={() => getById(product.id)}>
              {product.name}
            </MenuItem>
          ))}
        </MenuButtons>
      </Content>
    </Wizard>
  );
};

export default MenuProducts;
