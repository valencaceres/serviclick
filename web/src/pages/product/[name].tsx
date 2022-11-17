import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";

import HeadPages from "../../components/layout/HeadPages";

import * as Product from "../../components/functional/Product";

import { useUI } from "../../redux/hooks";

const BiciCulturaPage = () => {
  const router = useRouter();

  const { setAgentUI } = useUI();

  const Component = Product["BiciCultura"];

  useEffect(() => {
    setAgentUI("23027cc2-c294-4125-8d61-c8b23626d996");
  }, []);

  return (
    <Fragment>
      <HeadPages title="BiciCultura" description="Descripción del producto" />
      <Component />
    </Fragment>
  );
};

export default BiciCulturaPage;
