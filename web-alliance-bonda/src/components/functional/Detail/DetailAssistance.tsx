import React from "react";

import Assistance from "@/components/ui/Assistance/Assistance";
import { ContentCol, ContentRow } from "@/components/layout/Content";

const DetailAssistance = ({ product }: any) => {

  const assistanceArray = Array.isArray(product) ? product : Object.values(product || {});
  const doesImageExist = (url: string): boolean => {
    const http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status !== 404;
  };
  const assistancesWithImages = assistanceArray.filter((assistance: any) => {
    const imageUrl = `/img/assistance/${assistance.id}.png`;
    return doesImageExist(imageUrl);
  });
  return (
    <ContentRow width="1200px" justifyContent="center" gap="50px">
      {assistancesWithImages?.map((assistance: any, index: number) => (
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
