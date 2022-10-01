import type { NextPage } from "next";
import { useEffect } from "react";
import Icon from "../components/ui/Icon";

import { useFamily } from "../redux/hooks";

import { MenuButtons, MenuItem } from "../components/ui/MenuButtons";

const Home: NextPage = () => {
  const { listAll, list } = useFamily();

  useEffect(() => {
    listAll();
  }, []);

  return (
    <MenuButtons>
      {list.map((family: any, idx: number) => (
        <MenuItem key={idx}>
          <Icon iconName={family.icon} />
          {family.name}
        </MenuItem>
      ))}
    </MenuButtons>
  );
};

export default Home;
