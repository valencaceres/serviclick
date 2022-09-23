import { useEffect } from "react";
import { useRouter } from "next/router";

import {
  FamilyDetail,
  FamilyList,
} from "../../components/functional/_masters/Family";

import useUI from "../../hooks/useUI";
import useFamily from "../../hooks/useFamily";

const Family = () => {
  const router = useRouter();

  const { setTitleUI } = useUI();
  const { listAll } = useFamily();

  useEffect(() => {
    setTitleUI("Familia");
    listAll();
  }, []);

  return router.isReady && router.query.id ? <FamilyDetail /> : <FamilyList />;
};

export default Family;
