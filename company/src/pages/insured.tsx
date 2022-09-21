import { useState, Fragment } from "react";
import { useRouter } from "next/router";

import Wizard, { Title, Content, Buttons } from "../components/layout/Wizard";

import Button from "../components/ui/Button";
import Tooltip from "../components/ui/Tooltip";
import Navigate, { Back } from "../components/ui/Navigate";

// 2464277
import Insured from "../components/functional/Insured";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateInsured } from "../redux/slices/insuredSlice";
import { setUserInsured, getByEmail } from "../redux/slices/userInsuredSlice";

const InsuredPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { insured } = useAppSelector((state) => state.insuredSlice);
  const { userInsured } = useAppSelector((state) => state.userInsuredSlice);

  const [showTooltip, setShowTooltip] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleClickBack = () => {
    router.push("/");
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  const handleClickRegister = () => {
    const {
      id,
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone,
    } = insured;

    setIsLoading(true);

    dispatch(
      updateInsured(
        id,
        rut,
        name,
        paternalLastName,
        maternalLastName,
        address,
        district,
        email,
        phone
      )
    );

    dispatch(getByEmail(email));

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Fragment>
      <Wizard>
        <Title>
          <Navigate>
            <Back onClick={handleClickBack} />
          </Navigate>
          Asegurados
          <div></div>
        </Title>
        <Content>
          <Insured setShowTooltip={setShowTooltip} />
        </Content>
        <Buttons>
          <Button
            onClick={handleClickRegister}
            text="Registrar"
            width="150px"
            loading={isLoading}
            enabled={isEnabled}
          />
        </Buttons>
      </Wizard>
      <Tooltip isShow={showTooltip} onClose={handleCloseTooltip}>
        <div>
          Mediante esta opción podrás revisar la información de tus asegurados,
          darlos de baja o agregar uno nuevo.
        </div>
      </Tooltip>
    </Fragment>
  );
};

export default InsuredPage;
