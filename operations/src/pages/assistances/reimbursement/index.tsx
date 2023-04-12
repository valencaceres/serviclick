import { useEffect, Fragment, useState } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../../components/ui/FloatMenu";
import ButtonIcon from "../../../components/ui/ButtonIcon";

import { ImportList } from "../../../components/functional/_assistances/Import";

import { useUI, useDistrict } from "../../../hooks";
import { useQueryCase, useQueryImport } from "../../../hooks/query";
import { ReimbursementList } from "../../../components/functional/_assistances/Reimbursement";

const ReimbursementPage = () => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const { setTitleUI, filters } = useUI();
  const { listAllDistrict } = useDistrict();

  const { refetch } = useQueryCase().useGetAllReimbursements();

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    refetch();
  };

  useEffect(() => {
    setTitleUI("Reembolsos");
    listAllDistrict();
  }, []);

  useEffect(() => {
    setTitleUI(router.query?.id ? "Reembolso" : "Reembolsos");
  }, [router]);

  return (
    <Fragment>
      <ReimbursementList setShowModal={setShowModal} showModal={showModal} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
      </FloatMenu>
    </Fragment>
  );
};

export default ReimbursementPage;
