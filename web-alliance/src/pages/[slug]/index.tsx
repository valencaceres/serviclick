import { useRouter } from "next/router";
import { useEffect, Fragment } from "react";

import { config } from "../../utils/config";

import CardProduct from "../../components/functional/CardProduct";

import Banner from "../../components/ui/Banner/Banner";
import CardSection from "../../components/ui/CardSection";

import { useSlug } from "../../hooks/store";
import Footer from "../../components/ui/Footer/Footer";

const AlliancePage = () => {
  const router = useRouter();

  const { getByCode, slug } = useSlug();

  const handleClickProduct = (productPlan_id: string) => {
    //router.push(`${router.asPath}/contractor/${productPlan_id}`);
    router.push(
      `${config.products}/contractor?productPlanId=${productPlan_id}`
    );
  };

  useEffect(() => {
    if (router.isReady) {
      const { slug: code } = router.query;
      getByCode(code?.toString() || "");
    }
  }, [router]);

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
