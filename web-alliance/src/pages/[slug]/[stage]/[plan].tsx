import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Loading from "../../../components/ui/Loading/Loading";

import {
  useUI,
  useRelationship,
  useSlug,
  useProduct,
  useLead,
} from "../../../hooks/store";

import { stages, IStage } from "../../../data/stage";

import * as DistrictHook from "../../../hooks/query/useDistrict";

const PlanPage = () => {
  const router = useRouter();

  const { refetch: getAllDistricts } = DistrictHook.GetAll();

  const { ui, setUI } = useUI();
  const { getByCode, slug } = useSlug();
  const { getByPlanId, isLoading, product } = useProduct();
  const { getById } = useLead();
  const { getAll: getAllRelationship } = useRelationship();

  const [stage, setStage] = useState<IStage>();

  const getStageData = (stage_code: string): IStage => {
    const item = stages.filter((stage: any) => stage.code === stage_code)[0];
    if (item) {
      setStage({
        code: stage_code,
        name: item.name,
        component: item.component,
      });
    }

    return item;
  };

  useEffect(() => {
    getAllDistricts();
    getAllRelationship();
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const { slug: code, stage, plan, leadId } = router.query;

      if ((!slug || slug.id === "") && code) {
        getByCode(code.toString());
      }

      if (stage && plan) {
        setUI({
          ...ui,
          stage: {
            code: stage.toString(),
            name: getStageData(stage.toString())?.name,
          },
          title: getStageData(stage.toString())?.name,
        });
        getByPlanId(plan.toString());
      }

      if (leadId) {
        getById(leadId.toString());
      }
    }
  }, [router]);

  useEffect(() => {
    if (product.id !== "") {
      const { slug: code } = router.query;

      setUI({
        ...ui,
        breadCumbs: stages
          .filter(
            (item) =>
              (product.beneficiaries === 0 && item.code !== "beneficiaries") ||
              product.beneficiaries > 0
          )
          .map((item, idx: number) => {
            return {
              number: idx + 1,
              code: item.code,
              text: item.name,
              link: `/${code}/${item.code}/${product.plan.id}`,
            };
          }),
      });
    }
  }, [product]);

  return router.isReady && !isLoading ? stage?.component : <Loading />;
};

export default PlanPage;
