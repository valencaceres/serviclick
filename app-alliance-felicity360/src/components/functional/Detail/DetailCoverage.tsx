import React from "react";

import { ContentCol, ContentRow } from "@/components/layout/Content";
import {
  TableHeader,
  TableCell,
  TableTitle,
} from "@/components/ui/Table/Table";
import { Text } from "@/components/ui/Text/Text";

const tableHeader = [
  { text: "SERVICIO" },
  { text: "LÍMITE" },
  { text: "MAX. EVENTOS AL AÑO" },
  { text: "CARENCIA" },
];

interface DetailCoverageProps {
  product: {
    id: string;
    name: string;
    basePrice: number;
    price: number;
    beneficiaryPrice: number;
    description: string;
    assistances: {
      id: string;
      section: string;
      name: string;
      maximum: string;
      amount: number;
      currency: string;
      events: number;
      lack: number;
      selected: boolean;
    }[];
  }[];
}

const DetailCoverage= ({ product }: DetailCoverageProps) => {
  return (
    <ContentCol width="1200px" gap="5px">
      <ContentRow width="100%">
        {tableHeader.map((title, index) => (
          <TableHeader key={index} {...title} />
        ))}
      </ContentRow>

      {product.map((prod, prodIndex) => (
        <React.Fragment key={prod.id}>
          <ContentCol width="100%">
            {prod.assistances.length > 0 && (
              <TableTitle text={prod.assistances[0].section} />
            )}
          </ContentCol>

          <ContentRow width="1200px">
            <ContentCol width="100%">
              {prod.assistances.map((assistance, assistanceIndex) => (
                <TableCell
                  alignLeft={true}
                  key={assistanceIndex}
                  text={assistance.name}
                />
              ))}
            </ContentCol>
            <ContentCol width="100%">
              {prod.assistances.map((assistance, assistanceIndex) => (
                <TableCell
                  key={assistanceIndex}
                  text={`${assistance.maximum} hasta ${assistance.amount} ${assistance.currency}`}
                />
              ))}
            </ContentCol>
            <ContentCol width="100%">
              {prod.assistances.map((assistance, assistanceIndex) => (
                <TableCell
                  key={assistanceIndex}
                  text={`${assistance.events} Eventos`}
                />
              ))}
            </ContentCol>
            <ContentCol width="100%">
              {prod.assistances.map((assistance, assistanceIndex) => (
                <TableCell
                  key={assistanceIndex}
                  text={`${assistance.lack} Días`}
                />
              ))}
            </ContentCol>
          </ContentRow>
        </React.Fragment>
      ))}

      <ContentRow width="100%" justifyContent="flex-start" paddingTop="20px">
        <Text
          text="Carencia de 15 días"
          fontFamily="Inter"
          fontSize="24px"
          fontWeight={400}
          color="#03495C"
        />
      </ContentRow>
    </ContentCol>
  );
};

export default DetailCoverage;
