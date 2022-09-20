import { useRouter } from "next/router";

import Wizard, {
  Title,
  Description,
  Content,
  Buttons,
} from "../../../layout/Wizard";

import Button from "../../../ui/Button";

const Resume = ({ register }: any) => {
  const router = useRouter();

  return (
    <Wizard>
      <Title>Resumen de tu compra</Title>
      <Content></Content>
      <Buttons>
        <Button onClick={register} text="Volver" width="200px" />
      </Buttons>
    </Wizard>
  );
};

export default Resume;
