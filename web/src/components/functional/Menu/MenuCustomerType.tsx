import Wizard, { Title, Content } from "../../layout/Wizard";

import Navigate, { Back } from "../../ui/Navigate";
import Icon from "../../ui/Icon";
import { MenuButtons, MenuItem } from "../../ui/MenuButtons";

import { useProduct } from "../../../redux/hooks";

const MenuCustomerType = ({ handleClickBack, handleClickOption }: any) => {
  const { product } = useProduct();

  return (
    <Wizard>
      <Title>
        <Navigate>
          <Back onClick={handleClickBack} />
        </Navigate>
        {product.name}
        <div></div>
      </Title>
      <Content>
        <MenuButtons>
          <MenuItem key={1} onClick={() => handleClickOption("customer")}>
            <Icon iconName="accessibility_new" />
            Para mi
          </MenuItem>
          <MenuItem key={2} onClick={() => handleClickOption("company")}>
            <Icon iconName="apartment" />
            Para mi empresa
          </MenuItem>
        </MenuButtons>
      </Content>
    </Wizard>
  );
};

export default MenuCustomerType;
