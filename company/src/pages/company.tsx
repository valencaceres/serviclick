import { useState, Fragment } from "react";
import { useRouter } from "next/router";

import Wizard, { Title, Content, Buttons } from "../components/layout/Wizard";

import Button from "../components/ui/Button";
import Tooltip from "../components/ui/Tooltip";
import Navigate, { Back } from "../components/ui/Navigate";

// 2464277
import Company from "../components/functional/Company";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateCompany } from "../redux/slices/companySlice";
import { setUserCompany, getByEmail } from "../redux/slices/userCompanySlice";

const CompanyPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { company } = useAppSelector((state) => state.companySlice);
  const { userCompany } = useAppSelector((state) => state.userCompanySlice);

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
      companyName,
      legalRepresentative,
      line,
      address,
      district,
      email,
      phone,
    } = company;

    setIsLoading(true);

    dispatch(
      updateCompany(
        id,
        rut,
        companyName,
        legalRepresentative,
        line,
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
          Mis datos
          <div></div>
        </Title>
        <Content>
          <Company setIsEnabled={setIsEnabled} />
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
          Mediante esta opción podrás modificar tus datos en caso que lo
          requieras.
          <br />
          <br />
          <b>Nota:</b>&nbsp;No podrás modificar tu rut ni tu correo ya que con
          ellos podemos identificarte.
        </div>
      </Tooltip>
    </Fragment>
  );
};

export default CompanyPage;
