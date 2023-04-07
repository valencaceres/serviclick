import { useEffect } from "react";

// 2464277
import Insured from "../components/functional/Insured";

import { useUI } from "../zustand/hooks";

const InsuredPage = () => {
  const { setTitle, setShowButtonBack } = useUI();

  useEffect(() => {
    setTitle("Mis datos");
    setShowButtonBack(true, "/");
  }, []);

  return <Insured />;
};

export default InsuredPage;
