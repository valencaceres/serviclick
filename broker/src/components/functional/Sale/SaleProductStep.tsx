import { useRouter } from "next/router";
import { useEffect } from "react";

import { config } from "../../../utils/config";

import { Button } from "~/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";

import { useUI, useUser } from "~/store/hooks";
import { IProduct } from "~/interfaces/product";
import { useBroker } from "~/store/hooks";

export function SaleProductStep({
  previousStep,
}: {
  onDone: () => void;
  previousStep: () => void;
}) {

  const {userItem} = useUser()
  const { family } = useUI();
  const { isLoading } = useBroker();
  const products = family?.products;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        previousStep();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previousStep]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 pb-24 pl-12">
      <h2 className="text-2xl font-bold text-teal-blue">{family?.name}</h2>
      <div className="flex w-full max-w-5xl flex-col flex-wrap items-center justify-center gap-2 md:flex-row">
        {isLoading ? (
          <div className="w-full">
            <h2 className="text-center text-xl font-bold text-teal-blue">
              Cargando...
            </h2>
          </div>
        ) : !products?.length ? (
          <div className="w-full">
            <h2 className="text-center text-2xl font-bold text-teal-blue">
              No hay productos disponibles...
            </h2>
          </div>
        ) : (
          products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))
        )}
      </div>
    </div>
  );
}

function ProductCard({
  id,
  name,
  currency,
  frequency,
  productPlan_id,
  price,
  yearly_price,
  pdfBase64,
  yearly_plan_id,
}: IProduct) {
  const router = useRouter();
  const { userItem } = useUser();

  const downloadFile = ({
    Base64Content,
    nameProduct,
  }: {
    Base64Content: string;
    nameProduct: string;
  }) => {
    const byteCharacters = Buffer.from(Base64Content, "base64").toString(
      "binary"
    );

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = nameProduct || "contrato.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleDownloadClick = (pdfBase64: any) => {
    downloadFile({
      Base64Content: pdfBase64,
      nameProduct: name,
    });
  };

  function formatPrice(price: number) {
    return price.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    });
  }
  const type =
    frequency === "M" ? "mensual" : frequency === "A" ? "anual" : "semanal";
  return (
    <Card className="w-full max-w-xs text-center">
      <CardHeader className="flex h-20 items-center justify-center  rounded-t-md bg-primary-500">
        <CardTitle className="text-teal-blue">{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex max-h-[120px] min-h-[120px]  flex-col items-center justify-between rounded-b-md bg-teal-blue p-2">
        <div className="flex w-full flex-row gap-2 p-2">
          <Button
            className="flex w-full flex-col items-center justify-center p-6"
            onClick={() =>
              void router.push(
                `${config.products}/contractor?productPlanId=${productPlan_id}&userId=${userItem?.id}`
              )
            }
          >
            <h2 className="capitalize">{type}</h2>
            <h3 className="text-lg font-semibold">{formatPrice(price)}</h3>
          </Button>
          {yearly_price && yearly_price > 0 && (
            <Button
              className="flex w-full flex-col items-center justify-center p-6"
              onClick={() =>
                void router.push(
                  `${config.products}/contractor?productPlanId=${yearly_plan_id}&userId=${userItem?.id}`
                )
              }
            >
              {" "}
              <div>
                <h2 className="capitalize">anual</h2>

                <h3 className="text-lg font-semibold">
                  {formatPrice(yearly_price)}
                </h3>
              </div>
            </Button>
          )}
        </div>
        {pdfBase64 && (
          <Button
            onClick={() => handleDownloadClick(pdfBase64)}
            className="flex w-full flex-col items-center justify-center p-6"
          >
            Descargar contrato
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
