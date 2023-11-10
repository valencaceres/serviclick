import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Payment from "../../../components/functional/_payment";
import ButtonIcon from "../../../components/ui/ButtonIcon";
import FloatMenu from "../../../components/ui/FloatMenu";

import { useUI, useLead } from "../../../hooks";

const SalePaymentCompanyPage = () => {
  const router = useRouter();

  const { setTitleUI, customerType } = useUI();
  const { createLead, lead } = useLead();

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    if (customerType === "C") {
      router.push("/sale/insured/company");
      return;
    }
  };

  const handleClickRegister = () => {
    setIsSaving(true);
    createLead(lead, false, false);
  };

  useEffect(() => {
    setTitleUI("Datos de la venta");
  }, []);

  return (
    <Fragment>
      <Payment
        setIsButtonEnabled={setIsButtonEnabled}
        isSaving={isSaving}
        setIsSaving={setIsSaving}
      />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon
          iconName="save"
          onClick={handleClickRegister}
          disabled={!isButtonEnabled}
        />
      </FloatMenu>
    </Fragment>
  );
};

export default SalePaymentCompanyPage;
