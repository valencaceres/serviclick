import { useEffect } from "react";

import Donation from "../../components/functional/Donation/LandingPage";

import { useProduct } from "../../redux/hooks";

const IndexPage = () => {
  const { getProductById } = useProduct();

  useEffect(() => {
    getProductById("8ad7de17-d8ea-4d6d-b4a6-98e8534d584c");
  }, []);

  return <Donation />;
};

export default IndexPage;
