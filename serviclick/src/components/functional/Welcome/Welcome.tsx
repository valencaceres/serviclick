import { Content, ContentCell, ContentRow } from "../../layout/Content";

import useUI from "../../../hooks/useUI";

const Welcome = () => {
  const { user } = useUI();

  return (
    <Content align="center">
      Bienvenido {user.name} {user.paternalLastName} {user.maternalLastName}
    </Content>
  );
};

export default Welcome;
