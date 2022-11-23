import HeadPages from "../../layout/HeadPages";
import Wizard, { Title, Content } from "../../layout/Wizard";

import Icon from "../../ui/Icon";
import { MenuButtons, MenuItem } from "../../ui/MenuButtons";

import { useFamily, useProduct } from "../../../redux/hooks";

const MenuFamilies = () => {
  const { set } = useFamily();
  const { families } = useProduct();

  return (
    <Wizard>
      <HeadPages
        title="Familia"
        description="Selección de familia de producto"
      />
      <Title>Familias</Title>
      <Content>
        <MenuButtons>
          {families.map((family: any, idx: number) => (
            <MenuItem key={idx} onClick={() => set(family)}>
              <Icon iconName={family.icon} />
              {family.name}
            </MenuItem>
          ))}
        </MenuButtons>
      </Content>
    </Wizard>
  );
};

export default MenuFamilies;
