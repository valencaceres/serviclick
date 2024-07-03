import React from "react";

import Assistance from "@/components/ui/Assistance/Assistance";
import { ContentCol, ContentRow } from "@/components/layout/Content";

const DetailAssistance = ({ product }: any) => {
  return (
    <ContentRow width="1200px" justifyContent="center" gap="50px">
      {product.assistances
        .filter((item: any) => item.selected)
        .map((assistance: any, index: number) => (
          <Assistance
            key={index}
            text={assistance.name}
            img={`/img/assistance/${assistance.id}.png`}
          />
        ))}
    </ContentRow>
  );
};

export default DetailAssistance;
