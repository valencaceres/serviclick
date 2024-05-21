import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";

import FloatMenu from "../../components/ui/FloatMenu";
import ButtonIcon from "../../components/ui/ButtonIcon";

import {
  PlanList,
  PlanDetail,
} from "../../components/functional/_processes/Plan";

import { useUI, useFamily, useProduct } from "../../hooks";
import { useUser } from "~/store/hooks";

const Plan = () => {
  const router = useRouter();
  const {user} = useUser()

  if (typeof window !== 'undefined') {
    if (!user.email) {
      router.push('/')
    }
  }

  const { setTitleUI } = useUI();
  const { listAll: getAllFamilies } = useFamily();
  const { getAllProducts, resetProduct, product } = useProduct();

  const [enableSave, setEnableSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const editPlan = () => {};

  const handleClickBack = () => {
    resetProduct();
    router.push("/processes/plan");
  };

  const handleClickHome = () => {
    router.push("/");
  };

  const handleClickRefresh = () => {
    getAllProducts("020579a3-8461-45ec-994b-ad22ff8e3275");
  };

  const handleClickSave = () => {
    // if (product.id === "") {
    //   create(
    //     product.family_id,
    //     product.name,
    //     product.cost,
    //     product.price,
    //     product.isSubject,
    //     product.frequency,
    //     product.term,
    //     product.beneficiaries,
    //     product.coverages,
    //     product.familyValues
    //   );
    // } else {
    //   update(
    //     product.id,
    //     product.family_id,
    //     product.name,
    //     product.cost,
    //     product.price,
    //     product.isSubject,
    //     product.frequency,
    //     product.term,
    //     product.beneficiaries,
    //     product.coverages,
    //     product.familyValues
    //   );
    // }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    setTitleUI("Plan");
    getAllFamilies();
    getAllProducts("020579a3-8461-45ec-994b-ad22ff8e3275");
  }, []);

  return router.isReady && router.query.id ? (
    <Fragment>
      <PlanDetail setEnableSave={setEnableSave} />
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="arrow_back" onClick={handleClickBack} />
        <ButtonIcon
          iconName="save"
          onClick={() => {
            setIsLoading(true);
            handleClickSave();
          }}
          disabled={!enableSave}
          loading={isLoading}
        />
      </FloatMenu>
    </Fragment>
  ) : (
    <Fragment>
      <PlanList editPlan={editPlan} />{" "}
      <FloatMenu>
        <ButtonIcon iconName="home" onClick={handleClickHome} />
        <ButtonIcon iconName="refresh" onClick={handleClickRefresh} />
      </FloatMenu>
    </Fragment>
  );
};

export default Plan;
