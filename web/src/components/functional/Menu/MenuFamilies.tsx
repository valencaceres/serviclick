import Wizard, { Title, Content } from "../../layout/Wizard";

import Icon from "../../ui/Icon";
import { MenuButtons, MenuItem } from "../../ui/MenuButtons";

import { useFamily } from "../../../redux/hooks";

const MenuFamilies = () => {
  const { list, set } = useFamily();

  return (
    <Wizard>
      <Title>Familias</Title>
      <Content>
        <MenuButtons>
          {list.map((family: any, idx: number) => (
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
