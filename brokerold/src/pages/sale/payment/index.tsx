import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import Payment from "../../../components/functional/_payment";
import ButtonIcon from "../../../components/ui/ButtonIcon";
import FloatMenu from "../../../components/ui/FloatMenu";

import { useUI, useProduct } from "../../../hooks";
import ModalWindow from "../../../components/ui/ModalWindow";

const SalePaymentCompanyPage = () => {
  const router = useRouter();

  const { setTitleUI, customerType } = useUI();
  const { product } = useProduct();

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showModalPaymentType, setShowModalPaymentType] = useState(false);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    if (customerType === "C") {
      router.push("/sale/insured/company");
      return;
    }

    if (customerType === "P") {
      if (product.beneficiaries > 0) {
        router.push("/sale/beneficiaries/customer");
        return;
      } else {
        router.push("/sale/contract/customer");
        return;
      }
    }
  };

  const handleClickRegister = () => {
    setShowModalPaymentType(true);
  };

  useEffect(() => {
    setTitleUI("Datos de la venta");
  }, []);

  return (
    <Fragment>
      <Payment
        setIsButtonEnabled={setIsButtonEnabled}
        showModalPaymentType={showModalPaymentType}
        setShowModalPaymentType={setShowModalPaymentType}
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
