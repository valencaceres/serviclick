import { useState, Fragment } from "react";
import { useRouter } from "next/router";

import Wizard, { Title, Content, Buttons } from "../components/layout/Wizard";

import Tooltip from "../components/ui/Tooltip";
import Navigate, { Back } from "../components/ui/Navigate";
import Button from "../components/ui/Button";

import Beneficiary from "../components/functional/Beneficiary";

import { addBeneficiaries } from "../redux/slices/leadSlice";
import { getByEmail } from "../redux/slices/userInsuredSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

const Insured = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { userInsured, session } = useAppSelector(
    (state) => state.userInsuredSlice
  );
  const { isLoading } = useAppSelector((state) => state.leadSlice);

  const [showTooltip, setShowTooltip] = useState(true);

  const handleClickBack = () => {
    router.push("/");
  };

  const handleCloseTooltip = () => {
    setShowTooltip(false);
  };

  const handleClickRegister = () => {
    dispatch(
      addBeneficiaries(session.lead_id, userInsured.id, session.beneficiaries)
    );
  };

  return (
    <Fragment>
      <Wizard>
        <Title>
          <Navigate>
            <Back onClick={handleClickBack} />
          </Navigate>
          Beneficiarios
          <div></div>
        </Title>
        <Content>
          <Beneficiary setShowTooltip={setShowTooltip} />
        </Content>
        <Buttons>
          <Button
            onClick={handleClickRegister}
            text="Registrar"
            width="150px"
            enabled={session.beneficiaries.length > 0}
            loading={isLoading}
          />
        </Buttons>
      </Wizard>
      <Tooltip isShow={showTooltip} onClose={handleCloseTooltip}>
        <div>
          Mediante esta opción podrás completar la información de tus
          beneficiarios, para los productos contratados.
        </div>
      </Tooltip>
    </Fragment>
  );
};

export default Insured;
