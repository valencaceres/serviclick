import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, Fragment } from "react";

import CardProduct from "../components/functional/CardProduct";

import Banner from "../components/ui/Banner/Banner";
import CardSection from "../components/ui/CardSection";

import { useUI, useSlug } from "../hooks";

const AlliancePage = () => {
  const router = useRouter();

  const { setUI, ui } = useUI();
  const { getSlugByCode, slug, slugLoading } = useSlug();

  useEffect(() => {
    if (router.isReady) {
      const { slug: code } = router.query;
      getSlugByCode(code);
    }
  }, [router]);

  return (
    <Fragment>
      <Banner />
      {slug.fantasyName && (
        <p>
          Junto a {slug.fantasyName}, te brindamos las mejores asistencias
          diseñadas especialmente para ti y tu familia.
        </p>
      )}
      <CardSection>
        {slug.products.map((item, idx: number) => (
          <CardProduct product={item} key={idx} />
        ))}
      </CardSection>
    </Fragment>
  );
};

export default AlliancePage;
