import { useRouter } from "next/router";
import { useEffect, Fragment } from "react";

import CardProduct from "../components/functional/CardProduct";

import Banner from "../components/ui/Banner/Banner";
import CardSection from "../components/ui/CardSection";
import Footer from "../components/ui/Footer/Footer";

import { config } from "../utils/config";

import { useSlug } from "../hooks/store";

const AlliancePage = () => {
  const router = useRouter();

  const { getByCode, slug } = useSlug();

  const handleClickProduct = (productPlan_id: string) => {
    router.push(
      `${config.products}/contractor?productPlanId=${productPlan_id}`
    );
  };

  useEffect(() => {
    getByCode(config.slug);
  }, []);

  return (
    <Fragment>
      <Banner />
      {slug && (
        <p>
          Junto a {slug.fantasyName}, te brindamos las mejores asistencias
          diseñadas especialmente para ti y tu familia.
        </p>
      )}
      <CardSection>
        {slug &&
          slug.products.map((item: any, idx: number) => (
            <CardProduct
              product={item}
              key={idx}
              onClick={handleClickProduct}
            />
          ))}
      </CardSection>
      <Footer />
    </Fragment>
  );
};

export default AlliancePage;
