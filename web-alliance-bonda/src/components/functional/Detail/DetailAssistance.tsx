import React from "react";

import Assistance from "@/components/ui/Assistance/Assistance";
import { ContentRow, ContentCol } from "@/components/layout/Content";

import { assistancesWithImages } from "@/data/assistancesWithImages";

const DetailAssistance = ({ product }: any) => {
  return (
    <ContentRow width="80%" justifyContent="center" gap="50px">
      {product.assistances.map(
        (assistance: any, index: number) =>
          assistancesWithImages.some(
            (item: any) => item === assistance.assistance_id
          ) && (
            <Assistance
              key={index}
              text={assistance.assistance_name}
              img={`/img/assistance/${assistance.assistance_id}.png`}
            />
          )
      )}
    </ContentRow>
  );
};

export default DetailAssistance;
