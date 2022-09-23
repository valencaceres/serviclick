import { useEffect } from "react";
import { useRouter } from "next/router";

import useUI from "../../hooks/useUI";

const Family = () => {
  const { setTitleUI } = useUI();

  useEffect(() => {
    setTitleUI("Familia");
  }, [setTitleUI]);

  return <div>families</div>;
};

export default Family;
