import { useEffect } from "react";
import { useRouter } from "next/router";

import useUI from "../../hooks/useUI";

const Coverage = () => {
  const { setTitleUI } = useUI();

  useEffect(() => {
    setTitleUI("Cobertura");
  }, [setTitleUI]);

  return <div>coverages</div>;
};

export default Coverage;
