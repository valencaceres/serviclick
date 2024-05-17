import { useRouter } from "next/router";
import React, { useEffect } from "react";

import ContractorPersonForm from "~/components/functional/_entities/Contractor/ContractorPersonForm";
import ButtonIcon from "~/components/ui/ButtonIcon";
import FloatMenu from "~/components/ui/FloatMenu";

import { useUI } from "~/hooks";
import { useUser } from "~/store/hooks";

const ContractorForm = () => {
  const router = useRouter();
  const {user} = useUser()

  if (typeof window !== 'undefined') {
    if (!user.email) {
      router.push('/')
    }
  }

  const { setTitleUI } = useUI();

  useEffect(() => {
    setTitleUI("Nueva persona");
  }, []);

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickBack = () => {
    router.back();
  };

  return (
    <>
      <ContractorPersonForm />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
      </FloatMenu>
    </>
  );
};

export default ContractorForm;
