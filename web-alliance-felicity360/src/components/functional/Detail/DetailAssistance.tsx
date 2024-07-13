import React from "react";

import Assistance from "@/components/ui/Assistance/Assistance";
import { ContentCol, ContentRow } from "@/components/layout/Content";

const DetailAssistance = ({ product }: any) => {

  console.log(product)
  return (
    <ContentRow width="1200px" justifyContent="center" gap="50px">
      {product.map((assistance: any, index: number) => (
          <Assistance
            key={index}
            text={assistance.assistance_name}
            img={`/img/assistance/${assistance.assistance_id}.png`}
          />
        ))}
    </ContentRow>
  );
};

export default DetailAssistance;
